'use client'

import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Calendar as CalendarIcon, 
  Compass, 
  Sparkles, 
  Smartphone, 
  Play, 
  Pause, 
  Volume2, 
  RotateCcw, 
  Heart, 
  Check, 
  ArrowRight,
  Info,
  MapPin,
  Clock,
  HeartHandshake
} from 'lucide-react'
import AppleSVG from "../assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
import GooglePlayStoreSVG from "../assets/GetItOnGooglePlay_Badge_Web_color_English.png"
import ReadPNG from '../assets/screenshots/Read.PNG'
import LibraryPNG from '../assets/screenshots/Library.PNG'
import CalendarPNG from '../assets/screenshots/Calendar.PNG'
import CounterPNG from '../assets/screenshots/Counter.PNG'
import SettingsPNG from '../assets/screenshots/Settings.PNG'

const API_URL = import.meta.env.VITE_API_URL || 'https://bhavapp.fly.dev'

const mockupScreens = {
  read: ReadPNG,
  library: LibraryPNG,
  calendar: CalendarPNG,
  counter: CounterPNG,
  settings: SettingsPNG
}

// Types
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

const mockVerse = {
  verseNumber: "BG 1.1",
  verse: "dhṛtarāṣṭra uvāca\ndharma-kṣetre kuru-kṣetre\nsamavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāś caiva\nkim akurvata sañjaya",
  wordByWordDefinition: "dhṛtarāṣṭraḥ uvāca — King Dhṛtarāṣṭra said; dharma-kṣetre — in the place of pilgrimage; kuru-kṣetre — in the place named Kurukṣetra; samavetāḥ — assembled; yuyutsavaḥ — desiring to fight; māmakāḥ — my party; pāṇḍavāḥ — the sons of Pāṇḍu; ca — and; eva — certainly; kim — what; akurvata — did they do; sañjaya — O Sañjaya.",
  translation: "Dhṛtarāṣṭra said: O Sañjaya, after my sons and the sons of Pāṇḍu assembled in the place of pilgrimage at Kurukṣetra, desiring to fight, what did they do?",
  keyInsight: "The Kurukṣetra battlefield represents not just a historical site, but the internal conflict within the human heart between the righteous impulses (Pāṇḍavas) and the ego-driven tendencies (Kauravas).",
  purport: "Bhagavad-gītā is the widely read theistic science summarized in the Gītā-māhātmya (Glorification of the Gītā). There it is said that one should read Bhagavad-gītā very scrutinizingly with the help of a person who is a devotee of Śrī Kṛṣṇa and try to understand it without personally motivated interpretations. The example of clear understanding is in the Bhagavad-gītā itself, in the way the teaching is understood by Arjuna, who heard the Gītā directly from the Lord."
}

