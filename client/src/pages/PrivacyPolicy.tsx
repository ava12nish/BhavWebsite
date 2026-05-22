import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto py-8"
    >
      <Card className="bg-card border border-border/85 shadow-sm text-foreground rounded-3xl overflow-hidden">
        <CardHeader className="pt-8 border-b border-border/40">
          <CardTitle className="text-3xl font-marcellus text-center text-primary">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none text-foreground/80 p-8 space-y-6">
          <p className="text-xs text-muted-foreground">Last updated: December 07, 2024</p>

          {/* Introduction */}
          <div className="space-y-4">
            <p>
              This Privacy Notice for Bhav ("we," "us," or "our"), describes how and why we might access, collect, store, use, 
              and/or share ("process") your personal information when you use our services ("Services"), including when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
              <li>
                Visit our website at{' '}
                <a href="https://thebhavapp.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://thebhavapp.com
                </a>
                , or any website of ours that links to this Privacy Notice
              </li>
              <li>Download and use our mobile application (Bhav), or any other application of ours that links to this Privacy Notice</li>
              <li>
                Use Bhav - Your Daily Spiritual Companion - Dive deeper into your spiritual practice with Bhav, 
                an app designed to deliver daily verses, reflections, and personalized reminders.
              </li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
          </div>

          {/* Key Points Summary */}
          <div className="space-y-4 border-t border-border/40 pt-6">
            <h2 className="text-xl font-bold font-marcellus text-foreground">SUMMARY OF KEY POINTS</h2>
            <p className="text-sm italic text-muted-foreground">This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-muted-foreground pt-2">
              <div className="p-4 bg-muted/40 rounded-2xl border border-border/40">
                <strong className="text-foreground block mb-1">What personal information do we process?</strong> 
                When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us.
              </div>
              <div className="p-4 bg-muted/40 rounded-2xl border border-border/40">
                <strong className="text-foreground block mb-1">Do we process sensitive info?</strong> 
                We do not process sensitive personal information.
              </div>
              <div className="p-4 bg-muted/40 rounded-2xl border border-border/40">
                <strong className="text-foreground block mb-1">How do we process your info?</strong> 
                We process your information to provide, improve, and administer our Services, and to comply with law.
              </div>
              <div className="p-4 bg-muted/40 rounded-2xl border border-border/40">
                <strong className="text-foreground block mb-1">Do we share personal info?</strong> 
                We may share information in specific situations and with specific third parties.
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="space-y-4 border-t border-border/40 pt-6" id="toc">
            <h2 className="text-xl font-bold font-marcellus text-foreground">TABLE OF CONTENTS</h2>
            <ol className="list-decimal pl-6 space-y-2 text-sm text-primary">
              <li><a href="#infocollect" className="hover:underline">WHAT INFORMATION DO WE COLLECT?</a></li>
              <li><a href="#infouse" className="hover:underline">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
              <li><a href="#legalbases" className="hover:underline">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
              <li><a href="#whoshare" className="hover:underline">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
              <li><a href="#cookies" className="hover:underline">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
              <li><a href="#inforetain" className="hover:underline">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
              <li><a href="#infosafe" className="hover:underline">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
              <li><a href="#infominors" className="hover:underline">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
              <li><a href="#privacyrights" className="hover:underline">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
              <li><a href="#DNT" className="hover:underline">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
              <li><a href="#uslaws" className="hover:underline">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
              <li><a href="#policyupdates" className="hover:underline">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
              <li><a href="#contact" className="hover:underline">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
              <li><a href="#request" className="hover:underline">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
            </ol>
          </div>

          {/* Sections */}
          <div className="space-y-8 border-t border-border/40 pt-6 text-sm text-foreground/80 leading-relaxed">
            
            {/* Information Collection Section */}
            <div className="space-y-3" id="infocollect">
              <h2 className="text-lg font-bold font-marcellus text-foreground">1. WHAT INFORMATION DO WE COLLECT?</h2>
              <h3 className="font-bold text-foreground">Personal information you disclose to us</h3>
              <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services.</p>
              
              <h3 className="font-bold text-foreground mt-4">Sensitive Information</h3>
              <p>We do not process sensitive information.</p>

              <h3 className="font-bold text-foreground mt-4">Application Data</h3>
              <p>If you use our application(s), we also may collect geolocation details (to display precise local calendar updates) and ask permissions for push notification triggers.</p>
            </div>

            {/* Information Processing Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="infouse">
              <h2 className="text-lg font-bold font-marcellus text-foreground">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
              <p>We process your information to deliver services, respond to user inquiries, protect security, verify user requests, and comply with law.</p>
            </div>

            {/* Legal Bases Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="legalbases">
              <h2 className="text-lg font-bold font-marcellus text-foreground">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
              <p>We process your personal information with your Consent, to meet legal compliance obligations, and to carry out legitimate business operations.</p>
            </div>

            {/* Information Sharing Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="whoshare">
              <h2 className="text-lg font-bold font-marcellus text-foreground">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
              <p>We may share coordinates with external location engines (Google Maps APIs) to translate coordinates for astronomical calculations.</p>
            </div>

            {/* Cookies Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="cookies">
              <h2 className="text-lg font-bold font-marcellus text-foreground">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
              <p>We may use cookies and similar tracking technologies to retrieve preference data, improving site security and load times.</p>
            </div>

            {/* Information Retention Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="inforetain">
              <h2 className="text-lg font-bold font-marcellus text-foreground">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
              <p>We retain personal information only as long as necessary to administer services and satisfy legal constraints.</p>
            </div>

            {/* Information Safety Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="infosafe">
              <h2 className="text-lg font-bold font-marcellus text-foreground">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
              <p>We protect user logs using industry standard encryption and security configurations. However, no internet-facing architecture is 100% immune to threats.</p>
            </div>

            {/* Information from Minors Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="infominors">
              <h2 className="text-lg font-bold font-marcellus text-foreground">8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
              <p>We do not market to or collect information from children under 18 years. Reach out to contact@thebhavapp.com if minor data is discovered on the platform.</p>
            </div>

            {/* Privacy Rights Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="privacyrights">
              <h2 className="text-lg font-bold font-marcellus text-foreground">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
              <p>You maintain access and deletion control over any provided data. Submit a <button onClick={() => window.open('https://app.termly.io/notify/83e5a5b1-c088-4407-bcbd-7a1493788440', '_blank')} className="text-primary hover:underline">data subject access request</button> for prompt processing.</p>
            </div>

            {/* Do Not Track Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="DNT">
              <h2 className="text-lg font-bold font-marcellus text-foreground">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
              <p>We do not currently monitor DNT browser signals, adhering to baseline server rules.</p>
            </div>

            {/* US Privacy Rights Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="uslaws">
              <h2 className="text-lg font-bold font-marcellus text-foreground">11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
              <p>Residents of specific states (e.g. California) hold additional access rights. Reach out directly for support details.</p>
            </div>

            {/* Updates to Privacy Notice Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="policyupdates">
              <h2 className="text-lg font-bold font-marcellus text-foreground">12. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
              <p>We revise this policy periodically to correspond with service additions and legal upgrades.</p>
            </div>

            {/* Contact Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="contact">
              <h2 className="text-lg font-bold font-marcellus text-foreground">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
              <p>If you have questions, mail us at <a href="mailto:contact@thebhavapp.com" className="text-primary hover:underline">contact@thebhavapp.com</a>.</p>
            </div>

            {/* Review/Update/Delete Data Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="request">
              <h2 className="text-lg font-bold font-marcellus text-foreground">14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
              <p>You can verify or delete records directly. <button onClick={() => window.open('https://app.termly.io/notify/83e5a5b1-c088-4407-bcbd-7a1493788440', '_blank')} className="text-primary hover:underline font-semibold">Submit a data subject request</button> and our team will handle it immediately.</p>
            </div>

          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}