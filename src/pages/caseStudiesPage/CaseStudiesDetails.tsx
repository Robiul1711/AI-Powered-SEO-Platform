import CommonBanner from "@/components/common/CommonBanner";
import React from "react";
import CaseStudiesBg from "@/assets/images/CaseStudies.webp";
import ProjectDetails from "@/components/caseStudiesComponents/ProjectDetails";
import StartFreeToday from "@/components/homeComponents/StartFreeToday";
import RelatedCaseStudies from "@/components/caseStudiesComponents/RelatedCaseStudies";

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
              <RelatedCaseStudies />
      </div>
    </div>
  );
};

export default CaseStudiesDetails;
