import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "../components/ui/sheet"

const navItems = [
  { name: 'Calendar', path: '/' },
  { name: 'Download', path: '/download' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-4 backdrop-blur-md bg-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold font-marcellus cursor-pointer"
          onClick={() => window.location.href = "/"}
        >
          Bhāv
        </motion.h1>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`px-3 py-2 rounded-md transition-colors font-marcellus ${
                  location.pathname === item.path
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-white/80 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden hover:bg-white/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gradient-to-br from-[#5170ff] to-[#ff66c4] border-none pt-12">
            <div className="absolute right-4 top-4">
              <SheetClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-white/10"
                >
                  <X className="h-6 w-6 text-white" />
                </Button>
              </SheetClose>
            </div>
            <nav>
              <ul className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block rounded-lg px-4 py-2 text-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-white/20 text-white'
                          : 'hover:bg-white/10 text-white/80 hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}