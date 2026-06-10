import CommonButton from "@/components/common/CommonButton";
import { ArrowRight, Loader2 } from "lucide-react";
import useClient from "@/hooks/useClient";
import { Link } from "react-router-dom";

const MyService = () => {
  const { data: response, isLoading } = useClient({
    queryKey: ["user-services"],
    url: "/user/services",
    isPrivate: true,
  }) as any;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-500 font-orbitron text-xs tracking-widest uppercase animate-pulse">Loading Your Services...</p>
      </div>
    );
  }

  const services = response?.data || [];

  return (
    <div className="font-inter pb-8">
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service: any, i: number) => (
            <div
              key={i}
              className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 hover:border-[#AC6CFF]/30 transition-all duration-300 shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest font-bold font-orbitron">
                      {service.title || service.service_name || service.type || "Marketing Service"}
                    </span>
                    <p className="text-gray-500 text-[10px] mt-1 font-inter font-medium">
                      Started: {service.created_at || service.startDate ? new Date(service.created_at || service.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-[#AC6CFF] border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider shrink-0 ml-2">
                    {service.status || "Active"}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-orbitron font-bold mb-6 leading-snug text-white group-hover:text-[#AC6CFF] transition-colors line-clamp-2">
                  {service.description || service.name || "Comprehensive optimization and monthly reporting"}
                </h3>
              </div>
              <Link
                to={"/dashboard/reports"}
                className="block mt-auto"
              >
                <CommonButton className="bg-[#242424] w-full flex items-center justify-center gap-2 py-2.5! hover:bg-[#AC6CFF] hover:text-black group/btn border border-white/5 transition-all">
                  <span className="font-orbitron text-xs font-bold tracking-wide transition-colors">View Progress</span>
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </CommonButton>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#1A1A1A] border border-white/5 rounded-2xl shadow-lg">
          <p className="text-gray-500 font-orbitron text-sm uppercase tracking-widest">No active services found</p>
        </div>
      )}
    </div>
  );
};

export default MyService;

