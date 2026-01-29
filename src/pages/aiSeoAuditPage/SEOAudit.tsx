import React from "react";
import authBg from "@/assets/images/authBg1.png";
import PoweredAnalysis from "@/components/aiSeoAuditComponents/PoweredAnalysis";

const SEOAudit = () => {
  return (
    <div className="relative w-full pt-26   overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={authBg}
          alt=""
          className="w-full h-full object-cover  "
        />
      </div>
      <PoweredAnalysis />
    </div>
  );
};

export default SEOAudit;