export default function Home() {
  // Speech synthesis states
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSpeechText, setActiveSpeechText] = useState('')

  // Daily Verse Card collapsible states
  const [isWordByWordExpanded, setIsWordByWordExpanded] = useState(false)
  const [isTranslationExpanded, setIsTranslationExpanded] = useState(true)
  const [isPurportExpanded, setIsPurportExpanded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  // iPhone Mockup Active Tab
  const [activeMockupTab, setActiveMockupTab] = useState<'read' | 'library' | 'calendar' | 'counter' | 'settings'>('read')

  // Interactive Japa Counter States
  const [mantraCount, setMantraCount] = useState(0)
  const [roundsCount, setRoundsCount] = useState(0)

  // Mini Calendar states
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [calendarDayData, setCalendarDayData] = useState<CalendarDay | null>(null)
  const [calendarLoading, setCalendarLoading] = useState(false)

  // Handle Speech synthesis (Listen to verse)
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        if (activeSpeechText === text) {
          return
        }
      }

      const cleanText = text.replace(/dhṛtarāṣṭraḥ|uvāca|kṣetre|yuyutsavaḥ|māmakāḥ|pāṇḍavāś/gi, '') // simplify pronunciation
      const newUtterance = new SpeechSynthesisUtterance(cleanText)
      newUtterance.rate = 0.85
      newUtterance.pitch = 1.0
      
      newUtterance.onend = () => {
        setIsPlaying(false)
        setActiveSpeechText('')
      }

      newUtterance.onerror = () => {
        setIsPlaying(false)
        setActiveSpeechText('')
      }

      setActiveSpeechText(text)
      setIsPlaying(true)
      window.speechSynthesis.speak(newUtterance)
    } else {
      alert("Text-to-speech is not supported in this browser.")
    }
  }

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Interactive Japa Clicker
  const handleIncrementJapa = () => {
    if (mantraCount >= 107) {
      setMantraCount(0)
      setRoundsCount(prev => prev + 1)
    } else {
      setMantraCount(prev => prev + 1)
    }
  }

  const handleResetJapa = () => {
    setMantraCount(0)
    setRoundsCount(0)
  }

  // Fetch calendar info for a default location (Edison, US) to display live data on load
  const fetchDefaultCalendar = useCallback(async () => {
    setCalendarLoading(true)
    try {
      const today = new Date()
      const response = await fetch(`${API_URL}/calendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: "Edison",
          country: "United States",
          period: 1,
          year: today.getFullYear(),
          month: today.getMonth() + 1,
          day: today.getDate(),
        }),
      })
      const data = await response.json()
      if (data && data.days && data.days.length > 0) {
        setCalendarDayData(data.days[0])
        setSelectedLocation(data.location)
      }
    } catch (error) {
      console.error('Error fetching default calendar data:', error)
    } finally {
      setCalendarLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDefaultCalendar()
  }, [fetchDefaultCalendar])

  return (
    <div className="w-full max-w-7xl mx-auto space-y-24 px-4 sm:px-6 py-2 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 pt-2 lg:pt-6">
        {/* Floating Ambient Gradients */}
        <div className="absolute top-12 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="flex-1 space-y-8 max-w-2xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="h-3 w-3" />
            <span>Discover Bhav 2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-marcellus leading-tight"
          >
            Your Daily <br />
            <span className="text-primary italic">Spiritual</span> Companion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed font-sans max-w-lg mx-auto lg:mx-0"
          >
            Bhāv delivers daily wisdom, calculated Vaishnava festival calendars, and interactive spiritual habits to simplify your devotional practice. Beautifully crafted, deeply integrated.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a 
              href="https://apple.co/48CmhMl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-[1.03] active:scale-95"
            >
              <img src={AppleSVG} alt="Download on App Store" className="h-14 w-auto object-contain" />
            </a>
            <Link 
              to="/calendar" 
              className="flex items-center gap-2 px-6 h-14 rounded-2xl bg-card border border-border text-foreground hover:bg-muted font-marcellus font-semibold text-sm transition-all shadow-sm"
            >
              <span>Launch Web Calendar</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Quick Stats/Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-xs text-muted-foreground font-marcellus"
          >
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Offline Vedic Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Ad-Free Devotional Space</span>
            </div>
          </motion.div>
        </div>

        {/* Hero iPhone Image Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="flex-1 flex justify-center items-center relative"
        >
          {/* Decorative halo */}
          <div className="absolute w-80 h-80 rounded-full border border-primary/20 animate-[spin_80s_linear_infinite]" />
          <div className="absolute w-[22rem] h-[22rem] rounded-full border border-dashed border-secondary/20 animate-[spin_120s_linear_infinite]" />
          
          {/* iPhone Frame */}
          <div className="relative w-[300px] h-[610px] rounded-[50px] border-[12px] border-neutral-900 bg-neutral-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Screen Content Wrapper */}
            <div className="w-full h-full bg-[#FDFBF7] text-black font-sans relative flex flex-col justify-between overflow-hidden">
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-12 h-1 bg-neutral-800 rounded-full" />
              </div>

              {/* Screenshot Image Container */}
              <div className="w-full h-full relative overflow-hidden bg-[#FDFBF7]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeMockupTab}
                    src={mockupScreens[activeMockupTab]}
                    alt={`${activeMockupTab} Screen`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover select-none"
                  />
                </AnimatePresence>

                {/* Invisible interactive tab click zones overlaid on screenshot's tab bar */}
                <div className="absolute bottom-0 left-0 right-0 h-16 z-40 flex bg-transparent">
                  <button onClick={() => setActiveMockupTab('read')} className="flex-1 bg-transparent border-0 cursor-pointer outline-none" aria-label="Read tab" />
                  <button onClick={() => setActiveMockupTab('library')} className="flex-1 bg-transparent border-0 cursor-pointer outline-none" aria-label="Library tab" />
                  <button onClick={() => setActiveMockupTab('calendar')} className="flex-1 bg-transparent border-0 cursor-pointer outline-none" aria-label="Calendar tab" />
                  <button onClick={() => setActiveMockupTab('counter')} className="flex-1 bg-transparent border-0 cursor-pointer outline-none" aria-label="Counter tab" />
                  <button onClick={() => setActiveMockupTab('settings')} className="flex-1 bg-transparent border-0 cursor-pointer outline-none" aria-label="Settings tab" />
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle / Interactive control description */}
          <div className="absolute -bottom-8 bg-card border border-border px-3.5 py-1.5 rounded-full text-xs text-muted-foreground flex gap-3 shadow-md z-30">
            <span className="font-semibold text-primary">Interactive Demo:</span>
            <button onClick={() => setActiveMockupTab('read')} className={`hover:text-foreground transition-colors ${activeMockupTab === 'read' ? 'text-primary font-bold underline' : ''}`}>Read</button>
            <button onClick={() => setActiveMockupTab('library')} className={`hover:text-foreground transition-colors ${activeMockupTab === 'library' ? 'text-primary font-bold underline' : ''}`}>Library</button>
            <button onClick={() => setActiveMockupTab('calendar')} className={`hover:text-foreground transition-colors ${activeMockupTab === 'calendar' ? 'text-primary font-bold underline' : ''}`}>Calendar</button>
            <button onClick={() => setActiveMockupTab('counter')} className={`hover:text-foreground transition-colors ${activeMockupTab === 'counter' ? 'text-primary font-bold underline' : ''}`}>Counter</button>
            <button onClick={() => setActiveMockupTab('settings')} className={`hover:text-foreground transition-colors ${activeMockupTab === 'settings' ? 'text-primary font-bold underline' : ''}`}>Settings</button>
          </div>
        </motion.div>
      </section>

      {/* 2. THE 5 CORE FEATURES (WHAT IS BHAV) */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs uppercase font-bold text-primary tracking-widest font-marcellus">Deep Devotional Habit Building</h2>
          <h3 className="text-3xl sm:text-4xl font-bold font-marcellus">Wisdom. Organized. Simplified.</h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            The Bhāv platform builds structured devotion into your day-to-day life with advanced features integrated in a simple minimal experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Home Widgets */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-card border border-border/60 hover:border-primary/20 hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Smartphone className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold font-marcellus text-foreground">Home Screen Widgets</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stay connected to your spiritual progress with our beautiful new iOS Widgets. Track your daily Japa rounds, reading goals, and current verse right from your home screen.
              </p>
            </div>
            <span className="text-xs text-blue-500 font-semibold uppercase tracking-wider">iOS Native Integration</span>
          </motion.div>

          {/* Card 2: Reading */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-card border border-border/60 hover:border-primary/20 hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold font-marcellus text-foreground">Seamless Reading</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Swipe to seamlessly mark a verse as read. Jump to any verse using the new selector, share beautiful verse images, or listen to the verse audio (beta)!
              </p>
            </div>
            <span className="text-xs text-orange-500 font-semibold uppercase tracking-wider">Dynamic Layouts</span>
          </motion.div>

          {/* Card 3: Library */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-card border border-border/60 hover:border-primary/20 hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold font-marcellus text-foreground">Your Library & Reflections</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Easily access your saved verses and personal reflections. Mark your favorite verses for quick access later, keeping your devotional diary secure and organized.
              </p>
            </div>
            <span className="text-xs text-teal-500 font-semibold uppercase tracking-wider">Reflective Journaling</span>
          </motion.div>

          {/* Card 4: Calendar */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-card border border-border/60 hover:border-primary/20 hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold font-marcellus text-foreground">Personalized Calendar</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Let the internal engine calculate Ekadasi and Vedic festivals tailored to your location. Events are highlighted alongside your daily progress dots.
              </p>
            </div>
            <span className="text-xs text-red-500 font-semibold uppercase tracking-wider">Astro calculation</span>
          </motion.div>

          {/* Card 5: Japa Counter */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-card border border-border/60 hover:border-primary/20 hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold font-marcellus text-foreground">Immersive Counter</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Focus deeply with our new dynamic Japa rings and rich haptic feedback. Track your daily rounds, and hold the counter to easily decrement a mistake.
              </p>
            </div>
            <span className="text-xs text-green-500 font-semibold uppercase tracking-wider">Focus & Haptics</span>
          </motion.div>

          {/* Card 6: Coming Soon / Future */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-[#F57C00]/5 border border-[#F57C00]/20 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-[#F57C00]/10 text-primary flex items-center justify-center">
                <Compass className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold font-marcellus text-foreground">Community & Sanga</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect with spiritual peers, share devotional reflections, build community challenges, and read together in real-time. Coming soon to future versions.
              </p>
            </div>
            <span className="text-xs text-[#F57C00] font-semibold uppercase tracking-wider">Future Updates</span>
          </motion.div>
        </div>
      </section>

      {/* 3. INTERACTIVE DAILY VERSE EXPERIENCE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6 text-left">
          <span className="text-xs uppercase font-bold text-primary tracking-widest font-marcellus">Feature Highlight</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-marcellus">The Daily Verse Simulator</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Read Srimad Bhagavatam and Bhagavad Gita with the exact premium interface from the mobile app. Try the interactive collapsibles on the right:
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
              <span><strong>Listen:</strong> Play the Sanskrit text synthesis using local browser voices.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
              <span><strong>Word-by-word:</strong> Break down literal translations of ancient roots.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
              <span><strong>Key Insight & Purport:</strong> Deepen understanding of transcendental lessons.</span>
            </li>
          </ul>
        </div>

        {/* Replicated VerseCard iOS UI */}
        <div className="lg:col-span-7 w-full max-w-2xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-[0_12px_30px_-5px_rgba(0,0,0,0.05)] space-y-6">
            
            {/* Verse Header */}
            <div className="flex justify-between items-center">
              <span className="font-marcellus text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                {mockVerse.verseNumber}
              </span>
              
              <div className="flex items-center gap-2">
                {/* Complete Button */}
                <button 
                  onClick={() => setIsCompleted(!isCompleted)}
                  className={`p-2 rounded-full border transition-all ${
                    isCompleted 
                      ? 'bg-green-500/10 border-green-500/30 text-green-600' 
                      : 'bg-muted border-border hover:bg-primary/5 text-muted-foreground'
                  }`}
                  title="Mark as Read"
                >
                  <Check className="h-4.5 w-4.5" />
                </button>

                {/* Favorite Button */}
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full border transition-all ${
                    isFavorite 
                      ? 'bg-primary/10 border-primary/30 text-primary' 
                      : 'bg-muted border-border hover:bg-primary/5 text-muted-foreground'
                  }`}
                  title="Add to Favorites"
                >
                  <Heart className={`h-4.5 w-4.5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Sanskrit Text */}
            <div className="text-center py-4 space-y-4">
              <p className="text-xl sm:text-2xl font-serif font-bold text-foreground leading-loose whitespace-pre-line">
                {mockVerse.verse}
              </p>
              
              {/* Listen button */}
              <div className="flex justify-center gap-2">
                <button 
                  onClick={() => handleSpeak(mockVerse.verse)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  {isPlaying && activeSpeechText === mockVerse.verse ? (
                    <>
                      <Pause className="h-3.5 w-3.5 fill-current" />
                      <span>Pause Audio</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Listen Sanskrit (Beta)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <hr className="border-border/40" />

            {/* Collapsible Word-by-Word */}
            <div className="space-y-2">
              <button 
                onClick={() => setIsWordByWordExpanded(!isWordByWordExpanded)}
                className="w-full flex justify-between items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5" />
                  <span>Word-by-word Translation</span>
                </div>
                <span className="text-xs text-primary">{isWordByWordExpanded ? 'Collapse' : 'Expand'}</span>
              </button>
              {isWordByWordExpanded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm leading-relaxed text-muted-foreground bg-muted/40 p-4 rounded-2xl border border-border/40 font-serif"
                >
                  {mockVerse.wordByWordDefinition}
                </motion.div>
              )}
            </div>

            <hr className="border-border/40" />

            {/* Collapsible Translation */}
            <div className="space-y-2">
              <button 
                onClick={() => setIsTranslationExpanded(!isTranslationExpanded)}
                className="w-full flex justify-between items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                <div className="flex items-center gap-2">
                  <Compass className="h-4.5 w-4.5" />
                  <span>Translation</span>
                </div>
                <span className="text-xs text-primary">{isTranslationExpanded ? 'Collapse' : 'Expand'}</span>
              </button>
              {isTranslationExpanded && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <p className="text-base sm:text-lg leading-relaxed text-foreground font-serif">
                    "{mockVerse.translation}"
                  </p>
                  <button 
                    onClick={() => handleSpeak(mockVerse.translation)}
                    className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary/80 hover:text-primary transition-colors"
                  >
                    <Volume2 className="h-3 w-3" />
                    <span>Listen Translation</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Collapsible Purport */}
            <div className="space-y-2">
              <button 
                onClick={() => setIsPurportExpanded(!isPurportExpanded)}
                className="w-full flex justify-between items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                <div className="flex items-center gap-2">
                  <Info className="h-4.5 w-4.5" />
                  <span>Full Purport (Explanation)</span>
                </div>
                <span className="text-xs text-primary">{isPurportExpanded ? 'Collapse' : 'Expand'}</span>
              </button>
              {isPurportExpanded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm leading-relaxed text-muted-foreground bg-muted/40 p-4 rounded-2xl border border-border/40 font-serif whitespace-pre-line"
                >
                  {mockVerse.purport}
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 4. CALENDAR TEASER SECTION */}
      <section className="p-8 sm:p-12 rounded-[2rem] bg-card border border-border/60 shadow-sm relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-[80px] -z-10" />

        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs uppercase font-bold text-red-500 tracking-widest font-marcellus">Vaishnava Calendar System</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-marcellus">Precise Vedic Calculations</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Bhāv application compiles location-based solar/lunar coordination (tithis, nakshatras) and alerts you of fasting days (Ekadasi) and festivals directly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-muted/50 border border-border/40 space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Tithis & Nakshatras</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automatically details the lunar day index (tithi) and planetary constraints.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/50 border border-border/40 space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Break-fast Schedules</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Lists local Sunrise schedules and Ekadasi break-fast parana windows precisely.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link 
              to="/calendar" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white hover:bg-primary/95 font-marcellus font-semibold text-sm transition-all shadow-sm"
            >
              <span>Access Complete Calendar</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Live / Simulated Widget on Homepage */}
        <div className="lg:col-span-5 w-full">
          <div className="p-6 rounded-3xl bg-background border border-border/80 shadow-md space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <span className="font-marcellus text-sm font-bold">Vedic Astro Engine</span>
              </div>
              <span className="text-[10px] uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Live Data</span>
            </div>

            {calendarLoading ? (
              <p className="text-xs text-muted-foreground">Calculating planetary alignments...</p>
            ) : calendarDayData ? (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <span className="text-[10px] text-muted-foreground block uppercase font-semibold">Today in {selectedLocation?.city || 'Edison'}</span>
                  <span className="text-base font-bold font-serif text-foreground block mt-1">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-card border border-border/60 text-center">
                    <span className="text-[9px] uppercase font-bold text-muted-foreground block mb-0.5">Tithi</span>
                    <span className="text-xs font-semibold text-foreground">{calendarDayData.astrodata.tithi || 'Calculation Error'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border/60 text-center">
                    <span className="text-[9px] uppercase font-bold text-muted-foreground block mb-0.5">Nakshatra</span>
                    <span className="text-xs font-semibold text-foreground">{calendarDayData.astrodata.naksatra || 'Calculation Error'}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-wider block">Devotional Events</span>
                  {calendarDayData.events && calendarDayData.events.length > 0 ? (
                    calendarDayData.events.map((event, idx) => (
                      <p key={idx} className="text-xs text-foreground font-medium flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span>{event.text}</span>
                      </p>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">No specific fasting observances for today.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
                <p>Ensure API Connection to view calculations</p>
                <button onClick={fetchDefaultCalendar} className="text-primary underline mt-2">Retry Loading</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE JAPA MEDITATIONHabits & COUNTER */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Interactive Japa Widget */}
        <div className="lg:col-span-6 flex justify-center items-center w-full max-w-md mx-auto order-last lg:order-first">
          <div className="w-full p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-sm space-y-6 text-center">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-primary tracking-widest font-marcellus">Japa Counter</span>
              <button 
                onClick={handleResetJapa}
                className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                title="Reset counter"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Simulated Japa Circle Clicker */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <button 
                onClick={handleIncrementJapa}
                className="relative w-48 h-48 rounded-full bg-background border border-border/80 flex flex-col items-center justify-center hover:scale-[1.02] active:scale-95 transition-all shadow-inner focus:outline-none group"
              >
                {/* SVG Progress Ring */}
                <svg className="absolute inset-0 transform -rotate-90 w-full h-full">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="stroke-primary/10"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="stroke-primary"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray="552"
                    strokeDashoffset={552 - (552 * mantraCount) / 108}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                  />
                </svg>

                {/* Inner Counter Labels */}
                <span className="text-4xl font-bold font-serif text-foreground">{mantraCount}</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">Mantras</span>
                <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-primary font-bold uppercase tracking-wider">
                  Click to Count
                </div>
              </button>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/40 border border-border/60 rounded-2xl">
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Completed Rounds</span>
                  <span className="text-xl font-bold text-foreground mt-1 block">{roundsCount}</span>
                </div>
                <div className="p-3 bg-muted/40 border border-border/60 rounded-2xl">
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Daily Target</span>
                  <span className="text-xl font-bold text-foreground mt-1 block">16 Rounds</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic">
              * Click the circle above to record Japa rounds. A single full round equals 108 mantras.
            </p>
          </div>
        </div>

        {/* habit copywriting */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <span className="text-xs uppercase font-bold text-primary tracking-widest font-marcellus">Habit Tracking</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-marcellus">Cultivate Spiritual Habits</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bhāv treats habit formation as a sacred process. Through visual cues, haptic clicking mechanisms, and progress tracking, the app establishes devotional consistency.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold font-marcellus text-foreground">Round Counters</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                  Keep track of Japa rounds without losing focus. The native app registers rounds with seamless haptics.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold font-marcellus text-foreground">Habit History</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                  Track reading stats and completion rings to maintain visual momentum day by day.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 6. CALL TO ACTION DOWNLOAD */}
      <section className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-[#F57C00] to-[#E65100] text-white text-center space-y-8 relative overflow-hidden">
        {/* Visual elements inside CTA */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-black/10 rounded-full blur-2xl" />

        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-2xl">ॐ</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-marcellus tracking-tight">Begin Your Devotional Path</h2>
          <p className="text-base text-white/80 leading-relaxed font-sans max-w-lg mx-auto">
            Get Bhav on your iPhone to access widgets, local notification reminders, daily chanting counters, and reading history trackers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://apple.co/48CmhMl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-[1.05] active:scale-95"
          >
            <img src={AppleSVG} alt="Download on App Store" className="h-14 w-auto object-contain" />
          </a>
          <div className="flex flex-col items-center opacity-70">
            <img src={GooglePlayStoreSVG} alt="Android Google Play Store" className="h-14 w-auto object-contain select-none grayscale pointer-events-none opacity-40" />
            <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider text-white/80">Coming soon on Android</span>
          </div>
        </div>
      </section>
    </div>
  )
}