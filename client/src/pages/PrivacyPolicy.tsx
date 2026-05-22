import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function PrivacyPolicy() {
  // Function to handle external data subject access request
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto py-8"
    >
      <Card className="bg-white/10 backdrop-blur-md border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-marcellus text-center text-white">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none text-white">
          <p>Last updated: December 07, 2024</p>

          {/* Introduction */}
          <div className="mb-8">
            <p>
              This Privacy Notice for Bhav ("we," "us," or "our"), describes how and why we might access, collect, store, use, 
              and/or share ("process") your personal information when you use our services ("Services"), including when you:
            </p>
            <ul>
              <li>
                Visit our website at{' '}
                <a href="https://thebhavapp.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-300">
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">SUMMARY OF KEY POINTS</h2>
            <p><em>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</em></p>
            
            <div className="mt-4">
              <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>
              
              <p><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</p>
              
              <p><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</p>
              
              <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
              
              <p><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.</p>
              
              <p><strong>How do we keep your information safe?</strong> We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
              
              <p><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mb-8" id="toc">
            <h2 className="text-2xl font-bold mb-4">TABLE OF CONTENTS</h2>
            <ol className="list-decimal list-inside">
              <li><a href="#infocollect" className="text-blue-700 hover:text-blue-300">WHAT INFORMATION DO WE COLLECT?</a></li>
              <li><a href="#infouse" className="text-blue-700 hover:text-blue-300">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
              <li><a href="#legalbases" className="text-blue-700 hover:text-blue-300">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
              <li><a href="#whoshare" className="text-blue-700 hover:text-blue-300">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
              <li><a href="#cookies" className="text-blue-700 hover:text-blue-300">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
              <li><a href="#inforetain" className="text-blue-700 hover:text-blue-300">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
              <li><a href="#infosafe" className="text-blue-700 hover:text-blue-300">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
              <li><a href="#infominors" className="text-blue-700 hover:text-blue-300">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
              <li><a href="#privacyrights" className="text-blue-700 hover:text-blue-300">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
              <li><a href="#DNT" className="text-blue-700 hover:text-blue-300">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
              <li><a href="#uslaws" className="text-blue-700 hover:text-blue-300">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
              <li><a href="#policyupdates" className="text-blue-700 hover:text-blue-300">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
              <li><a href="#contact" className="text-blue-700 hover:text-blue-300">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
              <li><a href="#request" className="text-blue-700 hover:text-blue-300">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
            </ol>
          </div>

          {/* Would you like me to continue with the remaining sections? The content is quite extensive, 
              so I can break it down into multiple responses for better readability. */}

{/* Information Collection Section */}
<div className="mb-8" id="infocollect">
  <h2 className="text-2xl font-bold mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>
  
  <h3 className="text-xl font-bold mb-2">Personal information you disclose to us</h3>
  <p><em><strong>In Short:</strong> We collect personal information that you provide to us.</em></p>
  
  <p className="mt-4">
    We collect personal information that you voluntarily provide to us when you express an interest in obtaining
    information about us or our products and Services, when you participate in activities on the Services, or otherwise
    when you contact us.
  </p>

  <h3 className="text-xl font-bold mt-6 mb-2">Sensitive Information</h3>
  <p>We do not process sensitive information.</p>

  <h3 className="text-xl font-bold mt-6 mb-2">Application Data</h3>
  <p>If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:</p>
  <ul className="list-disc list-inside ml-4">
    <li>
      <em>Geolocation Information.</em> We may request access or permission to track location-based information 
      from your mobile device, either continuously or while you are using our mobile application(s), to provide 
      certain location-based services. If you wish to change our access or permissions, you may do so in your 
      device's settings.
    </li>
    <li>
      <em>Push Notifications.</em> We may request to send you push notifications regarding your account or certain 
      features of the application(s). If you wish to opt out from receiving these types of communications, you may 
      turn them off in your device's settings.
    </li>
  </ul>
</div>

{/* Information Processing Section */}
<div className="mb-8" id="infouse">
  <h2 className="text-2xl font-bold mb-4">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
  
  <p><em><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, 
  communicate with you, for security and fraud prevention, and to comply with law.</em></p>

  <p className="mt-4">
    We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
  </p>
  <ul className="list-disc list-inside ml-4">
    <li>To deliver and facilitate delivery of services to the user</li>
    <li>To respond to user inquiries/offer support to users</li>
    <li>To send administrative information to you</li>
    <li>To send marketing and promotional communications</li>
    <li>To protect our Services</li>
    <li>To comply with our legal obligations</li>
    <li>To evaluate and improve our Services, products, marketing, and your experience</li>
  </ul>
</div>

{/* Legal Bases Section */}
<div className="mb-8" id="legalbases">
  <h2 className="text-2xl font-bold mb-4">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
  
  <p><em><strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason to do so.</em></p>

  <p className="mt-4">We rely on the following legal bases to process your personal information:</p>
  <ul className="list-disc list-inside ml-4">
    <li><strong>Consent:</strong> We may process your information if you have given us permission to use your personal information for a specific purpose.</li>
    <li><strong>Legal Obligations:</strong> We may process your information where we believe it is necessary for compliance with our legal obligations.</li>
    <li><strong>Legitimate Interests:</strong> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests.</li>
    <li><strong>Performance of a Contract:</strong> We may process your information when we believe it is necessary to fulfill our contractual obligations to you.</li>
  </ul>
</div>

{/* Information Sharing Section */}
<div className="mb-8" id="whoshare">
  <h2 className="text-2xl font-bold mb-4">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
  
  <p><em><strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.</em></p>

  <p className="mt-4">
    We may need to share your personal information in the following situations:
  </p>
  <ul className="list-disc list-inside ml-4">
    <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
    <li><strong>When we use Google Maps Platform APIs:</strong> We may share your information with certain Google Maps Platform APIs (e.g., Google Maps API, Places API).</li>
    <li><strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
  </ul>
</div>
          {/* Cookies Section */}
          <div className="mb-8" id="cookies">
            <h2 className="text-2xl font-bold mb-4">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
            
            <p><em><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</em></p>

            <p className="mt-4">
              We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. 
              Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
            </p>
          </div>

          {/* Information Retention Section */}
          <div className="mb-8" id="inforetain">
            <h2 className="text-2xl font-bold mb-4">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
            
            <p><em><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</em></p>

            <p className="mt-4">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, 
              unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
            </p>

            <p className="mt-4">
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize 
              such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), 
              then we will securely store your personal information and isolate it from any further processing until deletion is possible.
            </p>
          </div>

          {/* Information Safety Section */}
          <div className="mb-8" id="infosafe">
            <h2 className="text-2xl font-bold mb-4">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
            
            <p><em><strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.</em></p>

            <p className="mt-4">
              We have implemented appropriate and reasonable technical and organizational security measures designed to protect 
              the security of any personal information we process. However, despite our safeguards and efforts to secure your 
              information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 
              100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties 
              will not be able to defeat our security and improperly collect, access, steal, or modify your information. 
              Although we will do our best to protect your personal information, transmission of personal information to and 
              from our Services is at your own risk. You should only access the Services within a secure environment.
            </p>
          </div>

          {/* Information from Minors Section */}
          <div className="mb-8" id="infominors">
            <h2 className="text-2xl font-bold mb-4">8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
            
            <p><em><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</em></p>

            <p className="mt-4">
              We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, 
              you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent 
              to such minor dependent's use of the Services. If we learn that personal information from users less than 
              18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly 
              delete such data from our records. If you become aware of any data we may have collected from children 
              under age 18, please contact us at contact@thebhavapp.com.
            </p>
          </div>

          {/* Would you like me to continue with the remaining sections? 
              The next sections will cover Privacy Rights, Controls, Updates, and Contact Information. */}
                      {/* Privacy Rights Section */}
          <div className="mb-8" id="privacyrights">
            <h2 className="text-2xl font-bold mb-4">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
            
            <p><em><strong>In Short:</strong> You may review, change, or terminate your account at any time.</em></p>

            <p className="mt-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Right to access personal data</li>
              <li>Right to correct inaccuracies in your personal data</li>
              <li>Right to request deletion of your personal data</li>
              <li>Right to obtain a copy of the personal data you previously shared with us</li>
              <li>Right to opt out of the processing of your personal data</li>
              <li>Right to non-discrimination for exercising your rights</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-2">How to Exercise Your Rights</h3>
            <p>
              To exercise your rights, you can contact us by submitting a{' '}
              <button 
                onClick={() => window.open('https://app.termly.io/notify/83e5a5b1-c088-4407-bcbd-7a1493788440', '_blank')}
                className="text-blue-700 hover:text-blue-300 underline"
              >
                data subject access request
              </button>
              , or by referring to the contact details provided below.
            </p>
          </div>

          {/* Do Not Track Section */}
          <div className="mb-8" id="DNT">
            <h2 className="text-2xl font-bold mb-4">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
            
            <p>
              Most web browsers and some mobile operating systems and applications include a Do-Not-Track ("DNT") feature or 
              setting you can activate to signal your privacy preference not to have data about your online browsing activities 
              monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals 
              has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that 
              automatically communicates your choice not to be tracked online.
            </p>
          </div>

          {/* US Privacy Rights Section */}
          <div className="mb-8" id="uslaws">
            <h2 className="text-2xl font-bold mb-4">11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
            
            <p><em><strong>In Short:</strong> If you are a resident of the United States, you are granted specific rights regarding access to your personal information.</em></p>

            <p className="mt-4">
              Under the California "Shine The Light" law, California residents have the right to request and obtain from us, 
              once a year and free of charge, information about categories of personal information (if any) we disclosed to 
              third parties for direct marketing purposes and the names and addresses of all third parties with which we shared 
              personal information in the immediately preceding calendar year.
            </p>
          </div>

          {/* Updates to Privacy Notice Section */}
          <div className="mb-8" id="policyupdates">
            <h2 className="text-2xl font-bold mb-4">12. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
            
            <p><em><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>

            <p className="mt-4">
              We may update this privacy notice from time to time. The updated version will be indicated by an updated 
              "Revised" date at the top of this privacy notice. If we make material changes to this privacy notice, we may 
              notify you either by prominently posting a notice of such changes or by directly sending you a notification. 
              We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
            </p>
          </div>

          {/* Contact Section */}
          <div className="mb-8" id="contact">
            <h2 className="text-2xl font-bold mb-4">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
            
            <p>
              If you have questions or comments about this notice, you may email us at{' '}
              <a href="mailto:contact@thebhavapp.com" className="text-blue-700 hover:text-blue-300">
                contact@thebhavapp.com
              </a>
              {' '}
            </p>

            <div className="mt-4">
              <p>Bhav</p>
              {/* <p>33 Stonewall Drive</p>
              <p>Edison, NJ 08820</p>
              <p>United States</p> */}
            </div>
          </div>

          {/* Review/Update/Delete Data Section */}
          <div className="mb-8" id="request">
            <h2 className="text-2xl font-bold mb-4">14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
            
            <p>
              You have the right to request access to the personal information we collect from you, change that information, or 
              delete it. To request to review, update, or delete your personal information, please{' '}
              <button 
                onClick={() => window.open('https://app.termly.io/notify/83e5a5b1-c088-4407-bcbd-7a1493788440', '_blank')}
                className="text-blue-700 hover:text-blue-300 underline"
              >
                submit a data subject access request
              </button>.
            </p>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}