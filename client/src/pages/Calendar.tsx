import { useState, useEffect, useCallback, useRef } from 'react'
import { Calendar as CalendarComponent } from '../components/ui/calendar'
//import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ChevronLeft, ChevronRight, Info, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { addMonths, subMonths, startOfMonth } from 'date-fns'

type Location = {
  city: string
  country: string
  latitude: number
  longitude: number
  name: string
  offset: number
  tzid: number
  tzname: string
}

type CalendarDay = {
  date: {
    year: number
    month: number
    day: number
  }
  events: Array<{ text: string }>
  astrodata: {
    tithi: number
    naksatra: number
  }
}

type CalendarData = {
  location: Location
  days: CalendarDay[]
}

const MONTHS_TO_FETCH = 3

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [citySearch, setCitySearch] = useState('')
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [calendarData, setCalendarData] = useState<Record<string, CalendarDay>>({})
  const [loading, setLoading] = useState(false)
  const [geolocating, setGeolocating] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored: any = localStorage.getItem('userLocation');
    if (stored) {
      const location: any = JSON.parse(stored);
      setSelectedLocation(location);
      setCitySearch(location.name);

      console.log(geolocating)
    }
  }, [])

  const searchLocations = useCallback(async (query: string) => {
    if (query.length < 3) {
      setLocations([])
      return
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/find-location?name=${query}`)
      const data = await response.json()
      const allLocations = [...(data.CONTAINS || []), ...(data.EQUALS || []), ...(data.STARTS || [])]
      setLocations(allLocations)
    } catch (error) {
      console.error('Error fetching locations:', error)
      setLocations([])
    }
  }, [])

  const fetchCalendarData = useCallback(async (location: Location, startDate: Date) => {
    setLoading(true)
    try {
      // Calculate start and end dates for the 6-month range
      const pastStartDate = subMonths(startDate, MONTHS_TO_FETCH)
      const futureEndDate = addMonths(startDate, MONTHS_TO_FETCH - 1)
      futureEndDate

      // Fetch past 3 months
      const pastResponse = await fetch(`${import.meta.env.VITE_API_URL}/calendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: location.city,
          country: location.country,
          period: MONTHS_TO_FETCH * 30,
          year: pastStartDate.getFullYear(),
          month: pastStartDate.getMonth() + 1,
          day: pastStartDate.getDate(),
        }),
      })
      const pastData: CalendarData = await pastResponse.json()

      // Fetch future 3 months
      const futureResponse = await fetch(`${import.meta.env.VITE_API_URL}/calendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: location.city,
          country: location.country,
          period: MONTHS_TO_FETCH * 30,
          year: startDate.getFullYear(),
          month: startDate.getMonth() + 1,
          day: startDate.getDate(),
        }),
      })
      const futureData: CalendarData = await futureResponse.json()
      
      // Combine both past and future data
      const allDays = [...pastData.days, ...futureData.days]
      const newCalendarData = allDays.reduce((acc, day) => {
        const key = `${day.date.year}-${day.date.month}-${day.date.day}`
        acc[key] = day
        return acc
      }, {} as Record<string, CalendarDay>)

      setCalendarData(prevData => ({ ...prevData, ...newCalendarData }))
    } catch (error) {
      console.error('Error fetching calendar data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const getLocationByCoordinates = useCallback(async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/find-location?latitude=${latitude}&longitude=${longitude}`)
      const data = await response.json()
      if (data && data.length > 0) {
        setSelectedLocation(data[0])
        setCitySearch(data[0].name)
        setCalendarData({})
      }
    } catch (error) {
      console.error('Error fetching location by coordinates:', error)
    }
  }, [])

  const handleGeolocation = useCallback(() => {
    setGeolocating(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getLocationByCoordinates(position.coords.latitude, position.coords.longitude)
          setGeolocating(false)
        },
        (error) => {
          console.error('Geolocation error:', error)
          setGeolocating(false)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
      setGeolocating(false)
    }

    handleGeolocation
  }, [getLocationByCoordinates])

  useEffect(() => {
    if (selectedLocation) {
      const startOfCurrentMonth = startOfMonth(date)
      const existingDataForMonth = Object.keys(calendarData).some(key => {
        const [year, month] = key.split('-').map(Number)
        return year === startOfCurrentMonth.getFullYear() && month === startOfCurrentMonth.getMonth() + 1
      })

      if (!existingDataForMonth) {
        fetchCalendarData(selectedLocation, startOfCurrentMonth)
      }
    }
  }, [selectedLocation, date, fetchCalendarData, calendarData])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handlePrevMonth = () => {
    setDate(prevDate => subMonths(prevDate, 1))
  }

  const handleNextMonth = () => {
    setDate(prevDate => addMonths(prevDate, 1))
  }

  console.log(handlePrevMonth, handleNextMonth)

  const getDayInfo = (day: Date) => {
    const key = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
    return calendarData[key] || null
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-6xl mx-auto p-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 font-marcellus text-white">
          {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h2>
        <p className="text-lg text-white/70">{selectedLocation ? selectedLocation.name : 'Select a location'}</p>
      </div>

      <div className="relative flex items-center mb-6">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={citySearch}
          onChange={(e) => {
            setCitySearch(e.target.value)
            searchLocations(e.target.value)
          }}
          className="bg-white/10 border-white/30 text-white placeholder-white/50 pr-20"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 text-white hover:bg-white/10"
          onClick={() => setShowTooltip(!showTooltip)}
        >
          <Info className="h-5 w-5" />
        </Button>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              ref={tooltipRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 w-64 p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg z-50"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white hover:bg-white/10"
                onClick={() => setShowTooltip(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <h4 className="text-white font-semibold mb-2">Important Note</h4>
              <p className="text-white/80 text-sm">
              This calendar displays Vedic astrological information, including Tithi, Nakshatra, important events such as fasting, appearance/disappearance days, and break fast times for each day. However, it is limited to cities with relatively large populations or those that are well-known. So, if you do not see your city, please search for a city in your vicinity.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {locations.length > 0 && (
        <ul className="absolute z-50 w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg mt-1 max-h-40 overflow-y-auto border border-white/20">
          {locations.map((location, index) => (
            <li
              key={index}
              className="p-2 hover:bg-white/20 cursor-pointer"
              onClick={() => {
                setSelectedLocation(location)
                setCitySearch(location.name)
                setLocations([])
                setCalendarData({})
                localStorage.setItem('userLocation', JSON.stringify(location))
              }}
            >
              {location.name}, {location.country}
            </li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="bg-white/10 rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-marcellus text-white">
                {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
            </div>

            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              month={date}
              captionLayout="buttons"
              onMonthChange={setDate}
              className="w-full"
              classNames={{
                months: "w-full",
                month: "w-full space-y-4",
                caption: "relative flex items-center justify-center",
                caption_label: "hidden",
                nav: "flex items-center space-x-1",
                nav_button: "absolute h-9 w-9 bg-transparent p-0 opacity-70 hover:opacity-100 text-white",
                nav_button_previous: "left-1",
                nav_button_next: "right-1",
                table: "w-full border-collapse",
                head_row: "flex w-full",
                head_cell: "text-white/70 w-[14.2857143%] font-normal text-[0.8rem] py-2",
                row: "flex w-full mt-2",
                cell: "relative w-[14.2857143%] text-center p-0 focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/20 rounded-md mx-auto",
                day_selected: "bg-white/30 text-white hover:bg-white/40",
                day_today: "bg-white/10 text-white",
                day_outside: "text-white/30 opacity-50 hover:bg-transparent",
                day_disabled: "text-white/30 opacity-50",
                day_range_middle: "aria-selected:bg-white/20",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-4">
  <div className="bg-white/10 p-6 rounded-lg h-full">
    {loading ? (
      <p className="text-white/70">Loading...</p>
    ) : getDayInfo(date) ? (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-marcellus mb-3 text-white">Tithi/Nakshatra</h3>
          <p className="text-white/70">
            Tithi: {getDayInfo(date)?.astrodata.tithi}
          </p>
          <p className="text-white/70">
            Nakshatra: {getDayInfo(date)?.astrodata.naksatra}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-marcellus mb-3 text-white">Events</h3>
          {getDayInfo(date)?.events && getDayInfo(date)!.events.length > 0 ? (
            getDayInfo(date)!.events.map((event, index) => (
              <p key={index} className="text-white/70 mb-2">{event.text}</p>
            ))
          ) : (
            <p className="text-white/70">No events for this day</p>
          )}
        </div>
      </div>
    ) : (
      <p className="text-white/70">Select a date to view details</p>
    )}

    {/* Disclaimer only shows if "DST" is mentioned in any event */}
    {getDayInfo(date)?.events?.some(event => event.text.includes("DST")) && (
      <div className="mt-4 text-xs text-white/50 italic">
        * This currently only shows daylight savings time. So you may need to subtract 1 hour based on your needs.
      </div>
    )}
  </div>
</div>

      </div>
    </motion.div>
  )
}