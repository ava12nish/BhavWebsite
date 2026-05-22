//import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import SuvratAbout from "../assets/suvrat_about.png"
import AvanishAbout from "../assets/avanish_about.png"
import DamodarAbout2 from "../assets/damodar_about_2.png"

export default function About() {
  const team = [
    {
      name: 'Avanish Samala',
      role: 'Founder, Chief Executive Officer', 
      email: 'avanishsamala@gmail.com',
      instagram: 'ava12nish',
      image: AvanishAbout,
      bio: 'Leads the vision for Bhāv and its mission to connect people with Vedic wisdom.'
    },
    {
      name: 'Damodar Kamani',
      role: 'Lead Engineer, Chief Operating Officer',
      email: 'damodarkamani@gmail.com',
      instagram:'dam_kamani',
      image: DamodarAbout2,
      bio: "Leads technical operations, driving the development of Bhāv's app and website."
    },
    {
      name: 'Suvrat Agrawal',
      role: 'Designer, Chief Marketing Officer',
      email: 'suvrat.agrawal@gmail.com',
      instagram: 'suvrat2108',
      image: SuvratAbout,
      bio: "Leads marketing, growth strategies, and outreach to expand Bhāv's presence."
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-white/10 backdrop-blur-md border-none shadow-xl text-white mb-8">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-marcellus text-center">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <p className="text-center text-white/90 font-marcellus">
            Our mission is to connect people with the wisdom of the Vedas and foster a community of learning and growth.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-none shadow-xl text-white">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-marcellus text-center">Our Team</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 relative mx-auto w-32 h-32">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="rounded-full object-cover shadow-[0px_4px_9px_3px_rgba(0,_0,_0,_0.2)] cursor-pointer"
                  />
                </div>
                <h3 className="text-xl font-marcellus mb-2">{person.name}</h3>
                <p className="text-white/70 mb-1">{person.role}</p>
                <p className="text-white/70 mb-1 cursor-pointer" onClick={() => window.open(`mailto:${person.email}`, 
                "_blank"
                )}>{person.email}</p>
                <div className="flex items-center justify-center text-white/70 mb-3 gap-1 cursor-pointer" onClick={() => window.open(`https://instagram.com/${person.instagram}`, "_blank")}>
                  <Instagram size={16} className="text-white/70" />
                  <span>{person.instagram}</span>
                </div>
                <p className="text-white/90 text-sm">{person.bio}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}