'use client'

import { useState, useEffect, useCallback } from 'react'
import { Calendar } from '../components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Button } from '../components/ui/button'
import { Textarea } from '../components/ui/textarea'
import { Input } from '../components/ui/input'
import { ChevronLeft, ChevronRight, Info,Share2, MapPin } from 'lucide-react'
//Search
import { motion } from 'framer-motion'
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

const MONTHS_TO_FETCH = 3 // Fetch 3 months of data at a time

export default function Home() {
  const [date, setDate] = useState<Date>(new Date())
  const [reflection, setReflection] = useState('')
  const [citySearch, setCitySearch] = useState('')
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [calendarData, setCalendarData] = useState<Record<string, CalendarDay>>({})
  const [loading, setLoading] = useState(false)
  const [geolocating, setGeolocating] = useState(false)

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
      const endDate = addMonths(startDate, MONTHS_TO_FETCH - 1)
      endDate
      const response = await fetch(`${import.meta.env.VITE_API_URL}/calendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: location.city,
          country: location.country,
          period: MONTHS_TO_FETCH * 30, // Approximate number of days
          year: startDate.getFullYear(),
          month: startDate.getMonth() + 1,
          day: startDate.getDate(),
        }),
      })
      const data: CalendarData = await response.json()
      
      // Convert the array of days into a Record for easier access
      const newCalendarData = data.days.reduce((acc, day) => {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/find-location?latitude=${latitude}&longitude=${longitude}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
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

  const handlePrevMonth = () => {
    setDate(prevDate => subMonths(prevDate, 1))
  }

  const handleNextMonth = () => {
    setDate(prevDate => addMonths(prevDate, 1))
  }

  const getDayInfo = (day: Date) => {
    const key = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
    return calendarData[key] || null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
 
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 tracking-tight font-marcellus text-amber-100"
      >
        Bhāv
      </motion.h1>
      <Tabs defaultValue="verse" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 bg-white/10 rounded-full p-1 mb-6">
          <TabsTrigger value="verse" className="rounded-full text-sm sm:text-base transition-all duration-300 text-amber-100 data-[state=active]:bg-amber-100/20 data-[state=active]:text-amber-100">Daily Verse</TabsTrigger>
          <TabsTrigger value="calendar" className="rounded-full text-sm sm:text-base transition-all duration-300 text-amber-100 data-[state=active]:bg-amber-100/20 data-[state=active]:text-amber-100">Calendar</TabsTrigger>
        </TabsList>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="verse">
            <Card className="bg-white/10 backdrop-blur-md border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-xl sm:text-2xl font-marcellus text-amber-100">
                  <span>Daily Verse</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="text-amber-100 hover:bg-amber-100/20">
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-amber-100 hover:bg-amber-100/20">
                      <Info className="h-5 w-5" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/10 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold mb-3 font-marcellus text-amber-100">BG 1.1</h2>
                  <p className="text-sm mb-4 leading-relaxed font-marcellus text-amber-50">
                    dhṛtarāṣṭra uvāca
                    dharma-kṣetre kuru-kṣetre
                    samavetā yuyutsavaḥ
                    māmakāḥ pāṇḍavāś caiva
                    kim akurvata sañjaya
                  </p>
                  <div className="space-y-3">
                    {['Word-by-Word Definition', 'Translation', 'Purport'].map((item) => (
                      <Button key={item} variant="outline" className="w-full justify-start text-left hover:bg-amber-100/20 transition-colors duration-300 text-black-100 border-amber-100/50">
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 font-marcellus text-amber-100">Your Reflections</h3>
                  <Textarea
                    placeholder="Type your reflections here..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="bg-white/10 border-amber-100/30 text-amber-50 placeholder-amber-200/50 resize-none"
                    rows={4}
                  />
                  <p className="text-sm text-amber-200/70 mt-2">{reflection.length}/300 characters</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calendar">
            <Card className="bg-white/10 backdrop-blur-md border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-xl sm:text-2xl font-marcellus text-amber-100">
                  <span>Calendar</span>
                  <Button variant="ghost" size="icon" className="text-amber-100 hover:bg-amber-100/20">
                    <Info className="h-5 w-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <div className="flex items-center">
                    <Input
                      type="text"
                      placeholder="Search for a city..."
                      value={citySearch}
                      onChange={(e) => {
                        setCitySearch(e.target.value)
                        searchLocations(e.target.value)
                      }}
                      className="bg-white/10 border-amber-100/30 text-amber-100 placeholder-amber-200/50 pr-20"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 text-amber-100 hover:bg-amber-100/20"
                      onClick={handleGeolocation}
                      disabled={geolocating}
                    >
                      <MapPin className="h-5 w-5" />
                    </Button>
                  </div>
                  {locations.length > 0 && (
                    <ul className="absolute z-50 w-full bg-gray-800/[0.9] rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg border border-amber-100/30 backdrop-blur-md">
                      {locations.map((location, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-amber-100/20 cursor-pointer text-amber-100"
                          onClick={() => {
                            setSelectedLocation(location)
                            setCitySearch(location.name)
                            setLocations([])
                            setCalendarData({})
                          }}
                        >
                          {location.name}, {location.country}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1 font-marcellus text-amber-100">
                    {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </h2>
                  <p className="text-sm text-amber-200/70">{selectedLocation ? selectedLocation.name : 'Select a location'}</p>
                </div>
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="icon" className="text-amber-100 hover:bg-amber-100/20" onClick={handlePrevMonth}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <span className="text-lg font-medium font-marcellus text-amber-100">
                    {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <Button variant="ghost" size="icon" className="text-amber-100 hover:bg-amber-100/20" onClick={handleNextMonth}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    month={date}
                    onMonthChange={setDate}
                    className="rounded-lg border-amber-100/20 bg-white/10 col-span-1 md:col-span-5"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium text-amber-100",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-amber-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-amber-200/70 rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-amber-100/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-amber-50",
                      day_selected: "bg-amber-100/30 text-amber-100 hover:bg-amber-100/40 focus:bg-amber-100/40",
                      day_today: "bg-amber-100/10 text-amber-100",
                      day_outside: "text-amber-200/50 opacity-50",
                      day_disabled: "text-amber-200/50 opacity-50",
                      day_range_middle: "aria-selected:bg-amber-100/20 aria-selected:text-amber-100",
                      day_hidden: "invisible",
                    }}
                  />
                  <div className="bg-white/10 p-4 rounded-lg space-y-4 col-span-1 md:col-span-2 h-[300px] overflow-y-auto">
                    {loading ? (
                      <p className="text-amber-200/70">Loading...</p>
                    ) : getDayInfo(date) ? (
                      <>
                        <div>
                          <h3 className="font-semibold mb-1 font-marcellus text-amber-100">Tithi/Nakshatra</h3>
                          <p className="text-sm text-amber-200/70">
                            Tithi: {getDayInfo(date)?.astrodata.tithi}, 
                            Nakshatra: {getDayInfo(date)?.astrodata.naksatra}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 font-marcellus text-amber-100">Events</h3>
                          {getDayInfo(date)?.events && getDayInfo(date)!.events.length > 0 ? (
                            getDayInfo(date)!.events.map((event, index) => (
                              <p key={index} className="text-sm text-amber-200/70">{event.text}</p>
                            ))
                          ) : (
                            <p className="text-sm text-amber-200/70">No events for this day</p>
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="text-amber-200/70">Select a date to view details</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}