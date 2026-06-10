import React, { useState } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

interface Service {
  id: number;
  title: string;
  slug?: string;
}

interface ServiceSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  plan: any;
  onConfirm: (serviceId: number) => void;
}

const ServiceSelectModal = ({
  isOpen,
  onClose,
  services,
  plan,
  onConfirm,
}: ServiceSelectModalProps) => {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    services.length === 1 ? services[0].id : null
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-[linear-gradient(162deg,#1e1e1e_0%,#0a0a0a_100%)] border border-white/10 rounded-3xl p-8 shadow-[0_0_80px_rgba(172,108,255,0.15)] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-[#AC6CFF] text-xs font-orbitron uppercase tracking-widest mb-2">
            Step 1 of 2
          </p>
          <h3 className="text-white text-xl font-orbitron font-bold">
            Select a Service
          </h3>
          <p className="text-white/40 text-sm font-inter mt-2">
            Your{" "}
            <span className="text-[#AC6CFF] font-semibold">{plan?.name}</span>{" "}
            plan includes the following services. Pick one to continue.
          </p>
        </div>

        {/* Service List */}
        <div className="space-y-3 mb-8">
          {services.map((service) => {
            const isSelected = selectedServiceId === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`w-full flex items-center justify-between gap-3 p-4 rounded-2xl border transition-all duration-200 text-left
                  ${
                    isSelected
                      ? "border-[#AC6CFF] bg-[#AC6CFF]/10 shadow-[0_0_20px_rgba(172,108,255,0.15)]"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                    ${
                      isSelected
                        ? "border-[#AC6CFF] bg-[#AC6CFF]"
                        : "border-white/30"
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 size={12} className="text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-inter font-medium transition-colors ${
                      isSelected ? "text-white" : "text-white/60"
                    }`}
                  >
                    {service.title}
                  </span>
                </div>
                {isSelected && (
                  <span className="text-[10px] text-[#AC6CFF] font-orbitron uppercase tracking-wider">
                    Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => {
            if (selectedServiceId) onConfirm(selectedServiceId);
          }}
          disabled={!selectedServiceId}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] text-white font-inter font-semibold text-sm
            hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(172,108,255,0.25)]
            disabled:opacity-40 disabled:cursor-not-allowed
            flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          Continue to Checkout
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ServiceSelectModal;
