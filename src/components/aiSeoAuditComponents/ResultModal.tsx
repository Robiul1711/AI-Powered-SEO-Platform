import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  AlertCircle,
  Info,
  Download,
  Zap,
  CheckCircle,
  AlertTriangle,
  Loader2,
  BarChart3,
  Globe,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";
import * as htmlToImage from 'html-to-image';
import jsPDF from "jspdf";
import toast from "react-hot-toast";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    website_url?: string;
    url?: string;
    overall_score?: number;
    score?: number;
    performance_score?: number;
    performance?: number;
    technical_seo_score?: number;
    technical_seo?: number;
    content_score?: number;
    content?: number;
    summary?: string;
    description?: string;
    recommendations?: { type?: string; message: string }[];
    section_analysis?: {
      section: string;
      status: string;
      analysis: string;
    }[];
    pagespeed?: {
      scores?: {
        performance: number;
        accessibility: number;
        best_practices: number;
        seo: number;
      };
      metrics?: {
        first_contentful_paint: string;
        largest_contentful_paint: string;
        total_blocking_time: string;
        cumulative_layout_shift: string;
        speed_index: string;
      };
    };
    screenshots?: string[];
    is_subscribed?: boolean;
    has_active_service?: boolean;
    download_pdf?: string;
  };
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-rose-400";
};

const getScoreBarColor = (score: number) => {
  if (score >= 80) return "from-emerald-500 to-teal-400";
  if (score >= 50) return "from-amber-500 to-orange-400";
  return "from-rose-500 to-red-400";
};

