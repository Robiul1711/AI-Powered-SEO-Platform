import React from "react";
import { Eye, Download } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";

const Report = () => {
  const reports = [
    {
      title: "March 2026 SEO Report",
      type: "SEO Monthly",
      date: "April 1, 2026",
      status: "Available",
    },
    {
      title: "March 2026 PPC Performance",
      type: "PPC Management",
      date: "April 1, 2026",
      status: "Available",
    },
    {
      title: "February 2026 SEO Report",
      type: "Content Writing",
      date: "March 1, 2026",
      status: "Available",
    },
    {
      title: "February 2026 Content Performance",
      type: "PPC Management",
      date: "March 1, 2026",
      status: "Available",
    },
    {
      title: "January 2026 SEO Report",
      type: "SEO Monthly",
      date: "April 1, 2026",
      status: "Available",
    },
  ];

  return (
    <div className="font-inter pb-10">
      {/* Header Section */}
      <header className="mb-8 sm:mb-10">
        <h1 className="text-3xl xs:text-4xl font-orbitron font-bold tracking-tight">
          Reports
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Access Your Monthly Performance Reports
        </p>
      </header>

      {/* Reports Container */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8">
        <h2 className="text-lg sm:text-xl font-orbitron font-bold mb-6 sm:mb-8">
          Monthly Reports
        </h2>

        <div className="space-y-4">
          {reports.map((report, i) => (
            <div
              key={i}
              className="bg-[#242424] p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col xmd:flex-row xmd:items-center justify-between gap-6 group hover:bg-[#2a2a2a] transition-all border border-transparent hover:border-white/5"
            >
              {/* Report Info */}
              <div className="flex flex-col">
                <h4 className="text-base sm:text-lg font-bold tracking-wide font-inter">
                  {report.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-gray-500 text-[10px] sm:text-xs">
                  <span className="font-inter">{report.type}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="font-inter">{report.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg font-inter bg-purple-500/10 text-[#AC6CFF] border border-purple-500/20 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  {report.status}
                </span>

                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#333333] hover:bg-[#444444] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-colors text-xs sm:text-sm font-medium">
                    <Eye size={16} className="sm:size-[18px]" />
                    View
                  </button>

                  <CommonButton className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-bg-custom !py-2 sm:!py-3 !px-4 sm:!px-6">
                    <Download size={16} className="sm:size-[18px]" />
                    Download
                  </CommonButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
