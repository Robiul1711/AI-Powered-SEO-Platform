import React from "react";
import CommonBanner from "@/components/common/CommonBanner";
import bgImage from "@/assets/images/biograph.webp";

const PrivacyPolicy = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <CommonBanner
        title="Privacy Policy"
        image={bgImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy" },
        ]}
      />
      <div className="section-padding-x section-padding-y max-w-5xl mx-auto">
        <div className="space-y-12 font-inter text-gray-300">
          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">1. Introduction</h2>
            <p className="leading-relaxed mb-4">
              Welcome to GAJURA. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.
            </p>
            <p className="leading-relaxed">
              In this privacy notice, if we refer to "Website," we are referring to any website of ours that references or links to this policy. If we refer to "Services," we are referring to our Website, and other related services, including any sales, marketing, or events.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">2. Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website, or otherwise when you contact us.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Names and Contact Data</li>
              <li>Credentials and Security Data</li>
              <li>Payment and Transaction Information</li>
              <li>Subscription Data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>To facilitate account creation and logon process</li>
              <li>To post testimonials</li>
              <li>Request feedback</li>
              <li>To manage user accounts</li>
              <li>To send administrative information to you</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">4. Data Security</h2>
            <p className="leading-relaxed">
              We aim to protect your personal information through a system of organizational and technical security measures. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">5. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions or comments about this notice, you may email us at support@gajura.ai or by post to our official registered address.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
