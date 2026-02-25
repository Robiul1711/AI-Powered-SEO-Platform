import React from "react";
import TagLines from "../common/TagLines";
import Title from "../common/Title";
import GlowText from "../common/GlowText";
import CommonButton from "../common/CommonButton";

interface CheckIconProps {
  className?: string;
}

const CheckIcon = ({ className = "w-4 h-4" }: CheckIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

interface PricingCardProps {
  plan: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

const PricingCard = ({
  name,
  price,
  subtitle,
  features,
  is_popular,
  button_text
}: {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  is_popular: boolean;
  button_text: string;
}) => (
  <div
    className={`relative md:p-8 p-6 rounded-[22px] sm:rounded-[30px] transition-all duration-500 flex flex-col h-full group bg-[linear-gradient(162deg,#2D2D2D_0.9%,#060606_99.1%)] 
    ${is_popular ? "border-[4.991px] border-[#B57CFF]" : "border-[4.991px] border-white/20"}`}
  >
    {is_popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <span className="bg-[#AC6CFF] text-white text-[12px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(172,108,255,0.5)]">
          Most Popular
        </span>
      </div>
    )}

    <div className="mb-8">
      <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-2xl font-orbitron font-bold uppercase tracking-[2px] mb-4">
        {name}
      </h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          ${price}
        </span>
        <span className="text-white/40 text-sm font-medium">/month</span>
      </div>
      <p className="text-white/40 text-sm mt-4 leading-relaxed">
        {subtitle}
      </p>
    </div>

    <CommonButton
      className={`w-full !py-4 ${is_popular ? "bg-bg-custom" : "bg-white/10!"}`}
    >
      {button_text || "Get Started"}
    </CommonButton>

    <div className="mt-8 p-4 flex-grow rounded-2xl bg-[rgba(40,40,40,0.70)]">
      <p className="text-white text-sm sm:text-base md:text-lg font-bold uppercase tracking-[2px] mb-4">
        What’s Included
      </p>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`mt-0.5 p-0.5 rounded-full ${is_popular ? "bg-[#AC6CFF]/20 text-[#AC6CFF]" : "bg-white/10 text-white/80"}`}>
              <CheckIcon />
            </div>
            <span className="text-white/80 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ServicePricing = ({ serviceData }: { serviceData: any }) => {
  // Use API data or empty array
  const dynamicPricing = serviceData?.pricing || [];

  return (
    <section className="section-padding-x section-padding-y relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#AC6CFF]/10 blur-[120px] rounded-full -z-10" />

      <div className="flex flex-col items-center gap-4 font-inter max-w-4xl mx-auto text-center mb-16">
        <TagLines>Simple, Transparent Pricing</TagLines>
        <Title level="title48" className="text-white">
          Choose Your <GlowText>Growth Plan</GlowText>
        </Title>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl font-inter">
          Everything you need to dominate search results, from basic optimization to enterprise-scale growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto font-inter">
        {dynamicPricing.map((plan: any) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default ServicePricing;
