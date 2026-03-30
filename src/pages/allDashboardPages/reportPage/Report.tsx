import React from "react";
import { Eye, Download } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";

import useClient from "@/hooks/useClient";
import { Loader2 } from "lucide-react";

const Report = () => {
  const { data: response, isLoading } = useClient({
    queryKey: ["user-reports"],
    url: "/user/reports",
    isPrivate: true,
  }) as any;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#AC6CFF] animate-spin" />
        <p className="mt-4 text-gray-400 font-orbitron animate-pulse">Loading Your Reports...</p>
      </div>
    );
  }

  const reports = response?.data || [];

  return (
    <div className="font-inter pb-10">
      {/* Reports Container */}

      {/* Reports Container */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8">
        <h2 className="text-lg sm:text-xl font-orbitron font-bold mb-6 sm:mb-8">
          Monthly Reports
        </h2>

        <div className="space-y-4">
          {reports.length > 0 ? (
            reports.map((report: any, i: number) => (
              <div
                key={i}
                className="bg-[#242424] p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col xmd:flex-row xmd:items-center justify-between gap-6 group hover:bg-[#2a2a2a] transition-all border border-transparent hover:border-white/5"
              >
                {/* Report Info */}
                <div className="flex flex-col">
                  <h4 className="text-base sm:text-lg font-bold tracking-wide font-inter">
                    {report.title || "Monthly Report"}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-gray-500 text-[10px] sm:text-xs">
                    <span className="font-inter">
                      {report.type || "SEO Analysis"}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="font-inter">
                      {report.created_at
                        ? new Date(report.created_at).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "numeric", year: "numeric" }
                          )
                        : report.date || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg font-inter bg-purple-500/10 text-[#AC6CFF] border border-purple-500/20 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                    {report.status || "Available"}
                  </span>

                  <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <a
                      href={report.view_link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none"
                    >
                      <button className="w-full flex items-center justify-center gap-2 bg-[#333333] hover:bg-[#444444] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-colors text-xs sm:text-sm font-medium">
                        <Eye size={16} className="sm:size-[18px]" />
                        View
                      </button>
                    </a>

                    <a
                      href={report.download_link || "#"}
                      download
                      className="flex-1 sm:flex-none"
                    >
                      <CommonButton className="w-full flex items-center justify-center gap-2 bg-bg-custom py-2! sm:py-3! px-4! sm:px-6!">
                        <Download size={16} className="sm:size-[18px]" />
                        Download
                      </CommonButton>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-[#242424] rounded-3xl border border-white/5">
              <p className="text-gray-400 font-orbitron">No reports found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
