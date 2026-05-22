import { useState, useEffect, useCallback, useRef } from 'react'
import { Calendar as CalendarComponent } from '../components/ui/calendar'
//import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ChevronLeft, ChevronRight, Info, X, MapPin } from 'lucide-react'
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
const API_URL = import.meta.env.VITE_API_URL || 'https://bhavapp.fly.dev'

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
      const response = await fetch(`${API_URL}/find-location?name=${query}`)
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
      const pastResponse = await fetch(`${API_URL}/calendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: location.city,
          country: location.country,
          latitude: location.latitude,
          longitude: location.longitude,
          tzname: location.tzname,
          period: MONTHS_TO_FETCH * 30,
          year: pastStartDate.getFullYear(),
          month: pastStartDate.getMonth() + 1,
          day: pastStartDate.getDate(),
        }),
      })
      const pastData: CalendarData = await pastResponse.json()

      // Fetch future 3 months
      const futureResponse = await fetch(`${API_URL}/calendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: location.city,
          country: location.country,
          latitude: location.latitude,
          longitude: location.longitude,
          tzname: location.tzname,
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
      const response = await fetch(`${API_URL}/find-location?latitude=${latitude}&longitude=${longitude}`)
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
      className="w-full max-w-6xl mx-auto p-4 space-y-6"
    >
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-marcellus text-foreground">
          {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h2>
        <div className="inline-flex items-center gap-1 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full font-marcellus font-semibold">
          <MapPin className="h-4 w-4" />
          <span>{selectedLocation ? selectedLocation.name : 'Select a location'}</span>
        </div>
      </div>

      <div className="relative flex items-center mb-6 max-w-lg mx-auto">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={citySearch}
          onChange={(e) => {
            setCitySearch(e.target.value)
            searchLocations(e.target.value)
          }}
          className="bg-card border-border text-foreground placeholder-muted-foreground pr-20 rounded-2xl h-12 shadow-sm focus:ring-primary"
        />
        <div className="absolute right-1 flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-muted rounded-full"
            onClick={handleGeolocation}
            disabled={geolocating}
            title="Use current location"
          >
            <MapPin className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-muted rounded-full"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              ref={tooltipRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-14 w-72 p-5 bg-card border border-border rounded-3xl shadow-xl z-50 text-left"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-muted-foreground hover:bg-muted rounded-full"
                onClick={() => setShowTooltip(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <h4 className="text-foreground font-marcellus font-bold mb-2 flex items-center gap-2">
                <span className="text-primary">ॐ</span> Important Note
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                This calendar displays Vedic astrological information, including Tithi, Nakshatra, important events such as fasting, appearance/disappearance days, and break fast times for each day. However, it is limited to cities with relatively large populations or those that are well-known. So, if you do not see your city, please search for a city in your vicinity.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {locations.length > 0 && (
        <ul className="absolute z-50 w-full max-w-lg left-1/2 -translate-x-1/2 bg-card border border-border rounded-2xl mt-1 max-h-48 overflow-y-auto shadow-xl divide-y divide-border/40">
          {locations.map((location, index) => (
            <li
              key={index}
              className="p-3 hover:bg-muted cursor-pointer transition-colors text-sm text-foreground flex items-center gap-2"
              onClick={() => {
                setSelectedLocation(location)
                setCitySearch(location.name)
                setLocations([])
                setCalendarData({})
                localStorage.setItem('userLocation', JSON.stringify(location))
              }}
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span>{location.name}, {location.country}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Calendar Body */}
        <div className="lg:col-span-8">
          <div className="bg-card border border-border/80 rounded-[2rem] p-6 shadow-sm">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-marcellus text-foreground font-semibold">
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
                nav_button: "absolute h-9 w-9 bg-transparent p-0 opacity-70 hover:opacity-100 text-foreground hover:bg-muted rounded-xl",
                nav_button_previous: "left-1",
                nav_button_next: "right-1",
                table: "w-full border-collapse",
                head_row: "flex w-full border-b border-border/40 pb-2",
                head_cell: "text-muted-foreground w-[14.2857143%] font-marcellus font-bold text-[0.85rem] py-2 text-center",
                row: "flex w-full mt-2",
                cell: "relative w-[14.2857143%] text-center p-0 focus-within:relative focus-within:z-20",
                day: "h-10 w-10 p-0 font-sans font-medium text-sm text-foreground aria-selected:opacity-100 hover:bg-muted rounded-xl mx-auto flex items-center justify-center transition-all",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary/95 shadow-md",
                day_today: "bg-primary/10 text-primary border border-primary/20",
                day_outside: "text-muted-foreground/30 opacity-50 hover:bg-transparent",
                day_disabled: "text-muted-foreground/30 opacity-50",
                day_range_middle: "aria-selected:bg-primary/10",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
              }}
            />
          </div>
        </div>

        {/* Side Astronomical Panel */}
        <div className="lg:col-span-4">
          <div className="bg-card border border-border/80 p-6 rounded-[2rem] h-full shadow-sm flex flex-col justify-between">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Calculating cosmic offsets...</p>
              </div>
            ) : getDayInfo(date) ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-widest text-primary font-marcellus mb-2">Lunar Observances</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/40 border border-border/40 rounded-2xl">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold">Tithi</span>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{getDayInfo(date)?.astrodata.tithi}</p>
                    </div>
                    <div className="p-3 bg-muted/40 border border-border/40 rounded-2xl">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold">Nakshatra</span>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{getDayInfo(date)?.astrodata.naksatra}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h3 className="text-xs uppercase font-bold tracking-widest text-primary font-marcellus mb-3">Devotional Events</h3>
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {getDayInfo(date)?.events && getDayInfo(date)!.events.length > 0 ? (
                      getDayInfo(date)!.events.map((event, index) => (
                        <div key={index} className="p-3 bg-primary/5 border border-primary/20 rounded-2xl text-xs text-foreground font-medium leading-relaxed flex gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>{event.text}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No specific appearance, disappearance, or fasting events scheduled for this day.</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16 space-y-2">
                <Info className="h-10 w-10 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">Select a calendar date to load Vedic alignments.</p>
              </div>
            )}

            {/* Disclaimer showing only if DST is active */}
            {getDayInfo(date)?.events?.some(event => event.text.includes("DST")) && (
              <div className="mt-6 text-[10px] text-muted-foreground/70 italic border-t border-border/40 pt-3">
                * Calendar output registers daylight savings time offsets. Verify local sunrise conversions if required.
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  )
}