//import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { motion } from 'framer-motion'
import { Instagram, Mail } from 'lucide-react'
import SuvratAbout from "../assets/suvrat_about.png"
import AvanishAbout from "../assets/avanish_about.png"
import DamodarAbout2 from "../assets/damodar_about_2.png"

export default function About() {
  const team = [
    {
      name: 'Avanish Samala',
      role: 'Founder', 
      email: 'avanishsamala@gmail.com',
      instagram: 'ava12nish',
      image: AvanishAbout,
      bio: 'Leads the vision for Bhāv.'
    },
    {
      name: 'Damodar Kamani',
      role: 'Engineer',
      email: 'damodarkamani@gmail.com',
      instagram:'dam_kamani',
      image: DamodarAbout2,
      bio: 'Leads technical operations.'
    },
    {
      name: 'Suvrat Agrawal',
      role: 'Growth',
      email: 'suvrat.agrawal@gmail.com',
      instagram: 'suvrat2108',
      image: SuvratAbout,
      bio: 'Leads marketing'
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-8 py-6"
    >
      <Card className="bg-card border border-border/85 shadow-sm text-foreground rounded-3xl overflow-hidden">
        <CardHeader className="pt-8">
          <CardTitle className="text-3xl font-marcellus text-center text-primary">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 text-center max-w-2xl mx-auto">
          <p className="text-base font-serif text-foreground/80 leading-relaxed">
            Our mission is to connect people with the wisdom of the Vedas, creating accessible tools for spiritual habit building and fostering a global community of learning and growth.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border border-border/85 shadow-sm text-foreground rounded-3xl">
        <CardHeader className="pt-8">
          <CardTitle className="text-3xl font-marcellus text-center">Our Team</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {team.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center flex flex-col items-center"
              >
                <div className="mb-6 relative w-32 h-32">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="rounded-full w-full h-full object-cover shadow-[0px_4px_16px_rgba(0,0,0,0.1)] border-2 border-border/40 cursor-pointer hover:border-primary transition-all"
                  />
                </div>
                <h3 className="text-xl font-marcellus mb-1 font-semibold text-foreground">{person.name}</h3>
                <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">{person.role}</p>
                
                <div className="space-y-1.5 mb-4 text-xs font-sans text-muted-foreground">
                  <div 
                    className="flex items-center justify-center gap-1.5 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => window.open(`mailto:${person.email}`, "_blank")}
                  >
                    <Mail size={14} />
                    <span>{person.email}</span>
                  </div>
                  <div 
                    className="flex items-center justify-center gap-1.5 cursor-pointer hover:text-primary transition-colors" 
                    onClick={() => window.open(`https://instagram.com/${person.instagram}`, "_blank")}
                  >
                    <Instagram size={14} />
                    <span>@{person.instagram}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm font-serif leading-relaxed px-2">{person.bio}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}