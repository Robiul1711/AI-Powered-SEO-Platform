import React from "react";
import CommonBanner from "@/components/common/CommonBanner";
import bgImage from "@/assets/images/biograph.png";

const CookiePolicy = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <CommonBanner
        title="Cookie Policy"
        image={bgImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cookie Policy", href: "/cookie-policy" },
        ]}
      />
      <div className="section-padding-x section-padding-y max-w-5xl mx-auto">
        <div className="space-y-12 font-inter text-gray-300">
          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">1. What Are Cookies?</h2>
            <p className="leading-relaxed mb-4">
              Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">2. How We Use Cookies</h2>
            <p className="leading-relaxed mb-4">
              We use cookies to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
            </p>
            <p className="leading-relaxed">
              We may also use trusted third party services that track this information on our behalf.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">3. Types of Cookies We Use</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-orbitron text-Primary font-semibold mb-2">Essential Cookies</h3>
                <p className="text-sm">Necessary for the operation of our Site. For example, cookies that enable you to log into secure areas of our Site.</p>
              </div>
              <div>
                <h3 className="text-lg font-orbitron text-Primary font-semibold mb-2">Performance and Analysis Cookies</h3>
                <p className="text-sm">Allow us to recognize and count the number of visitors and to see how visitors move around our Site when they are using it.</p>
              </div>
              <div>
                <h3 className="text-lg font-orbitron text-Primary font-semibold mb-2">Functional Cookies</h3>
                <p className="text-sm">Used to recognize you when you return to our Site. This enables us to personalize our content for you.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">4. Controlling Cookies</h2>
            <p className="leading-relaxed mb-4">
              You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Each browser is a little different, so look at your browser's Help menu to learn the correct way to modify your cookies.
            </p>
            <p className="leading-relaxed">
              If you turn cookies off, some features will be disabled. It won't affect the user's experience that make your site experience more efficient and some of our services will not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tight">5. Contact Information</h2>
            <p className="leading-relaxed">
              For any questions regarding our cookie policy, please contact us at privacy@gajura.ai.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
