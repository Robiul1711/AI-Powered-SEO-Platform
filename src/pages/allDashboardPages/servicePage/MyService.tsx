import CommonButton from "@/components/common/CommonButton";
import { ArrowRight, Loader2 } from "lucide-react";
import useClient from "@/hooks/useClient";

const MyService = () => {
  const { data: response, isLoading } = useClient({
    queryKey: ["user-services"],
    url: "/user/services",
    isPrivate: true,
  }) as any;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#AC6CFF] animate-spin" />
        <p className="mt-4 text-gray-400 font-orbitron animate-pulse">Loading Your Services...</p>
      </div>
    );
  }

  const services = response?.data || [];

  return (
    <div className=" font-inter pb-10">
      <h1 className="text-3xl xs:text-4xl font-orbitron font-bold mb-2">
        My Services
      </h1>
      <p className="text-gray-400 mb-8 sm:mb-10 text-xs sm:text-sm">
        Manage And Track Your Active Marketing Services
      </p>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 xmd:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service: any, i: number) => (
            <div
              key={i}
              className="bg-cardBg border border-white/5 rounded-xl sm:rounded-xl p-6 sm:p-8 transition-all hover:border-[#AC6CFF]/30 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
                    {service.service_name || service.type || "Marketing Service"}
                  </span>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1">
                    Started: {service.created_at ? new Date(service.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : (service.date || "N/A")}
                  </p>
                </div>
                <span className="px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-purple-500/10 text-[#AC6CFF] border border-purple-500/20 text-[10px] sm:text-xs font-bold whitespace-nowrap">
                  {service.status || "Active"}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-orbitron font-bold my-6 sm:my-8 leading-tight">
                {service.description || "Comprehensive optimization and monthly reporting"}
              </h3>

              <CommonButton className="bg-bg-custom w-full flex items-center justify-center gap-2 !py-3 sm:!py-4">
                View Progress
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </CommonButton>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-cardBg border border-white/5 rounded-[2.5rem]">
          <p className="text-gray-400 font-orbitron">No active services found.</p>
        </div>
      )}
    </div>
  );
};

export default MyService;

