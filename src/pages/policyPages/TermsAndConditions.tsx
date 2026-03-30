import React from "react";
import CommonBanner from "@/components/common/CommonBanner";
import bgImage from "@/assets/images/biograph.png";

const TermsAndConditions = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <CommonBanner
        title="Terms & Conditions"
        
        image={bgImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions", href: "/terms" },
        ]}
      />
      <div className="section-padding-x section-padding-y max-w-5xl mx-auto">
        <div className="space-y-12 font-inter text-gray-300">
          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">1. Agreement to Terms</h2>
            <p className="leading-relaxed mb-4">
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and GAJURA ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">2. Intellectual Property Rights</h2>
            <p className="leading-relaxed mb-4">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">3. User Representations</h2>
            <p className="leading-relaxed mb-4">
              By using the Site, you represent and warrant that (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">4. Prohibited Activities</h2>
            <p className="leading-relaxed mb-4">
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Systematically retrieve data or other content</li>
              <li>Make any unauthorized use of the Site</li>
              <li>Circumvent, disable, or otherwise interfere with security features</li>
              <li>Trick, defraud, or mislead us and other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">5. Limitation of Liability</h2>
            <p className="leading-relaxed mb-4">
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">6. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms and Conditions and your use of the Site are governed by and construed in accordance with the laws of the jurisdiction in which GAJURA is registered, without regard to its conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
