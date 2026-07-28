import React, { useState } from "react";
import CommonButton from "@/components/common/CommonButton";
import { 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Activity, 
  ArrowRight, 
  Loader2, 
  LayoutGrid, 
  List, 
  CheckCircle2, 
  Clock, 
  Sparkles 
} from "lucide-react";
import useClient from "@/hooks/useClient";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const getStatusBadge = (statusStr: string) => {
  const status = (statusStr || "active").toLowerCase();
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-inter">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Completed
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold font-inter">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        Pending
      </span>
    );
  }
  if (status === "ongoing" || status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#AC6CFF]/15 text-[#AC6CFF] border border-[#AC6CFF]/30 text-xs font-bold font-inter">
        <span className="w-1.5 h-1.5 rounded-full bg-[#AC6CFF] animate-pulse" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-bold font-inter">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
      {statusStr || "Inactive"}
    </span>
  );
};

const MyService = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const { data: response, isLoading } = useClient({
    queryKey: ["user-services"],
    url: "/user/services",
    isPrivate: true,
    options: { staleTime: 0 },
  }) as any;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-500 font-inter text-xs tracking-widest animate-pulse">
          Loading Your Services...
        </p>
      </div>
    );
  }

  const services = response?.data || [];

  return (
    <div className="font-inter pb-8">
      {/* MAIN CONTAINER */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-md shadow-2xl overflow-hidden">
        {/* CONTROL BAR WITH VIEW SWITCHER */}
        <div className="p-4 border-b border-white/10 bg-[#242424]/50 flex items-center justify-between gap-3">
          <div className="text-xs font-bold text-gray-300">
            Active Services & Subscriptions ({services.length})
          </div>

          {/* View Switcher Controls */}
          <div className="bg-[#1A1A1A] p-0.5 rounded-md border border-white/10 flex items-center h-9">
            <button
              onClick={() => setViewMode("table")}
              className={`h-8 px-2.5 rounded-md transition-all flex items-center justify-center ${
                viewMode === "table"
                  ? "bg-[#AC6CFF] text-black shadow-[0_0_10px_rgba(172,108,255,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
              title="Table View"
            >
              <List size={15} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`h-8 px-2.5 rounded-md transition-all flex items-center justify-center ${
                viewMode === "grid"
                  ? "bg-[#AC6CFF] text-black shadow-[0_0_10px_rgba(172,108,255,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>

        {/* TABLE OR GRID CONTENT */}
        {viewMode === "table" ? (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#242424]/80 border-b border-white/10 text-gray-400 font-inter text-[11px] font-bold tracking-wider uppercase">
                  <th className="py-4 px-5">Service / Plan</th>
                  <th className="py-4 px-5">Month / Period</th>
                  <th className="py-4 px-5">Pricing</th>
                  <th className="py-4 px-5">Progress</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-inter text-sm">
                {services.length > 0 ? (
                  services.map((service: any, i: number) => (
                    <tr
                      key={service.id || i}
                      className="hover:bg-[#242424]/40 transition-colors group"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-md bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#AC6CFF] group-hover:text-black transition-colors">
                            <Sparkles size={16} />
                          </div>
                          <div>
                            <h3 className="font-inter text-sm font-bold text-white group-hover:text-[#AC6CFF] transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-gray-300 font-medium text-xs">
                          <Calendar size={14} className="text-[#AC6CFF]" />
                          <span className="font-inter font-bold text-white">
                            {service.month || "Current Month"}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 block mt-0.5">
                          Started: {service.startDate || "N/A"}
                        </span>
                      </td>

                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className="font-inter font-bold text-white text-sm">
                          {service.price || "$0.00"}
                        </span>
                        <span className="text-[10px] text-gray-400 block font-medium">
                          {service.billing_cycle || "Monthly"}
                        </span>
                      </td>

                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="w-32">
                          <div className="flex justify-between items-center text-[10px] font-inter font-bold text-gray-300 mb-1">
                            <span>Completion</span>
                            <span className="text-[#AC6CFF]">{service.progress || 0}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#242424] rounded-full overflow-hidden border border-white/5">
                            <div
                              className="h-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, Math.max(5, service.progress || 0))}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-5 whitespace-nowrap">
                        {getStatusBadge(service.status)}
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <Link to={"/dashboard/reports"}>
                          <button className="px-3 py-1.5 rounded-md bg-[#242424] text-white border border-white/10 hover:bg-[#AC6CFF] hover:text-black hover:border-[#AC6CFF] transition-all text-xs font-inter font-bold inline-flex items-center gap-1.5">
                            <span>Reports</span>
                            <ArrowRight size={12} />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* STYLED INLINE TABLE EMPTY STATE */
                  <tr>
                    <td colSpan={6} className="py-14 px-4 text-center">
                      <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                        <div className="w-14 h-14 rounded-2xl bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center mb-3">
                          <Briefcase size={26} />
                        </div>
                        <h3 className="text-base font-bold text-white mb-1">No Active Services Found</h3>
                        <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                          You haven't subscribed to any active marketing plans or services yet. Browse our packages to get started.
                        </p>
                        <Link to={"/services"}>
                          <CommonButton className="bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white font-inter font-bold text-xs py-2 px-5 hover:opacity-90 transition-all shadow-[0_0_12px_rgba(172,108,255,0.3)]">
                            Browse Available Services
                          </CommonButton>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="p-5">
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service: any, i: number) => (
                  <div
                    key={service.id || i}
                    className="bg-[#1A1A1A] border border-white/10 rounded-md p-5 hover:border-[#AC6CFF]/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 text-[10px] font-inter font-bold">
                          <Calendar size={12} />
                          {service.month || "Current Month"}
                        </span>
                        {getStatusBadge(service.status)}
                      </div>

                      <h3 className="text-base font-inter font-bold mb-2 leading-snug text-white group-hover:text-[#AC6CFF] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="bg-[#242424]/60 border border-white/5 p-3 rounded-md mb-4 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400 font-inter">Price & Period:</span>
                          <span className="font-inter font-bold text-white">{service.price} ({service.billing_cycle})</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400 font-inter">Started Date:</span>
                          <span className="text-gray-300 font-medium">{service.startDate}</span>
                        </div>
                        <div className="pt-1">
                          <div className="flex justify-between items-center text-[10px] font-inter font-bold text-gray-300 mb-1">
                            <span>Service Progress</span>
                            <span className="text-[#AC6CFF]">{service.progress || 0}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] rounded-full"
                              style={{ width: `${Math.min(100, Math.max(5, service.progress || 0))}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link to={"/dashboard/reports"} className="block mt-auto">
                      <CommonButton className="bg-[#242424] w-full flex items-center justify-center gap-2 py-2.5! hover:bg-[#AC6CFF] hover:text-black group/btn border border-white/10 transition-all">
                        <span className="font-inter text-xs font-bold tracking-wide">View Campaign Progress</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </CommonButton>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-14 px-4 text-center">
                <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center mb-3">
                    <Briefcase size={26} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">No Active Services Found</h3>
                  <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                    You haven't subscribed to any active marketing plans or services yet.
                  </p>
                  <Link to={"/services"}>
                    <CommonButton className="bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white font-inter font-bold text-xs py-2 px-5 hover:opacity-90 transition-all shadow-[0_0_12px_rgba(172,108,255,0.3)]">
                      Browse Available Services
                    </CommonButton>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyService;

