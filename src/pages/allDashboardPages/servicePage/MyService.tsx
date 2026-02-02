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
    <div className="">
      <h1 className="text-3xl font-orbitron font-bold mb-2">My Services</h1>
      <p className="text-gray-400 mb-10 text-sm font-inter">Manage And Track Your Active Marketing Services</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, i) => (
          <div key={i} className="bg-cardBg border border-white/5 rounded-[2.5rem] p-8 transition-all hover:border-accentPurple/30">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-gray-500 text-xs uppercase tracking-widest">{service.type}</span>
                <p className="text-gray-300 text-sm mt-1 font-inter">Started: {service.date}</p>
              </div>
              <span className="px-4 py-1 font-inter rounded-full bg-purple-500/10 text-accentPurple border border-purple-500/20 text-xs font-bold">
                {service.status}
              </span>
            </div>

            <h3 className="text-xl font-orbitron font-bold my-8 leading-tight">
              Comprehensive SEO optimization and monthly reporting
            </h3>

            <CommonButton className="bg-bg-custom w-full flex items-center justify-center gap-2">
              View Progress
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </CommonButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyService;