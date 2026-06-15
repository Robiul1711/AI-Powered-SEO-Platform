import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Loader2, Target, CheckCircle2 } from "lucide-react";
import useMutationClient from "@/hooks/useMutationClient";

interface AiProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceSlug?: string;
}

const AiProposalModal = ({ isOpen, onClose, serviceSlug = "monthly-seo-campaign" }: AiProposalModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    lead_name: "",
    company_name: "",
    website_url: "",
    goals: "",
    budget: "",
    service_slug: serviceSlug
  });
  const [proposalData, setProposalData] = useState<any>(null);

  const { mutate: generateProposal, isPending } = useMutationClient({
    url: "/services/proposal/generate",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateProposal({ data: formData }, {
      onSuccess: (res: any) => {
        setProposalData(res?.data);
        setStep(2);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#AC6CFF]/30 rounded-[30px] p-6 sm:p-8 w-full max-w-2xl shadow-[0_0_50px_rgba(172,108,255,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#AC6CFF]/10 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 p-2 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          {step === 1 ? (
            <div className="relative z-10">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white uppercase flex items-center gap-3">
                  <Sparkles className="text-[#AC6CFF]" />
                  AI Proposal Generator
                </h2>
                <p className="text-gray-400 mt-2 font-inter">Tell us about your business, and our AI will generate a personalized growth strategy.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-inter">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-orbitron uppercase text-gray-400 mb-2 tracking-wider">Your Name *</label>
                    <input required name="lead_name" value={formData.lead_name} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#AC6CFF]/50 transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-orbitron uppercase text-gray-400 mb-2 tracking-wider">Company Name *</label>
                    <input required name="company_name" value={formData.company_name} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#AC6CFF]/50 transition-colors" placeholder="Acme Corp" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-orbitron uppercase text-gray-400 mb-2 tracking-wider">Website URL</label>
                  <input type="url" name="website_url" value={formData.website_url} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#AC6CFF]/50 transition-colors" placeholder="https://example.com" />
                </div>

                <div>
                  <label className="block text-xs font-orbitron uppercase text-gray-400 mb-2 tracking-wider">Primary Goals *</label>
                  <textarea required name="goals" value={formData.goals} onChange={handleInputChange} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#AC6CFF]/50 transition-colors resize-none" placeholder="Increase organic traffic, improve local visibility..."></textarea>
                </div>

                <div>
                  <label className="block text-xs font-orbitron uppercase text-gray-400 mb-2 tracking-wider">Monthly Budget Estimate</label>
                  <input name="budget" value={formData.budget} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#AC6CFF]/50 transition-colors" placeholder="e.g., $1,000 - $3,000" />
                </div>

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full mt-6 bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] text-black font-orbitron font-bold uppercase tracking-widest py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <><Loader2 className="animate-spin" size={20} /> Generating Magic...</>
                  ) : (
                    <><Sparkles size={20} /> Generate AI Proposal</>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="mb-6 border-b border-white/10 pb-6">
                <div className="inline-block bg-[#AC6CFF]/20 text-[#AC6CFF] px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-3">
                  AI Generated
                </div>
                <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white uppercase mb-2">Your Proposal is Ready</h2>
                <p className="text-gray-400 font-inter text-sm">{proposalData?.personalized_greeting}</p>
              </div>

              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar font-inter">
                <div>
                  <h3 className="text-[#AC6CFF] font-bold mb-2 flex items-center gap-2"><Target size={18} /> Executive Summary</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{proposalData?.executive_summary}</p>
                </div>

                <div>
                  <h3 className="text-[#AC6CFF] font-bold mb-3 flex items-center gap-2"><CheckCircle2 size={18} /> Recommended Scope</h3>
                  <ul className="space-y-2">
                    {proposalData?.recommended_scope?.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#AC6CFF] mt-1.5 shrink-0" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#242424] p-4 rounded-xl border border-white/5">
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-orbitron">Estimated Timeline</span>
                    <span className="text-white font-bold">{proposalData?.timeline_estimate}</span>
                  </div>
                  <div className="bg-[#242424] p-4 rounded-xl border border-[#AC6CFF]/20">
                    <span className="block text-[10px] text-[#AC6CFF] uppercase tracking-widest mb-1 font-orbitron">Pricing Recommendation</span>
                    <span className="text-white font-bold">{proposalData?.pricing_recommendation}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#AC6CFF]/10 to-transparent p-5 rounded-xl border-l-2 border-[#AC6CFF]">
                  <p className="text-gray-300 text-sm italic">"{proposalData?.why_choose_us}"</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 rounded-xl border border-white/20 text-white font-orbitron uppercase text-xs tracking-widest hover:bg-white/5 transition-colors"
                >
                  Start Over
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl bg-[#AC6CFF] text-black font-orbitron font-bold uppercase text-xs tracking-widest hover:opacity-90 transition-opacity"
                >
                  Close & View Plans
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AiProposalModal;
