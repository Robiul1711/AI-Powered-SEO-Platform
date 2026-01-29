import React from "react";
import authBg from "@/assets/images/authBg1.png";
import ProposalHeader from "@/components/pricingComponents/ProposalHeader";
import TimelineInvestment from "@/components/pricingComponents/TimelineInvestment";
import ExpectedResults from "@/components/pricingComponents/ExpectedResults";

const Pricing = () => {
  return (
    <div className="relative w-full pt-26 overflow-hidden">
      {/* Background Image - Changed absolute to fixed */}
      <div className="fixed inset-0 -z-10">
        <img
          src={authBg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        <ProposalHeader />
        <TimelineInvestment />
        <ExpectedResults />
      </div>
    </div>
  );
};

export default Pricing;