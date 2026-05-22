import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { motion } from 'framer-motion'
import GooglePlayStoreSVG from "../assets/GetItOnGooglePlay_Badge_Web_color_English.png"
import AppleSVG from "../assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"

export default function Download() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto p-4 py-12"
    >
      <Card className="bg-card border border-border/85 shadow-sm text-foreground rounded-3xl overflow-hidden">
        <CardHeader className="pt-8">
          <CardTitle className="text-3xl font-marcellus text-center">
            Download Bhāv
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-8 flex flex-col items-center">
            <a 
              href="https://apple.co/48CmhMl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-105 rounded-xl overflow-hidden shadow-sm"
            >
              <img 
                src={AppleSVG} 
                alt="Download on the App Store" 
                className="h-14 w-auto object-contain"
              />
            </a>
            
            <div className="w-full text-center border-t border-border/40 pt-6">
              <div className="opacity-50 select-none grayscale pointer-events-none mb-3">
                <img 
                  src={GooglePlayStoreSVG} 
                  alt="Get it on Google Play" 
                  className="h-14 w-auto object-contain mx-auto"
                />
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Coming soon on Android</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}