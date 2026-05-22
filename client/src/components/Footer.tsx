import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-background border-t border-border/40 py-8 px-6 mt-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between sm:flex-row gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground text-sm font-marcellus">
            © {currentYear} The Bhāv App. All Rights Reserved.
          </span>
        </div>
        <div>
          <nav className="flex space-x-6 text-sm font-marcellus">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </motion.footer>
  )
}