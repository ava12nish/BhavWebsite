import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function TermsOfService() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto py-8"
    >
      <Card className="bg-card border border-border/85 shadow-sm text-foreground rounded-3xl overflow-hidden">
        <CardHeader className="pt-8 border-b border-border/40">
          <CardTitle className="text-3xl font-marcellus text-center text-primary">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none text-foreground/80 p-8 space-y-6">
          <p className="text-xs text-muted-foreground">Last updated: December 07, 2024</p>
          
          <div className="space-y-4" id="agreement">
            <h2 className="text-xl font-bold font-marcellus text-foreground">AGREEMENT TO OUR LEGAL TERMS</h2>
            <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              <p>
                We are Bhav ("Company," "we," "us," or "our"). We operate Bhav, as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
              </p>
              <p>
                You can contact us by email at <a href="mailto:contact@thebhavapp.com" className="text-primary hover:underline">contact@thebhavapp.com</a>.
              </p>
              <p>
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Bhav, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </p>
              <p>
                Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
              </p>
              <p>
                We recommend that you print a copy of these Legal Terms for your records.
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="space-y-4 border-t border-border/40 pt-6">
            <h2 className="text-xl font-bold font-marcellus text-foreground">TABLE OF CONTENTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-primary">
              <a href="#services" className="hover:underline">1. OUR SERVICES</a>
              <a href="#ip" className="hover:underline">2. INTELLECTUAL PROPERTY RIGHTS</a>
              <a href="#userreps" className="hover:underline">3. USER REPRESENTATIONS</a>
              <a href="#prohibited" className="hover:underline">4. PROHIBITED ACTIVITIES</a>
              <a href="#ugc" className="hover:underline">5. USER GENERATED CONTRIBUTIONS</a>
              <a href="#license" className="hover:underline">6. CONTRIBUTION LICENSE</a>
              <a href="#sitemanage" className="hover:underline">7. SERVICES MANAGEMENT</a>
              <a href="#terms" className="hover:underline">8. TERM AND TERMINATION</a>
              <a href="#modifications" className="hover:underline">9. MODIFICATIONS AND INTERRUPTIONS</a>
              <a href="#law" className="hover:underline">10. GOVERNING LAW</a>
              <a href="#disputes" className="hover:underline">11. DISPUTE RESOLUTION</a>
              <a href="#corrections" className="hover:underline">12. CORRECTIONS</a>
              <a href="#disclaimer" className="hover:underline">13. DISCLAIMER</a>
              <a href="#liability" className="hover:underline">14. LIMITATIONS OF LIABILITY</a>
              <a href="#indemnification" className="hover:underline">15. INDEMNIFICATION</a>
              <a href="#userdata" className="hover:underline">16. USER DATA</a>
              <a href="#electronic" className="hover:underline">17. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</a>
              <a href="#misc" className="hover:underline">18. MISCELLANEOUS</a>
              <a href="#contact" className="hover:underline">19. CONTACT US</a>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8 border-t border-border/40 pt-6 text-sm text-foreground/80 leading-relaxed">
            
            {/* Services Section */}
            <div className="space-y-3" id="services">
              <h2 className="text-lg font-bold font-marcellus text-foreground">1. OUR SERVICES</h2>
              <p>
                The information provided when using the Services is not intended for distribution to or use by any person or 
                entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or 
                which would subject us to any registration requirement within such jurisdiction or country.
              </p>
            </div>

            {/* IP Rights Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="ip">
              <h2 className="text-lg font-bold font-marcellus text-foreground">2. INTELLECTUAL PROPERTY RIGHTS</h2>
              <h3 className="font-bold text-foreground">Our intellectual property</h3>
              <p>
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, 
                databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services 
                (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
              </p>
            </div>

            {/* User Representations Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="userreps">
              <h2 className="text-lg font-bold font-marcellus text-foreground">3. USER REPRESENTATIONS</h2>
              <p>
                By using the Services, you represent and warrant that: (1) you have the legal capacity and agree to comply with 
                these Legal Terms; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the 
                Services through automated or non-human means; (4) you will not use the Services for any illegal or unauthorized 
                purpose; and (5) your use of the Services will not violate any applicable law or regulation.
              </p>
            </div>

            {/* Prohibited Activities Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="prohibited">
              <h2 className="text-lg font-bold font-marcellus text-foreground">4. PROHIBITED ACTIVITIES</h2>
              <p>
                You may not access or use the Services for any purpose other than that for which we make the Services available. 
                The Services may not be used in connection with any commercial endeavors except those that are specifically 
                endorsed or approved by us.
              </p>
              <p className="mt-4">As a user of the Services, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground mt-2">
                <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li>Engage in any automated use of the system.</li>
              </ul>
            </div>

            {/* User Generated Contributions Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="ugc">
              <h2 className="text-lg font-bold font-marcellus text-foreground">5. USER GENERATED CONTRIBUTIONS</h2>
              <p>
                The Services does not offer users to submit or post content. We may provide you with the opportunity to create, 
                submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on 
                the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, 
                suggestions, or personal information or other material (collectively, "Contributions").
              </p>
            </div>

            {/* License Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="license">
              <h2 className="text-lg font-bold font-marcellus text-foreground">6. CONTRIBUTION LICENSE</h2>
              <p>
                By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant 
                that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, 
                transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, 
                sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, 
                translate, transmit, excerpt (in whole or in part), and distribute such Contributions for any purpose.
              </p>
            </div>

            {/* Services Management Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="sitemanage">
              <h2 className="text-lg font-bold font-marcellus text-foreground">7. SERVICES MANAGEMENT</h2>
              <p>
                We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; 
                (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal 
                Terms; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, 
                or disable any of your Contributions or any portion thereof; and (5) otherwise manage the Services in a manner 
                designed to protect our rights and property.
              </p>
            </div>

            {/* Term and Termination Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="terms">
              <h2 className="text-lg font-bold font-marcellus text-foreground">8. TERM AND TERMINATION</h2>
              <p>
                These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER 
                PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, 
                DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON.
              </p>
            </div>

            {/* Modifications and Interruptions Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="modifications">
              <h2 className="text-lg font-bold font-marcellus text-foreground">9. MODIFICATIONS AND INTERRUPTIONS</h2>
              <p>
                We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at 
                our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the 
                Services without notice at any time. We will not be liable to you or any third party for any modification.
              </p>
              <p className="mt-2 text-muted-foreground">
                We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other 
                problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors.
              </p>
            </div>

            {/* Governing Law Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="law">
              <h2 className="text-lg font-bold font-marcellus text-foreground">10. GOVERNING LAW</h2>
              <p>
                These Legal Terms shall be governed by and defined following the laws of the United States. Bhav and yourself 
                irrevocably consent that the courts of New Jersey shall have exclusive jurisdiction to resolve any dispute which 
                may arise in connection with these Legal Terms.
              </p>
            </div>

            {/* Dispute Resolution Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="disputes">
              <h2 className="text-lg font-bold font-marcellus text-foreground">11. DISPUTE RESOLUTION</h2>
              <h3 className="font-bold text-foreground">Informal Negotiations</h3>
              <p>
                To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms 
                (each a "Dispute" and collectively, the "Disputes") brought by either you or us, the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration.
              </p>
              <h3 className="font-bold text-foreground mt-4">Binding Arbitration</h3>
              <p>
                Any dispute arising out of or in connection with these Legal Terms, including any question regarding its 
                existence, validity, or termination, shall be referred to and finally resolved by the International Commercial 
                Arbitration Court under the European Arbitration Chamber.
              </p>
            </div>

            {/* Corrections Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="corrections">
              <h2 className="text-lg font-bold font-marcellus text-foreground">12. CORRECTIONS</h2>
              <p>
                There may be information on the Services that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
              </p>
            </div>

            {/* Disclaimer Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="disclaimer">
              <h2 className="text-lg font-bold font-marcellus text-foreground">13. DISCLAIMER</h2>
              <p className="uppercase text-xs tracking-wide text-muted-foreground leading-relaxed">
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT 
                YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN 
                CONNECTION WITH THE SERVICES AND YOUR USE THEREOF. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT.
              </p>
            </div>

            {/* Limitations of Liability Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="liability">
              <h2 className="text-lg font-bold font-marcellus text-foreground">14. LIMITATIONS OF LIABILITY</h2>
              <p className="uppercase text-xs tracking-wide text-muted-foreground leading-relaxed">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, 
                INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST 
                REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES.
              </p>
            </div>

            {/* Indemnification Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="indemnification">
              <h2 className="text-lg font-bold font-marcellus text-foreground">15. INDEMNIFICATION</h2>
              <p>
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our 
                respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or 
                demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of your use of the Services or breach of these Legal Terms.
              </p>
            </div>

            {/* User Data Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="userdata">
              <h2 className="text-lg font-bold font-marcellus text-foreground">16. USER DATA</h2>
              <p>
                We will maintain certain data that you transmit to the Services for the purpose of managing the performance of 
                the Services, as well as data relating to your use of the Services. You are solely responsible for all data that you transmit or that relates to any activity you have undertaken.
              </p>
            </div>

            {/* Electronic Communications Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="electronic">
              <h2 className="text-lg font-bold font-marcellus text-foreground">17. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
              <p>
                Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You 
                consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other 
                communications we provide to you electronically satisfy any legal requirement that such communication be in writing.
              </p>
            </div>

            {/* Miscellaneous Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="misc">
              <h2 className="text-lg font-bold font-marcellus text-foreground">18. MISCELLANEOUS</h2>
              <p>
                These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver.
              </p>
            </div>

            {/* Contact Section */}
            <div className="space-y-3 border-t border-border/40 pt-4" id="contact">
              <h2 className="text-lg font-bold font-marcellus text-foreground">19. CONTACT US</h2>
              <p>
                In order to resolve a complaint regarding the Services or to receive further information regarding use of the 
                Services, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted/40 rounded-2xl border border-border/40 space-y-1">
                <p className="font-bold text-foreground">Bhav</p>
                <p>
                  Email:{' '}
                  <a href="mailto:contact@thebhavapp.com" className="text-primary hover:underline">
                    contact@thebhavapp.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}