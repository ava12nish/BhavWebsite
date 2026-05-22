import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Calendar from "./pages/Calendar"
import About from "./pages/About"
import Download from "./pages/Download"
import Contact from "./pages/Contact" // Add this line
import { Footer } from './components/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#5170ff] to-[#ff66c4] text-white">
        <Navbar />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/about" element={<About />} />
            <Route path="/download" element={<Download />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}



