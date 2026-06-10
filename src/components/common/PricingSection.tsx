import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TagLines from "./TagLines";
import Title from "./Title";
import GlowText from "./GlowText";
import CommonButton from "./CommonButton";
import ServiceSelectModal from "./ServiceSelectModal";
import { encryptId } from "@/lib/encryption";

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
  id: string | number;
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  services?: { id: number; title: string; slug?: string }[];
  is_popular?: boolean;
  button_text?: string;
  onGetStarted: (plan: any) => void;
}

// Fallback dummy data when no plans are provided
const dummyPricingPlans = [
  {
    id: 1,
    name: "Starter",
    price: "99",
    subtitle: "Perfect for small businesses just getting started with SEO",
    features: [
      "Keyword research and analysis",
      "On-page optimization",
      "Monthly performance reports",
      "Basic technical SEO audit",
      "Email support",
    ],
    services: [],
    is_popular: false,
    button_text: "Get Started",
  },
  {
    id: 2,
    name: "Professional",
    price: "299",
    subtitle: "Ideal for growing businesses needing comprehensive SEO",
    features: [
      "Everything in Starter",
      "Content creation and optimization",
      "Link building strategy",
      "Local SEO optimization",
      "Advanced analytics dashboard",
      "Priority support",
    ],
    services: [],
    is_popular: true,
    button_text: "Choose Professional",
  },
  {
    id: 3,
    name: "Enterprise",
    price: "599",
    subtitle: "Full-service SEO for large businesses and agencies",
    features: [
      "Everything in Professional",
      "Custom strategy development",
      "White-label reporting",
      "API access",
      "Dedicated account manager",
      "24/7 phone support",
    ],
    services: [],
    is_popular: false,
    button_text: "Contact Sales",
  },
];

const PricingCard = ({
  id,
  name,
  price,
  subtitle,
  features,
  is_popular = false,
  button_text = "Get Started Now",
  onGetStarted,
}: PricingCardProps) => (
  <div
    className={`relative md:p-8 p-6 
  rounded-[22px] sm:rounded-[30px] 

  transition-all duration-500 
  flex flex-col h-full group

  bg-[linear-gradient(162deg,#2D2D2D_0.9%,#060606_99.1%)] 
  ${is_popular
        ? "border-[4.991px]   border-[#B57CFF]"
        : "  border-[4.991px]   border-white/20 "
      }`}
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
      <p className="text-white/40 text-sm mt-4 leading-relaxed">{subtitle}</p>
    </div>
    <CommonButton
      as="button"
      onClick={() => onGetStarted({ id, name, price, subtitle, features, is_popular, button_text })}
      className={`w-full !py-4 text-center block ${is_popular ? "bg-bg-custom " : "!bg-white/10 "
        }`}
    >
      {button_text}
    </CommonButton>
    <div className="mt-8 p-4 flex-grow rounded-2xl bg-[rgba(40,40,40,0.70)]">
      <p className="text-white text-sm sm:text-base md:text-lg  font-bold uppercase tracking-[2px] mb-4">
        What's Included
      </p>
      <ul className="space-y-4">
        {features?.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div
              className={`mt-0.5 p-0.5 rounded-full ${is_popular ? "bg-[#AC6CFF]/20 text-[#AC6CFF]" : "bg-white/10 text-white/80"}`}
            >
              <CheckIcon />
            </div>
            <span className="text-white/80 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Decorative glow for featured card */}
    {is_popular && (
      <div className="absolute -inset-1 bg-[#AC6CFF]/20 blur-[40px] -z-10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    )}
  </div>
);

// Skeleton card that mirrors the PricingCard layout
const PricingCardSkeleton = () => (
  <div className="relative md:p-8 p-6 rounded-[22px] sm:rounded-[30px] flex flex-col h-full bg-[linear-gradient(162deg,#2D2D2D_0.9%,#060606_99.1%)] border-[4.991px] border-white/10 animate-pulse">
    {/* Title */}
    <div className="mb-8">
      <div className="h-6 w-36 bg-white/10 rounded-lg mb-4" />
      {/* Price */}
      <div className="flex items-baseline gap-2">
        <div className="h-12 w-28 bg-white/10 rounded-lg" />
        <div className="h-4 w-14 bg-white/5 rounded" />
      </div>
      {/* Subtitle */}
      <div className="h-4 w-full bg-white/5 rounded mt-4" />
    </div>

    {/* Button */}
    <div className="h-14 w-full bg-white/10 rounded-full" />

    {/* Features box */}
    <div className="mt-8 p-4 flex-grow rounded-2xl bg-[rgba(40,40,40,0.70)]">
      <div className="h-5 w-40 bg-white/10 rounded mb-4" />
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-white/10 shrink-0" />
            <div
              className="h-4 bg-white/5 rounded"
              style={{ width: `${60 + i * 8}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PricingSection = ({
  pricingPlansData = dummyPricingPlans,
  isLoading = false,
}: {
  pricingPlansData?: any;
  isLoading?: boolean;
} = {}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<any>(null);

  // Find the full plan data (with services) by id
  const getFullPlan = (planId: any) =>
    (pricingPlansData || dummyPricingPlans).find(
      (p: any) => p.id === planId
    );

  const handleGetStarted = (plan: any) => {
    const fullPlan = getFullPlan(plan.id);
    const services: any[] = fullPlan?.services ?? [];

    if (services.length > 1) {
      // Multiple services → show modal
      setActivePlan(fullPlan);
      setModalOpen(true);
    } else {
      // 0 or 1 service → go straight to checkout
      const encryptedPlanId = encryptId(plan.id);
      const serviceId = services[0]?.id;
      navigate(
        `/checkout?type=subscription&plan=${encryptedPlanId}${serviceId ? `&service=${encryptId(serviceId)}` : ""}`
      );
    }
  };

  const handleServiceConfirm = (serviceId: number) => {
    setModalOpen(false);
    if (!activePlan) return;
    const encryptedPlanId = encryptId(activePlan.id);
    const encryptedServiceId = encryptId(serviceId);
    navigate(
      `/checkout?type=subscription&plan=${encryptedPlanId}&service=${encryptedServiceId}`
    );
  };

  return (
    <>
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

        <div className="grid grid-cols-1 md:grid-cols-2 xmd:grid-cols-3 gap-8 max-w-7xl mx-auto font-inter">
          {isLoading
            ? [1, 2, 3].map((i) => <PricingCardSkeleton key={i} />)
            : (pricingPlansData || dummyPricingPlans).map(
                (plan: any, index: number) => (
                  <PricingCard
                    key={index}
                    {...plan}
                    onGetStarted={handleGetStarted}
                  />
                )
              )}
        </div>
      </section>

      {/* Service Selection Modal */}
      <ServiceSelectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        services={activePlan?.services ?? []}
        plan={activePlan}
        onConfirm={handleServiceConfirm}
      />
    </>
  );
};

export default PricingSection;
