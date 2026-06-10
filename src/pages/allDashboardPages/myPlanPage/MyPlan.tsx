import React from "react";
import useClient from "@/hooks/useClient";
import { Loader2, Zap, CalendarDays, CheckCircle2, Crown, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const MyPlan = () => {
  const { data: response, isLoading } = useClient({
    queryKey: ["my-active-plan"],
    url: "/user/services",
    isPrivate: true,
  }) as any;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-500 font-orbitron text-xs tracking-widest uppercase animate-pulse">Loading Your Plan...</p>
      </div>
    );
  }

  const activeService = response?.data?.[0];

  if (!activeService) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center bg-[#151515] border border-white/5 rounded-3xl shadow-2xl">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-yellow-500 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-orbitron font-bold text-white mb-4">No Active Plan Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          You currently don't have any active subscriptions or service plans. Upgrade to unlock premium features and analytics.
        </p>
        <Link to="/pricing" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] hover:opacity-90 text-white px-8 py-3.5 rounded-xl font-bold font-orbitron transition-all">
          <Crown size={18} />
          Explore Premium Plans
        </Link>
      </div>
    );
  }

  // Calculate Expiry Data (Demo 30 days from creation)
  const startDate = new Date(activeService.created_at || new Date());
  const expiryDate = new Date(startDate);
  expiryDate.setDate(expiryDate.getDate() + 30);
  
  const today = new Date();
  const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
  const planFeatures = [
    "Full Section-by-Section SEO Analysis",
    "Detailed Performance & Speed Metrics",
    "Monthly Progress Roadmaps",
    "Premium Support & Recommendations",
    "Downloadable PDF Reports"
  ];

  return (
    <div className="font-inter pb-12 max-w-8xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-xl md:text-2xl font-orbitron font-bold text-white mb-1">My Active Plan</h1>
          <p className="text-gray-400 text-xs">Manage your current subscription and billing cycle</p>
        </div>
      </div>

      {/* Compact Plan Card */}
      <div className="bg-[#121212] border border-white/5 rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left/Top: Plan Details */}
        <div className="flex-1 p-5 md:p-6 bg-[#1A1A1A]/50 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#AC6CFF]/10 rounded-full blur-[60px]" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#AC6CFF]/20 to-[#6C9AFF]/10 flex items-center justify-center border border-[#AC6CFF]/30 shrink-0">
                  <Crown size={20} className="text-[#AC6CFF] md:w-6 md:h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h2 className="text-base md:text-lg font-orbitron font-bold text-white leading-none">
                      {activeService.title || activeService.plan_name || "Premium Plan"}
                    </h2>
                    <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-bold uppercase tracking-widest leading-none">
                      {activeService.status || "Active"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[10px] md:text-[11px] mt-1">{activeService.description || "Premium optimization suite"}</p>
                </div>
              </div>
              <div className="text-left sm:text-right mt-2 sm:mt-0 ml-14 sm:ml-0">
                <p className="text-lg md:text-xl font-bold text-white leading-none mb-1">${activeService.amount || "99"}</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest">One-time payment</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-[#151515] p-3 rounded-lg border border-white/5 flex items-center gap-3">
                <CalendarDays className="text-[#AC6CFF] w-4 h-4 md:w-5 md:h-5 shrink-0" />
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Billing Cycle</p>
                  <p className="text-white font-medium text-[10px] md:text-[11px]">Starts: {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  <p className="text-white font-medium text-[10px] md:text-[11px]">Expires: {expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="bg-[#151515] p-3 rounded-lg border border-white/5 flex items-center gap-3">
                <Zap className="text-yellow-500 w-4 h-4 md:w-5 md:h-5 shrink-0" />
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Status</p>
                  <p className="font-medium text-[10px] md:text-[11px]">
                    {daysLeft > 0 ? (
                      <span className="text-green-400">{daysLeft} Days Remaining</span>
                    ) : (
                      <span className="text-red-400">Expired</span>
                    )}
                  </p>
                  <p className="text-[11px] text-gray-400">Payment: <span className="text-green-400 uppercase font-semibold text-[10px]">{activeService.payment_status || "Paid"}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right/Bottom: Features & Actions */}
        <div className="w-full lg:w-[350px] p-5 md:p-6 bg-[#121212] flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-orbitron font-bold text-white uppercase tracking-widest mb-4">Plan Features</h3>
            <div className="space-y-2 mb-6">
              {planFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#AC6CFF] shrink-0" />
                  <span className="text-gray-400 text-[11px] truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-[#1A1A1A] hover:bg-white/10 text-white py-2 rounded-lg border border-white/10 transition-colors text-[11px] font-bold uppercase tracking-wider">
              Update Payment
            </button>
            <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-lg border border-red-500/20 transition-colors text-[11px] font-bold uppercase tracking-wider">
              Cancel
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MyPlan;
