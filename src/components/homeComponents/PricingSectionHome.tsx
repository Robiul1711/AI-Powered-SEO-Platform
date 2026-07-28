import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TagLines from "../common/TagLines";
import Title from "../common/Title";
import GlowText from "../common/GlowText";
import CommonButton from "../common/CommonButton";
import ServiceSelectModal from "../common/ServiceSelectModal";
import { encryptId } from "@/lib/encryption";
import { Sparkles } from "lucide-react";

interface CheckIconProps {
  className?: string;
}

const CheckIcon = ({ className = "w-3.5 h-3.5" }: CheckIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const dummyPricingPlans = [
  {
    id: 1,
    name: "Starter SEO",
    price: "99",
    subtitle: "Perfect for small businesses just getting started with SEO",
    features: [
      "Keyword research and analysis",
      "On-page optimization",
      "Monthly performance reports",
      "Basic technical SEO audit",
      "Email support"
    ],
    is_popular: false,
    button_text: "Get Started"
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
      "Priority support"
    ],
    is_popular: true,
    button_text: "Choose Professional"
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
      "24/7 phone support"
    ],
    is_popular: false,
    button_text: "Contact Sales"
  }
];

const parseFeatures = (features: any): string[] => {
  if (!features) return [];
  if (Array.isArray(features)) return features;
  if (typeof features === "string") {
    try {
      const parsed = JSON.parse(features);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return features.split(",").map((f: string) => f.trim()).filter(Boolean);
    }
  }
  return [];
};

const PricingCard = ({
  id,
  name,
  price,
  subtitle,
  features,
  is_popular = false,
  button_text = "Get Started Now",
  onGetStarted
}: {
  id: string | number;
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  is_popular?: boolean;
  button_text?: string;
  onGetStarted: (plan: any) => void;
}) => {
  const featureList = parseFeatures(features);

  return (
    <div
      className={`relative p-5 sm:p-6 rounded-2xl transition-all duration-300 flex flex-col h-full group bg-gradient-to-b from-[#242424] via-[#1A1A1A] to-[#121212] ${
        is_popular
          ? "border-2 border-[#AC6CFF] shadow-[0_0_25px_rgba(172,108,255,0.2)] scale-[1.01] z-10"
          : "border border-white/10 hover:border-[#AC6CFF]/40 hover:bg-[#1D1D1D]"
      }`}
    >
      {is_popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white text-[10px] font-bold px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-md border border-purple-400/30 flex items-center gap-1">
            <Sparkles size={11} />
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-white text-base sm:text-lg font-orbitron font-bold uppercase tracking-[1.5px] mb-2 leading-snug">
          {name}
        </h3>
        <div className="flex items-baseline justify-between gap-1 pb-2 border-b border-white/10">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              ${price}
            </span>
            <span className="text-white/40 text-[11px] font-medium ml-0.5">
              {subtitle?.toLowerCase().includes("month") ? "/month" : "/one-time"}
            </span>
          </div>
          <span className="text-white/50 text-[10px] uppercase font-bold border border-white/10 px-2 py-0.5 rounded bg-white/5">
            {subtitle?.toLowerCase().includes("month") ? "Subscription" : "One-time"}
          </span>
        </div>
        <p className="text-white/50 text-xs mt-2 leading-relaxed min-h-[32px] line-clamp-2">
          {subtitle}
        </p>
      </div>

      {/* Button */}
      <CommonButton
        as="button"
        onClick={() =>
          onGetStarted({ id, name, price, subtitle, features: featureList, is_popular, button_text })
        }
        className={`w-full !py-3 text-center block text-xs font-bold uppercase tracking-wider rounded-xl ${
          is_popular ? "bg-bg-custom shadow-[0_0_15px_rgba(172,108,255,0.25)]" : "!bg-white/10 hover:!bg-[#AC6CFF] hover:!text-black"
        }`}
      >
        {button_text}
      </CommonButton>

      {/* Features list */}
      <div className="mt-4 p-3.5 flex-grow rounded-xl bg-white/[0.03] border border-white/5">
        <p className="text-white/80 text-[11px] font-bold uppercase tracking-[1.5px] mb-2.5 flex items-center gap-1.5">
          <Sparkles size={12} className="text-[#AC6CFF]" />
          What's Included ({featureList.length})
        </p>
        <ul className="space-y-2">
          {featureList.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs">
              <div
                className={`mt-0.5 p-0.5 rounded-full shrink-0 ${
                  is_popular ? "bg-[#AC6CFF]/20 text-[#AC6CFF]" : "bg-emerald-500/15 text-emerald-400"
                }`}
              >
                <CheckIcon />
              </div>
              <span className="text-white/75 leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {is_popular && (
        <div className="absolute -inset-1 bg-[#AC6CFF]/15 blur-[35px] -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </div>
  );
};

const PricingCardSkeleton = () => (
  <div className="relative p-5 sm:p-6 rounded-2xl flex flex-col h-full bg-[#1A1A1A] border border-white/10 animate-pulse">
    <div className="mb-4">
      <div className="h-5 w-32 bg-white/10 rounded-lg mb-2" />
      <div className="flex items-baseline gap-2">
        <div className="h-10 w-24 bg-white/10 rounded-lg" />
        <div className="h-4 w-12 bg-white/5 rounded" />
      </div>
      <div className="h-3 w-full bg-white/5 rounded mt-3" />
    </div>

    <div className="h-10 w-full bg-white/10 rounded-xl mb-4" />

    <div className="p-3.5 flex-grow rounded-xl bg-white/[0.03]">
      <div className="h-4 w-32 bg-white/10 rounded mb-3" />
      <div className="space-y-2.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-white/10 shrink-0" />
            <div className="h-3 bg-white/5 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PricingSectionHome = ({
  pricingPlansData = dummyPricingPlans,
  isLoading = false,
}: {
  pricingPlansData?: any;
  isLoading?: boolean;
} = {}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<any>(null);

  const getFullPlan = (planId: any) =>
    (pricingPlansData || dummyPricingPlans).find((p: any) => p.id === planId);

  const handleGetStarted = (plan: any) => {
    const fullPlan = getFullPlan(plan.id);
    const services: any[] = fullPlan?.services ?? [];

    if (services.length > 1) {
      setActivePlan(fullPlan);
      setModalOpen(true);
    } else {
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#AC6CFF]/10 blur-[120px] rounded-full -z-10" />

        <div className="flex flex-col items-center gap-3 font-inter max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <TagLines>Simple, Transparent Pricing</TagLines>
          <Title level="title48" className="text-white">
            Choose Your <GlowText>Growth Plan</GlowText>
          </Title>
          <p className="text-sm sm:text-base text-white/60 max-w-xl font-inter leading-relaxed">
            AI automation + human expertise. Pick the plan that matches your goals
            and scale your presence globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto font-inter">
          {isLoading
            ? [1, 2, 3].map((i) => <PricingCardSkeleton key={i} />)
            : (pricingPlansData || dummyPricingPlans)?.map(
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

export default PricingSectionHome;
