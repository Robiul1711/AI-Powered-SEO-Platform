import React, { useState } from "react";
import useClient from "@/hooks/useClient";
import { 
  Loader2, 
  CalendarDays, 
  CheckCircle2, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  CreditCard,
  Download,
  Award,
  Layers,
  PackageCheck,
  Rocket,
  ShoppingBag,
  Activity
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { encryptId } from "@/lib/encryption";
import ServiceSelectModal from "@/components/common/ServiceSelectModal";

const PLAN_TIERS = [
  {
    id: 1,
    name: "Starter SEO Package",
    price: "$199",
    period: "One-time Payment",
    description: "Ideal for small websites looking to kickstart organic growth.",
    badge: "Popular",
    features: [
      "Targeted Keyword Optimization (Up to 10)",
      "Monthly On-Page Technical Fixes",
      "High DA Link Outreach (5 Backlinks)",
      "Weekly Rank & Analytics Reports",
      "Standard Client Support"
    ],
    highlight: false,
    buttonText: "Order Starter Package"
  },
  {
    id: 2,
    name: "Pro Growth Package",
    price: "$499",
    period: "One-time Payment",
    description: "For scaling businesses wanting dominant search rankings.",
    badge: "Most Popular",
    features: [
      "Full Section SEO & Keyword Strategy (30 Keywords)",
      "Core Web Vitals & Speed Optimization",
      "Premium High DA Backlinks (15 Backlinks)",
      "Guest Posting & Content Outreach",
      "Dedicated Account Manager & Strategy Calls",
      "Real-time Dashboard Analytics"
    ],
    highlight: true,
    buttonText: "Order Pro Growth Package"
  },
  {
    id: 3,
    name: "Enterprise Authority Suite",
    price: "$999",
    period: "One-time Payment",
    description: "Maximum aggressive growth suite for competitive industries.",
    badge: "Maximum Power",
    features: [
      "Unlimited Keyword & Rank Tracking",
      "Complete Site Architecture Overhaul",
      "Editorial Guest Posts on Top Media (DA 70+)",
      "Custom PR & Viral Campaign Strategy",
      "24/7 Priority Support & Weekly Calls",
      "White-Label Executive Reports"
    ],
    highlight: false,
    buttonText: "Order Enterprise Package"
  }
];

const DEFAULT_SERVICES = [
  { id: 1, title: "Full On-Page & Technical SEO Strategy" },
  { id: 2, title: "High DA Backlink Outreach & Indexing" },
  { id: 3, title: "Editorial Guest Posting & Content Blast" },
  { id: 4, title: "Core Web Vitals & Speed Optimization" }
];

// Safe feature parser for API response
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

const MyPlan = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<any>(null);

  const { data: response, isLoading: isActivePlanLoading } = useClient({
    queryKey: ["my-active-plan"],
    url: "/user/services",
    isPrivate: true,
  }) as any;

  const { data: pricingPlansResponse, isLoading: isPricingLoading } = useClient({
    queryKey: ["pricing-plans"],
    url: "/pricing-plans",
  }) as any;

  const rawApiPlans = pricingPlansResponse?.data || [];

  // Dynamic Service Packages Array
  const dynamicPlans = (rawApiPlans && rawApiPlans.length > 0)
    ? rawApiPlans.map((plan: any) => {
        const parsedFeats = parseFeatures(plan.features);
        const isPopular = Boolean(plan.is_popular);
        const formattedPrice = 
          typeof plan.price === "number" || (typeof plan.price === "string" && !plan.price.startsWith("$"))
            ? `$${plan.price}`
            : plan.price;

        return {
          id: plan.id,
          name: plan.name,
          price: formattedPrice,
          period: "One-time Payment",
          description: plan.subtitle || plan.description || "Full SEO optimization package with keyword strategy and rank tracking.",
          badge: isPopular ? "Most Popular" : plan.badge || null,
          highlight: isPopular,
          features: parsedFeats.length > 0 ? parsedFeats : [
            "Targeted Keyword Optimization",
            "Technical Audit & On-Page Fixes",
            "High DA Backlink Building",
            "Analytics & Rank Reports"
          ],
          buttonText: plan.button_text && !plan.button_text.toLowerCase().includes("subscribe")
            ? plan.button_text 
            : `Order ${plan.name}`,
          services: (plan.services && plan.services.length > 0) ? plan.services : DEFAULT_SERVICES,
        };
      })
    : PLAN_TIERS;

  const handleSubscribeClick = (plan: any) => {
    const planToUse = {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      services: (plan.services && plan.services.length > 0)
        ? plan.services
        : DEFAULT_SERVICES
    };

    setSelectedPlanForModal(planToUse);
    setModalOpen(true);
  };

  const handleServiceConfirm = (serviceId: number) => {
    setModalOpen(false);
    if (!selectedPlanForModal) return;
    const encryptedPlanId = encryptId(selectedPlanForModal.id);
    const encryptedServiceId = encryptId(serviceId);
    navigate(
      `/simple-checkout?type=one-time&plan=${encryptedPlanId}&service=${encryptedServiceId}`
    );
  };

  if (isActivePlanLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] w-full">
        <Loader2 className="w-7 h-7 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-500 font-inter text-[11px] tracking-widest uppercase animate-pulse">
          Loading Purchased Services & Package Options...
        </p>
      </div>
    );
  }

  // Active one-time purchased services returned by /user/services
  const activeServices: any[] = Array.isArray(response?.data) ? response.data : [];

  return (
    <div className="font-inter pb-8 w-full space-y-8">
      {/* SECTION 1: MY ACTIVE PURCHASED SERVICES & ONE-TIME ORDERS */}
      {activeServices.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 w-full"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                <PackageCheck size={13} />
                <span>My Active Orders ({activeServices.length})</span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                My Purchased Services & Packages
              </h2>
              <p className="text-gray-400 text-xs">
                Overview and progress tracking of all your one-time purchased services and package orders.
              </p>
            </div>

            <Link to="/dashboard/payment-history">
              <button className="py-2 px-3 rounded-lg bg-[#242424] text-white border border-white/10 hover:border-[#AC6CFF]/40 text-xs font-bold flex items-center gap-1.5 transition-all">
                <Download size={13} />
                <span>View Payment Receipts</span>
              </button>
            </Link>
          </div>

          {/* GRID OF ALL ACTIVE PURCHASED SERVICES */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {activeServices.map((service: any, index: number) => {
              const progressVal = typeof service.progress === "number" ? service.progress : 0;
              const billingType = service.billing_cycle || "One-Time Payment";

              return (
                <div 
                  key={service.id || index}
                  className="bg-[#1A1A1A] border border-[#AC6CFF]/30 rounded-xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-4 hover:border-[#AC6CFF]/60 transition-all w-full"
                >
                  {/* Ambient Background Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#AC6CFF]/5 rounded-full blur-[80px] pointer-events-none" />

                  <div className="relative z-10 space-y-3">
                    {/* Header: Title & Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#AC6CFF]/20 to-purple-600/20 text-[#AC6CFF] border border-[#AC6CFF]/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(172,108,255,0.2)]">
                          <Crown size={20} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white leading-tight">
                            {service.title}
                          </h3>
                          <p className="text-gray-400 text-[11px] mt-0.5 leading-snug line-clamp-2">
                            {service.description || "Active optimization & strategy service package."}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        {service.status || "Active"}
                      </span>
                    </div>

                    {/* Information Badges */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                      <div className="bg-[#242424]/60 p-2.5 rounded-lg border border-white/5">
                        <span className="text-[10px] text-gray-400 block font-medium">Payment Type</span>
                        <span className="text-sm font-bold text-white">{service.price}</span>
                        <span className="text-[9px] text-[#AC6CFF] block font-bold mt-0.5">{billingType}</span>
                      </div>

                      <div className="bg-[#242424]/60 p-2.5 rounded-lg border border-white/5">
                        <span className="text-[10px] text-gray-400 block font-medium">Order Date</span>
                        <span className="text-xs font-bold text-white mt-0.5 block">{service.startDate || "Recent"}</span>
                        <span className="text-[9px] text-gray-400 block font-medium">{service.month}</span>
                      </div>
                    </div>

                    {/* Task Execution Progress Bar */}
                    <div className="bg-[#242424]/40 p-2.5 rounded-lg border border-white/5 space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-gray-400 uppercase tracking-wider">Service Task Progress</span>
                        <span className="text-[#AC6CFF]">{progressVal}% Completed</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#141414] rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-[#AC6CFF] to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(5, progressVal)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Plan Action Footer - Directly Links to Progress & Tasks */}
                  <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck size={12} /> One-Time Verified
                    </span>

                    <Link to="/dashboard/progress-and-tasks">
                      <button className="py-1.5 px-3 rounded-lg bg-[#242424] hover:bg-[#AC6CFF] hover:text-black text-white border border-white/10 hover:border-[#AC6CFF]/40 text-xs font-bold flex items-center gap-1.5 transition-all">
                        <Activity size={13} className="text-[#AC6CFF]" />
                        <span>View Progress & Tasks</span>
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        /* NO ACTIVE PURCHASED SERVICES BANNER */
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#242424] via-[#1A1A1A] to-[#141414] border border-white/10 p-6 text-center w-full shadow-xl"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#AC6CFF]/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#AC6CFF]/20 to-purple-600/20 text-[#AC6CFF] border border-[#AC6CFF]/30 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(172,108,255,0.2)]">
              <ShoppingBag size={24} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mb-1">
              No Active Purchased Services Found
            </h2>
            <p className="text-gray-400 text-xs max-w-lg mx-auto leading-relaxed">
              Explore available growth packages below to order custom services, automated backlinks, technical audits, and dedicated SEO management.
            </p>
          </div>
        </motion.div>
      )}

      {/* SECTION 2: AVAILABLE SERVICE PACKAGES & PRICING */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="space-y-4 w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Rocket size={13} />
              <span>Service Packages Catalog</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              Available Service Packages
            </h3>
            <p className="text-gray-400 text-xs">
              Select or add a new one-time package tailored for your organic growth goals.
            </p>
          </div>

          <div className="text-[11px] text-gray-400 flex items-center gap-1.5 shrink-0">
            <ShieldCheck size={15} className="text-[#AC6CFF]" />
            <span>One-time payments • Instant activation</span>
          </div>
        </div>

        {/* COMPACT PLAN CARDS GRID */}
        {isPricingLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 h-80 animate-pulse flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-5 w-2/3 bg-white/10 rounded" />
                  <div className="h-8 w-1/3 bg-white/10 rounded" />
                  <div className="h-3 w-full bg-white/5 rounded" />
                  <div className="space-y-1.5 pt-2">
                    <div className="h-2.5 w-full bg-white/5 rounded" />
                    <div className="h-2.5 w-4/5 bg-white/5 rounded" />
                  </div>
                </div>
                <div className="h-9 w-full bg-white/10 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {dynamicPlans.map((tier: any) => (
              <div
                key={tier.id}
                className={`rounded-xl p-4 md:p-5 flex flex-col justify-between transition-all duration-300 relative w-full ${
                  tier.highlight 
                    ? "bg-gradient-to-b from-[#222222] via-[#1A1A1A] to-[#141414] border-2 border-[#AC6CFF] shadow-[0_0_20px_rgba(172,108,255,0.15)] z-10" 
                    : "bg-[#1A1A1A] border border-white/10 hover:border-[#AC6CFF]/30 hover:bg-[#1D1D1D]"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md border border-purple-400/30 flex items-center gap-1">
                    <Sparkles size={10} />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Subtitle */}
                  <div className="mb-3">
                    <h4 className="text-base font-bold text-white mb-1 leading-snug">{tier.name}</h4>
                    <p className="text-gray-400 text-xs leading-tight line-clamp-2 min-h-[32px]">{tier.description}</p>
                  </div>

                  {/* Price Tag */}
                  <div className="mb-3.5 pb-3 border-b border-white/10 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">{tier.price}</span>
                      <span className="text-[10px] text-gray-400 font-medium">/one-time</span>
                    </div>
                    <span className="text-[9px] font-bold text-[#AC6CFF] border border-[#AC6CFF]/20 px-2 py-0.5 rounded bg-[#AC6CFF]/10 uppercase tracking-wider">
                      One-time Payment
                    </span>
                  </div>

                  {/* Compact Features List */}
                  <div className="space-y-2 mb-4 p-3 rounded-lg bg-[#242424]/50 border border-white/5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Sparkles size={11} className="text-[#AC6CFF]" />
                      Included Deliverables ({tier.features.length})
                    </p>
                    <div className="space-y-1.5">
                      {tier.features.map((feat: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-300 leading-tight">
                          <div className={`mt-0.5 p-0.5 rounded-full shrink-0 ${tier.highlight ? "bg-[#AC6CFF]/20 text-[#AC6CFF]" : "bg-emerald-500/15 text-emerald-400"}`}>
                            <CheckCircle2 size={11} />
                          </div>
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handleSubscribeClick(tier)}
                  className={`w-full py-2.5 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    tier.highlight
                      ? "bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white hover:opacity-90 shadow-[0_0_15px_rgba(172,108,255,0.25)]"
                      : "bg-[#242424] text-white border border-white/10 hover:bg-[#AC6CFF] hover:text-black hover:border-[#AC6CFF]"
                  }`}
                >
                  <span>{tier.buttonText}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* SELECT A SERVICE MODAL */}
      <ServiceSelectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        services={selectedPlanForModal?.services || DEFAULT_SERVICES}
        plan={selectedPlanForModal}
        onConfirm={handleServiceConfirm}
      />
    </div>
  );
};

export default MyPlan;
