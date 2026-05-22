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
      className="w-full max-w-md mx-auto p-4 py-12"
    >
      <Card className="bg-card border border-border/85 shadow-sm text-foreground rounded-3xl overflow-hidden">
        <CardHeader className="pt-8">
          <CardTitle className="text-3xl font-marcellus text-center">
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="flex items-center space-x-4 p-3 bg-muted/30 border border-border/40 rounded-2xl">
            <Mail className="h-5 w-5 text-primary" />
            <a href="mailto:contact@thebhavapp.com" className="text-foreground hover:text-primary transition-colors font-marcellus text-sm font-semibold">
              contact@thebhavapp.com
            </a>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-muted/30 border border-border/40 rounded-2xl">
            <Instagram className="h-5 w-5 text-primary" />
            <a 
              href="https://www.instagram.com/thebhavapp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors font-marcellus text-sm font-semibold"
            >
              @thebhavapp
            </a>
          </div>
          <div className="pt-4">
            <Button 
              className="w-full bg-primary hover:bg-primary/95 text-white font-marcellus rounded-xl py-6"
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