const getStatusStyle = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "good" || s === "passed" || s === "ready")
    return {
      bg: "bg-emerald-500/5 border-emerald-500/10 hover:bg-emerald-500/10",
      iconBg: "bg-emerald-500/20",
      Icon: CheckCircle,
      iconColor: "text-emerald-400",
    };
  if (s === "needs update" || s === "warning")
    return {
      bg: "bg-amber-500/5 border-amber-500/10 hover:bg-amber-500/10",
      iconBg: "bg-amber-500/20",
      Icon: AlertTriangle,
      iconColor: "text-amber-400",
    };
  return {
    bg: "bg-blue-500/5 border-blue-500/10 hover:bg-blue-500/10",
    iconBg: "bg-blue-500/20",
    Icon: Info,
    iconColor: "text-blue-400",
  };
};

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, data }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!data) return null;

  const websiteUrl = data.website_url || data.url || "Website Audit Analysis";
  const overallScore = data.overall_score ?? data.score ?? 85;
  const summaryText = data.summary || data.description || "Comprehensive SEO audit report analyzing technical structure, content optimization, and performance speed metrics.";
  const hasActiveService = Boolean(data.is_subscribed || data.has_active_service);

  const handleDownloadPdf = async (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("pdf-content-wrapper");
    if (!element) return;

    setIsDownloading(true);
    try {
      const actionButtons = document.getElementById("pdf-action-buttons");
      if (actionButtons) actionButtons.style.display = "none";

      const imgData = await htmlToImage.toJpeg(element, {
        quality: 0.95,
        backgroundColor: "#111111",
        pixelRatio: 1.5,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });

      if (actionButtons) actionButtons.style.display = "flex";

      const width = element.offsetWidth;
      const height = element.offsetHeight;

      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "px",
        format: [width, height]
      });

      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      const filename = `SEO_Audit_${websiteUrl.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      pdf.save(filename);
      toast.success("Report downloaded successfully!");
    } catch (error: any) {
      console.error("Error generating PDF", error);
      if (document.getElementById("pdf-action-buttons")) {
        document.getElementById("pdf-action-buttons")!.style.display = "flex";
      }
      toast.error(`Failed to generate PDF: ${error.message || "Unknown error"}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Balanced Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto no-scrollbar rounded-2xl bg-[#111111] border border-white/10 shadow-2xl z-10 font-inter"
          >
            {/* Header Bar */}
            <div className="sticky top-0 bg-[#161616]/95 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between z-20">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#AC6CFF]/15 text-[#AC6CFF] border border-[#AC6CFF]/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(172,108,255,0.2)]">
                  <BarChart3 size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white font-orbitron tracking-wide truncate">
                    SEO Audit Results
                  </h3>
                  <p className="text-xs text-gray-400 truncate flex items-center gap-1.5 mt-0.5">
                    <Globe size={12} className="text-[#AC6CFF] shrink-0" />
                    <span className="truncate">{websiteUrl}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Wrapper */}
            <div id="pdf-content-wrapper" className="p-6 md:p-8 space-y-6 text-sm">
              {/* Top Score Summary Row */}
              <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden shadow-lg">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase font-bold text-[#AC6CFF] tracking-wider">
                    <CheckCircle size={14} /> Analysis Complete
                  </span>
                  <h4 className="text-base md:text-lg font-bold text-white leading-snug">Overall Health Score</h4>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                    {summaryText}
                  </p>
                </div>

                {/* Score Dial */}
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0 self-center sm:self-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="33"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      className="text-white/10"
                    />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="33"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={207.3}
                      initial={{ strokeDashoffset: 207.3 }}
                      animate={{
                        strokeDashoffset: 207.3 - (207.3 * overallScore) / 100,
                      }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="text-[#AC6CFF]"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-base font-bold text-white font-orbitron">
                    {overallScore}%
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {[
                  {
                    label: "Performance",
                    score: data.performance_score || data.performance || data.pagespeed?.scores?.performance || 82,
                  },
                  {
                    label: "Technical SEO",
                    score: data.technical_seo_score || data.technical_seo || data.pagespeed?.scores?.seo || 88,
                  },
                  {
                    label: "Content",
                    score: data.content_score || data.content || 79,
                  },
                ].map((metric, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1A1A1A] border border-white/5 rounded-xl p-4 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-gray-300 font-medium">{metric.label}</span>
                      <span className={`font-bold ${getScoreColor(metric.score)}`}>
                        {metric.score}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.score}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                        className={`h-full bg-gradient-to-r ${getScoreBarColor(metric.score)} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* PageSpeed Scores (If Available) */}
              {data.pagespeed?.scores && (
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-orbitron">
                    PageSpeed Insights
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(data.pagespeed.scores).map(([key, value], idx) => (
                      <div key={idx} className="bg-[#1A1A1A] border border-white/5 rounded-xl p-3.5 text-center">
                        <p className={`text-xl font-bold font-orbitron ${getScoreColor(value)}`}>
                          {value}%
                        </p>
                        <p className="text-gray-400 text-xs capitalize mt-1">
                          {key.replace(/_/g, " ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Web Vitals (If Available) */}
              {data.pagespeed?.metrics && (
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-orbitron">
                    Core Web Vitals
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.entries(data.pagespeed.metrics).map(([key, value], idx) => (
                      <div key={idx} className="bg-[#1A1A1A] border border-white/5 rounded-xl p-3">
                        <p className="text-white font-semibold text-sm">{value}</p>
                        <p className="text-gray-400 text-xs capitalize mt-0.5">
                          {key.replace(/_/g, " ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RESTRICT DETAILED SECTION BREAKDOWN & RECOMMENDATIONS TO ACTIVE SERVICE CUSTOMERS ONLY */}
              {hasActiveService ? (
                <>
                  {/* Section Analysis List */}
                  {data.section_analysis && data.section_analysis.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-orbitron">
                        Section Breakdown
                      </h4>
                      <div className="space-y-2.5">
                        {data.section_analysis.map((sec, idx) => {
                          const style = getStatusStyle(sec.status);
                          const IconComp = style.Icon;
                          return (
                            <div key={idx} className={`flex items-start gap-3.5 p-3.5 rounded-xl border ${style.bg}`}>
                              <div className={`p-1.5 ${style.iconBg} rounded-lg shrink-0 mt-0.5`}>
                                <IconComp className={style.iconColor} size={16} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-white font-semibold text-sm">{sec.section}</span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                    sec.status.toLowerCase() === "good" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                                  }`}>
                                    {sec.status}
                                  </span>
                                </div>
                                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{sec.analysis}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {data.recommendations && data.recommendations.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-orbitron">
                        Key Recommendations
                      </h4>
                      <div className="space-y-2.5">
                        {data.recommendations.map((rec, idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/10 p-3.5 rounded-xl">
                            <AlertCircle className="text-blue-400 shrink-0 mt-0.5" size={16} />
                            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{rec.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* LOCKED BANNER FOR USERS WITHOUT AN ACTIVE PURCHASED SERVICE */
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E1E1E] to-[#141414] border border-[#AC6CFF]/30 text-center relative overflow-hidden space-y-4 shadow-xl">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#AC6CFF]/15 rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative z-10 space-y-3 max-w-lg mx-auto">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#AC6CFF]/20 to-purple-600/20 text-[#AC6CFF] border border-[#AC6CFF]/30 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(172,108,255,0.2)]">
                      <Lock size={22} />
                    </div>
                    <h4 className="text-base sm:text-lg font-orbitron font-bold text-white">
                      Unlock Full Section Breakdown & Recommendations
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      Detailed section breakdowns, technical on-page fixes, and custom action recommendations are exclusively reserved for customers with active purchased services.
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/dashboard/my-plan"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white font-bold text-xs sm:text-sm hover:opacity-90 transition-all shadow-[0_0_15px_rgba(172,108,255,0.3)]"
                      >
                        <Zap size={15} />
                        <span>Order a Service Package</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div id="pdf-action-buttons" className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-white/10">
                {hasActiveService && (
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] hover:opacity-90 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(172,108,255,0.25)] transition-all"
                  >
                    {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    <span>{isDownloading ? "Generating PDF..." : "Download Full PDF Report"}</span>
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#242424] text-white border border-white/10 hover:bg-white/10 text-xs sm:text-sm font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
