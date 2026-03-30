import React from "react";
import authBg from "@/assets/images/authBg1.png";
import ProposalHeader from "@/components/pricingComponents/ProposalHeader";
import TimelineInvestment from "@/components/pricingComponents/TimelineInvestment";
import ExpectedResults from "@/components/pricingComponents/ExpectedResults";
import PricingSection from "@/components/common/PricingSection";
import useClient from "@/hooks/useClient";

const Pricing = () => {
    const { data: pricingPlans, isLoading } = useClient({
    queryKey: ["pricing-plans"], // Add slug to key to refetch on route change
    url: `/pricing-plans`,
  });

  return (
    <div className="relative w-full pt-26 overflow-hidden">
      {/* Background Image - Changed absolute to fixed */}
      {/* <div className="fixed inset-0 -z-10">
        <img src={authBg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10">
        <ProposalHeader />
        <TimelineInvestment />
        <ExpectedResults />
      </div> */}
      <PricingSection pricingPlansData={(pricingPlans as any)?.data} isLoading={isLoading}/>
    </div>
  );
};

export default Pricing;
