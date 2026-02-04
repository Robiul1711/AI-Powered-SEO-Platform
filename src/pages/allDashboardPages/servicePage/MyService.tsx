import CommonButton from "@/components/common/CommonButton";
import { ArrowRight } from "lucide-react";

const MyService = () => {
  const services = [
    { type: "SEO Monthly", status: "Active", date: "January 15, 2026" },
    { type: "Local SEO", status: "Active", date: "January 15, 2026" },
    { type: "PPC Management", status: "Ongoing", date: "January 15, 2026" },
    { type: "Content Writing", status: "Active", date: "January 15, 2026" },
  ];

  return (
    <div className=" font-inter pb-10">
      <h1 className="text-3xl xs:text-4xl font-orbitron font-bold mb-2">
        My Services
      </h1>
      <p className="text-gray-400 mb-8 sm:mb-10 text-xs sm:text-sm">
        Manage And Track Your Active Marketing Services
      </p>

      <div className="grid grid-cols-1 xmd:grid-cols-2 gap-6 sm:gap-8">
        {services.map((service, i) => (
          <div
            key={i}
            className="bg-cardBg border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 transition-all hover:border-[#AC6CFF]/30 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
                  {service.type}
                </span>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">
                  Started: {service.date}
                </p>
              </div>
              <span className="px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-purple-500/10 text-[#AC6CFF] border border-purple-500/20 text-[10px] sm:text-xs font-bold whitespace-nowrap">
                {service.status}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-orbitron font-bold my-6 sm:my-8 leading-tight">
              Comprehensive SEO optimization and monthly reporting
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
    </div>
  );
};

export default MyService;
