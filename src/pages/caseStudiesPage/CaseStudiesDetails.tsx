import CommonBanner from "@/components/common/CommonBanner";
import React from "react";
import CaseStudiesBg from "@/assets/images/CaseStudies.png";
import ProjectDetails from "@/components/caseStudiesComponents/ProjectDetails";
import StartFreeToday from "@/components/homeComponents/StartFreeToday";

const CaseStudiesDetails = () => {
  return (
    <div>
      <CommonBanner
        title="Case Studies"
        image={CaseStudiesBg}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies Details", href: "/case-studies-details" },
        ]}
      />
      <div className="section-padding-x">
        <ProjectDetails />
           <StartFreeToday />
      </div>
    </div>
  );
};

export default CaseStudiesDetails;
