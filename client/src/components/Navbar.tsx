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
  { name: 'Home', path: '/' },
  { name: 'Calendar', path: '/calendar' },
  { name: 'Download', path: '/download' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold font-marcellus cursor-pointer text-primary hover:opacity-90 flex items-center gap-2"
          >
            Bhāv
          </motion.h1>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`px-4 py-2 rounded-xl transition-all duration-300 font-marcellus text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
              className="md:hidden hover:bg-muted"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-background border-l border-border/40 pt-16 px-6">
            <div className="absolute right-4 top-4">
              <SheetClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-muted"
                >
                  <X className="h-6 w-6 text-foreground" />
                </Button>
              </SheetClose>
            </div>
            <nav className="mt-8">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block rounded-xl px-4 py-3 text-lg font-marcellus transition-all ${
                        location.pathname === item.path
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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