import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Mail, Instagram } from 'lucide-react'

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto p-4"
    >
      <Card className="bg-white/10 backdrop-blur-md border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-marcellus text-center text-white">
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <Mail className="h-6 w-6 text-white" />
            <a href="mailto:contact@thebhavapp.com" className="text-white hover:underline font-marcellus">
              contact@thebhavapp.com
            </a>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Instagram className="h-6 w-6 text-white" />
            <a 
              href="https://www.instagram.com/thebhavapp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:underline font-marcellus"
            >
              @thebhavapp
            </a>
          </div>
          <div className="pt-4">
            <Button 
              className="w-full bg-white text-purple-600 hover:bg-purple-100 font-marcellus"
              onClick={() => window.location.href = 'mailto:contact@thebhavapp.com'}
            >
              Send us an email
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}