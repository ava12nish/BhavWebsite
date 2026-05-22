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
      className="max-w-md mx-auto p-4"
    >
      <Card className="bg-white/10 backdrop-blur-md border-none shadow-xl text-white">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-marcellus text-center">
            Download Bhāv
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <a 
              href="https://apple.co/48CmhMl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full transition-transform hover:scale-105 rounded-lg overflow-hidden"
            >
              <img 
                src={AppleSVG} 
                alt="Download on the App Store" 
                className="w-full max-w-[200px] mx-auto"
              />
            </a>
            
            <div className="relative">
              <a 
                href="#" 
                className="block w-full transition-transform hover:scale-105  rounded-lg overflow-hidden opacity-50 cursor-not-allowed"
                onClick={(e) => e.preventDefault()}
              >
                <img 
                  src={GooglePlayStoreSVG} 
                  alt="Get it on Google Play" 
                  className="w-full max-w-[200px] mx-auto"
                />
              </a>

                <br />
              <p className="text-center font-marcellus">Coming soon on the Google Play Store</p>
              
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}