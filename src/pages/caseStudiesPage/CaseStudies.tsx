import CommonBanner from "@/components/common/CommonBanner";
import React from "react";
import CaseStudiesBg from "@/assets/images/CaseStudies.webp";
import Projects from "@/components/caseStudiesComponents/Projects";
const CaseStudies = () => {
  return (
    <div>
      <CommonBanner
        title="Case Studies"
        image={CaseStudiesBg}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
        ]}
      />
      <Projects />
    </div>
  );
};

export default CaseStudies;
