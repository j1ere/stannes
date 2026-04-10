// app/terms/page.tsx
import React from "react";
import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsAndConditions() {
  const lastUpdated = "April 10, 2026";

  return (
    <div className="min-h-screen bg-[#faf7f2] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#8c7d6a] hover:text-[#b8963e] mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#b8963e]/10 rounded-full mb-6">
            <BookOpen size={42} className="text-[#b8963e]" />
          </div>
          <h1 className="font-serif text-5xl font-bold text-[#1c1812] tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-[#8c7d6a] mt-3 text-lg">
            St. Anne's Chaplaincy • Maseno University
          </p>
          <p className="text-sm text-[#8c7d6a] mt-1">Last Updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-stone max-w-none bg-white rounded-3xl shadow-sm p-10 md:p-16 text-[#4a4235] leading-relaxed">
          <p className="text-lg">
            Welcome to the St. Anne's Chaplaincy digital platform at Maseno University. 
            By accessing or using our website, mobile application, or any associated services, 
            you agree to be bound by these Terms and Conditions.
          </p>

          <h2 className="text-2xl font-semibold text-[#1c1812] mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>
            These Terms and Conditions govern your use of the St. Anne's Chaplaincy website and services. 
            If you do not agree with any part of these terms, please <strong>do not use our platform</strong>.
          </p>

          <h2 className="text-2xl font-semibold text-[#1c1812] mt-12 mb-4">2. Our Mission and Services</h2>
          <p>
            St. Anne's Chaplaincy is the official Catholic Chaplaincy at Maseno University. 
            We provide spiritual formation, pastoral care, liturgical services, community outreach, 
            and various student activities aimed at nurturing faith and holistic growth among students and staff.
          </p>

          <h2 className="text-2xl font-semibold text-[#1c1812] mt-12 mb-4">3. User Conduct</h2>
          <p className="mb-4">You agree to use our platform only for lawful purposes and in a respectful manner. You shall not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Post or transmit any content that is offensive, defamatory, or discriminatory</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with the proper functioning of the platform</li>
            <li>Use the platform for unauthorized commercial purposes</li>
            <li>Share false or misleading information regarding events or activities</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1c1812] mt-12 mb-4">4. Events and Registration</h2>
          <p>
            Information about events, retreats, masses, and activities is provided for informational purposes. 
            While we strive to keep all information accurate and up to date, we do not guarantee the completeness 
            or accuracy of event details. 
          </p>

          <h2 className="text-2xl font-semibold text-[#1c1812] mt-12 mb-4">5. Intellectual Property</h2>
          <p>
            All content on this platform, including logos, text, images, prayers, and design elements, 
            is the intellectual property of St. Anne's Chaplaincy or its licensors. You may not reproduce, 
            distribute, or create derivative works without prior written permission.
          </p>

          <h2 className="text-2xl font-semibold text-[#1c1812] mt-12 mb-4">6. Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. Any personal information collected through this platform 
            (such as during login or contact or event registration) will be handled in accordance with our Privacy Policy 
            and applicable data protection laws in Kenya.
          </p>

          <h2 className="text-2xl font-semibold text-[#1c1812] mt-12 mb-4">7. Limitation of Liability</h2>
          <p>
            St. Anne's Chaplaincy is not liable for any direct, indirect, incidental, or consequential damages 
            arising from your use of this platform or participation in our activities. We provide the platform 
            on an "as is" basis without any warranties.
          </p>

          <h2 className="text-2xl font-semibold text-[#1c1812] mt-12 mb-4">8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the platform at any time, 
            with or without cause, if we believe you have violated these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-[#1c1812] mt-12 mb-4">9. Changes to Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time. We will notify users of significant 
            changes by posting the new Terms on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-[#1c1812] mt-12 mb-4">10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya. 
            Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the Kenyan courts.
          </p>

          <div className="mt-16 pt-10 border-t border-[#ddd5c0]">
            <h3 className="font-semibold text-[#1c1812] mb-3">Contact Us</h3>
            <p className="text-[#4a4235]">
              If you have any questions about these Terms and Conditions, please contact us at:<br />
              <strong>St. Anne's Chaplaincy</strong><br />
              Maseno University<br />
              Email: info@stanneschaplaincy.com<br />
              Phone: +254 759 556 624
            </p>
          </div>
        </div>

        <div className="text-center mt-12 text-sm text-[#8c7d6a]">
          © {new Date().getFullYear()} St. Anne's Chaplaincy, Maseno University. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}