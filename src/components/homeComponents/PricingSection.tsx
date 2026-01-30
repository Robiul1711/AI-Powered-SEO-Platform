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
  plan,
  price,
  period,
  description,
  features,
  isFeatured = false,
}: PricingCardProps) => (
<div
  className={`relative p-8 
  rounded-[30px] 

  transition-all duration-500 
  flex flex-col h-full group

  
  ${
    isFeatured
      ? "bg-[linear-gradient(162deg,_#2D2D2D_0.9%,_#060606_99.1%)] border-[4.991px]   border-[#B57CFF]"
      : "  border-[4.991px]   bg-[linear-gradient(162deg,_#2D2D2D_0.97%,_#060606_99.03%)] border-white/10 border-white/10 border-white/20 bg-white/[0.07]"
  }`}
>

    {isFeatured && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <span className="bg-[#AC6CFF] text-white text-[12px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(172,108,255,0.5)]">
          Most Popular
        </span>
      </div>
    )}

    <div className="mb-8">
      <h3 className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl font-orbitron font-bold uppercase tracking-[2px] mb-4">
        {plan}
      </h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          {price}
        </span>
        <span className="text-white/40 text-sm font-medium">{period}</span>
      </div>
      <p className="text-white/50 text-sm mt-4 leading-relaxed">
        {description}
      </p>
    </div>
    <CommonButton
      className={`w-full !py-4  ${
        isFeatured
          ? "bg-bg-custom "
          : "!bg-white/10 "
      }`}
    >
      Get Started Now
    </CommonButton>
    <div className="mt-8 p-4 flex-grow rounded-2xl bg-[rgba(40,40,40,0.70)]">
      <p className="text-white/60 text-sm sm:text-base md:text-lg  font-bold uppercase tracking-[2px] mb-4">What’s Included</p>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div
              className={`mt-0.5 p-0.5 rounded-full ${isFeatured ? "bg-[#AC6CFF]/20 text-[#AC6CFF]" : "bg-white/10 text-white/40"}`}
            >
              <CheckIcon />
            </div>
            <span className="text-white/70 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>



    {/* Decorative glow for featured card */}
    {isFeatured && (
      <div className="absolute -inset-1 bg-[#AC6CFF]/20 blur-[40px] -z-10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    )}
  </div>
);

const PricingSection = () => {
  const pricingPlans = [
    {
      plan: "One—Time Audit",
      price: "$0",
      period: "one-time",
      description: "Perfect for understanding your current SEO status",
      features: [
        "Up to 3 Projects",
        "Basic AI Analysis",
        "Weekly Reports",
        "Community Support",
        "Standard Speed",
      ],
      isFeatured: false,
    },
    {
      plan: "Monthly SEO",
      price: "$49",
      period: "/month",
      description: "Ongoing optimization for consistent growth.",
      features: [
        "Unlimited Projects",
        "Advanced AI Insights",
        "Daily SEO Audit",
        "Priority Support",
        "Custom Keywords Tracking",
        "API Access",
      ],
      isFeatured: true,
    },
    {
      plan: "Custom Growth",
      price: "$199",
      period: "contact us",
      description: "Enterprise-level SEO for ambitious businesses.",
      features: [
        "White-label Reports",
        "Custom AI Training",
        "Dedicated Manager",
        "SLA Guarantee",
        "Security Compliance",
        "24/7 Phone Support",
      ],
      isFeatured: false,
    },
  ];

  return (
    <section className="section-padding-x section-padding-y relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#AC6CFF]/10 blur-[120px] rounded-full -z-10" />

      <div className="flex flex-col items-center gap-4 font-inter max-w-4xl mx-auto text-center mb-16">
        <TagLines>Simple, Transparent Pricing</TagLines>
        <Title level="title48" className="text-white">
          Choose Your <GlowText>Growth Plan</GlowText>
        </Title>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl font-inter">
          AI automation + human expertise. Pick the plan that matches your goals
          and scale your presence globally.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto font-inter">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
