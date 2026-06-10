import React from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import * as htmlToImage from 'html-to-image';
import jsPDF from "jspdf";
import { useState } from "react";
import toast from "react-hot-toast";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    website_url: string;
    overall_score: number;
    performance_score?: number;
    performance?: number;
    technical_seo_score?: number;
    technical_seo?: number;
    content_score?: number;
    content?: number;
    summary: string;
    recommendations: { type: string; message: string }[];
    section_analysis: {
      section: string;
      status: string;
      analysis: string;
    }[];
    pagespeed: {
      scores: {
        performance: number;
        accessibility: number;
        best_practices: number;
        seo: number;
      };
      metrics: {
        first_contentful_paint: string;
        largest_contentful_paint: string;
        total_blocking_time: string;
        cumulative_layout_shift: string;
        speed_index: string;
      };
    };
    screenshots: string[];
    is_subscribed: boolean;
    download_pdf?: string;
  };
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
};

const getScoreBarColor = (score: number) => {
  if (score >= 80) return "from-green-500 to-emerald-400";
  if (score >= 50) return "from-yellow-500 to-orange-400";
  return "from-red-500 to-rose-400";
};

const getStatusStyle = (status: string) => {
  const s = status.toLowerCase();
  if (s === "good")
    return {
      bg: "bg-green-500/5 border-green-500/10 hover:bg-green-500/10",
      iconBg: "bg-green-500/20",
      Icon: CheckCircle,
      iconColor: "text-green-500",
    };
  if (s === "needs update")
    return {
      bg: "bg-yellow-500/5 border-yellow-500/10 hover:bg-yellow-500/10",
      iconBg: "bg-yellow-500/20",
      Icon: AlertTriangle,
      iconColor: "text-yellow-500",
    };
  return {
    bg: "bg-blue-500/5 border-blue-500/10 hover:bg-blue-500/10",
    iconBg: "bg-blue-500/20",
    Icon: Info,
    iconColor: "text-blue-500",
  };
};

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, data }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("pdf-content-wrapper");
    if (!element) return;

    setIsDownloading(true);
    try {
      // Hide action buttons temporarily during capture
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
      const filename = data?.website_url ? `SEO_Audit_${data.website_url.replace(/[^a-zA-Z0-9]/g, '_')}.pdf` : 'SEO_Audit.pdf';
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[900px] max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Success Icon */}
            <div className="flex flex-col items-center mb-8 relative">
              <div className="w-20 h-20 bg-Primary/20 rounded-full flex items-center justify-center relative mb-6">
                <div className="absolute inset-0 bg-Primary/40 rounded-full blur-xl animate-pulse" />
                <div className="w-14 h-14 bg-Primary rounded-full flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(172,108,255,0.6)]">
                  <Check className="text-white" size={32} />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white text-center">
                SEO Audit <span className="text-Primary">Complete</span>
              </h2>
              <p className="text-gray-400 mt-2 font-inter tracking-wide">
                Here Is Your Website Summary
              </p>
            </div>

            {/* Content Card */}
            <div id="pdf-content-wrapper" className="bg-[#111111] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden font-inter">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-Primary/10 rounded-full blur-[100px]" />

              <div className="relative z-10">
                {/* Top Info Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      Website Analyzed
                    </p>
                    <h3 className="text-lg md:text-xl text-white font-medium break-all">
                      {data.website_url}
                    </h3>
                  </div>

                  {/* Circular Overall Score */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-white/5"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={251.2}
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{
                          strokeDashoffset:
                            251.2 - (251.2 * data.overall_score) / 100,
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-Primary"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-bold text-white font-orbitron">
                        {data.overall_score}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                {data.summary && (
                  <div className="mb-10 p-4 bg-white/5 border border-white/5 rounded-2xl">
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {data.summary}
                    </p>
                  </div>
                )}

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                  {[
                    {
                      label: "Performance",
                      score:
                        data.performance_score ||
                        data.performance ||
                        data.pagespeed?.scores?.performance ||
                        0,
                    },
                    {
                      label: "Technical SEO",
                      score:
                        data.technical_seo_score ||
                        data.technical_seo ||
                        data.pagespeed?.scores?.seo ||
                        0,
                    },
                    {
                      label: "Content",
                      score: data.content_score || data.content || 0,
                    },
                  ].map((metric, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">
                          {metric.label}
                        </span>
                        <span
                          className={`font-bold ${getScoreColor(metric.score)}`}
                        >
                          {metric.score}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.score}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.5 + idx * 0.2,
                          }}
                          className={`h-full bg-gradient-to-r ${getScoreBarColor(metric.score)} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* PageSpeed Scores */}
                {data.pagespeed?.scores && (
                  <div className="mb-12">
                    <h3 className="text-xl font-orbitron font-semibold text-white mb-6">
                      PageSpeed Insights
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(data.pagespeed.scores).map(
                        ([key, value], idx) => (
                          <div
                            key={idx}
                            className="bg-white/5 border border-white/5 rounded-xl p-4 text-center"
                          >
                            <p
                              className={`text-2xl font-bold font-orbitron ${getScoreColor(value)}`}
                            >
                              {value}%
                            </p>
                            <p className="text-gray-500 text-xs mt-1 capitalize">
                              {key.replace(/_/g, " ")}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* PageSpeed Metrics */}
                {data.pagespeed?.metrics && (
                  <div className="mb-12">
                    <h3 className="text-lg font-orbitron font-semibold text-white mb-4">
                      Core Web Vitals
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(data.pagespeed.metrics).map(
                        ([key, value], idx) => (
                          <div
                            key={idx}
                            className="bg-white/5 border border-white/5 rounded-xl p-3"
                          >
                            <p className="text-white font-semibold text-sm">
                              {value}
                            </p>
                            <p className="text-gray-500 text-xs mt-0.5 capitalize">
                              {key.replace(/_/g, " ")}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Premium Content Sections (Conditional) */}
                {data.is_subscribed ? (
                  <>
                    {/* Section Analysis */}
                    {data.section_analysis?.length > 0 && (
                      <div className="space-y-4 mb-12">
                        <h3 className="text-xl font-orbitron font-semibold text-white mb-6">
                          Section Analysis
                        </h3>
                        <div className="space-y-3">
                          {data.section_analysis.map((section, idx) => {
                            const style = getStatusStyle(section.status);
                            const IconComp = style.Icon;
                            return (
                              <div
                                key={idx}
                                className={`flex items-center gap-4 border rounded-xl p-4 transition-colors ${style.bg}`}
                              >
                                <div
                                  className={`w-10 h-10 ${style.iconBg} rounded-lg flex items-center justify-center shrink-0`}
                                >
                                  <IconComp
                                    className={style.iconColor}
                                    size={20}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <p className="text-white font-medium text-sm">
                                      {section.section}
                                    </p>
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full ${section.status.toLowerCase() === "good"
                                          ? "bg-green-500/20 text-green-400"
                                          : "bg-yellow-500/20 text-yellow-400"
                                        }`}
                                    >
                                      {section.status}
                                    </span>
                                  </div>
                                  <p className="text-gray-400 text-sm">
                                    {section.analysis}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {data.recommendations?.length > 0 && (
                      <div className="space-y-4 mb-12">
                        <h3 className="text-xl font-orbitron font-semibold text-white mb-6">
                          Recommendations
                        </h3>
                        <div className="space-y-3">
                          {data.recommendations.map((rec, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-4 bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 hover:bg-blue-500/10 transition-colors"
                            >
                              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                                <AlertCircle
                                  className="text-blue-500"
                                  size={20}
                                />
                              </div>
                              <p className="text-gray-300 text-sm md:text-base">
                                {rec.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Upgrade Message for Non-Subscribed Users */
                  <div className="mb-12 py-12 px-6 bg-white/5 border border-white/5 rounded-[32px] text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-Primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 bg-Primary/20 rounded-2xl flex items-center justify-center mb-6 border border-Primary/30">
                        <Zap className="text-Primary w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-orbitron font-bold text-white mb-3">
                        Unlock Detailed Analysis
                      </h4>
                      <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                        Upgrade to our premium plans to access the full
                        section-by-section analysis and specific recommendations
                        tailored for your website.
                      </p>
                      <Link
                        to="/pricing"
                        className="bg-Primary hover:opacity-90 text-white font-orbitron font-bold px-10 py-4 rounded-xl transition-all shadow-[0_4px_15px_rgba(172,108,255,0.3)]"
                      >
                        Explore Premium Plans
                      </Link>
                    </div>
                  </div>
                )}

                {/* Screenshots */}
                {data.screenshots?.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-xl font-orbitron font-semibold text-white mb-6">
                      Page Screenshots
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.screenshots.map((url, idx) => (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-xl overflow-hidden border border-white/10 hover:border-Primary/30 transition-colors group"
                        >
                          <img
                            src={url}
                            alt={`Screenshot ${idx + 1}`}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div id="pdf-action-buttons" className="flex flex-col sm:flex-row gap-4">
                  {/* {console.log(data)} */}
                  {data?.is_subscribed && (
                    <button
                      onClick={handleDownloadPdf}
                      disabled={isDownloading}
                      className="flex-1 bg-gradient-to-r from-Primary to-blue-500 hover:opacity-90 disabled:opacity-50 text-white font-orbitron font-bold py-4 rounded-xl transition-all shadow-[0_4px_15px_rgba(172,108,255,0.3)] flex items-center justify-center gap-2"
                    >
                      {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                      {isDownloading ? "Generating PDF..." : "Download Report"}
                    </button>
                  )}
                  <Link
                    to="/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#1A1A1A] border border-white/5 hover:border-white/10 text-white font-orbitron font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Zap size={20} className="text-Primary" />
                    Get Optimization Plan
                  </Link>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
