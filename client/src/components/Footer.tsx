import { motion } from 'framer-motion'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="flex items-center space-x-2">
              <span className="text-white/80 text-sm">© 2024 The Bhāv App. All Rights Reserved.</span>
            </div>
            <div className="mt-4 sm:mt-0">
              <nav className="flex space-x-4">
                <a href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-sm -z-10"></div>
    </motion.footer>
  )
}