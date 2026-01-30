import CommonBanner from "@/components/common/CommonBanner";
import React from "react";
import contactBg from "@/assets/images/contactBg.png";
import ContactInfo from "@/components/contactComponents/ContactInfo";
import ContactForm from "@/components/contactComponents/ContactForm";

const Contact = () => {
  return (
    <div>
      <CommonBanner
        title="Contact Us"
        image={contactBg}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <div className="section-padding-x section-padding-y">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start ">
          {/* Left Component */}
          <ContactInfo />

          {/* Right Component */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
