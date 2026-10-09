import React, { useState } from 'react';
import {
  X,
  Phone,
  Mail,
  Copy,
  Check,
  Building2,
  Sparkles,
  ExternalLink,
  Code2,
  Award,
  GraduationCap,
  MessageCircle,
  ShieldCheck,
  Terminal,
  Cpu,
} from 'lucide-react';

interface WorkshopManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkshopManagerModal: React.FC<WorkshopManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="workshop-manager-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-slate-950 border border-red-500/30 rounded-3xl shadow-2xl overflow-hidden text-white my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header Banner */}
        <div className="relative bg-gradient-to-r from-red-950 via-slate-900 to-red-950 p-6 sm:p-8 border-b border-red-900/30 overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar / Badge */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl border-2 border-red-400/50">
                MD
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-slate-900 border border-red-500 text-[10px] font-mono font-bold text-red-400 flex items-center gap-1 shadow-md">
                <Code2 className="w-3 h-3 text-red-400" />
                <span>LEAD</span>
              </div>
            </div>

            {/* Title / Name */}
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Workshop Manager & Tech Architect</span>
              </div>
              <h2
                id="workshop-manager-title"
                className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase"
              >
                MOHIM DAS
              </h2>
              <div className="space-y-1 pt-1">
                <div className="text-sm font-bold text-red-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <Terminal className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Founder &amp; CEO of CodeLX</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
                  <GraduationCap className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Joint Founder of ARDM Academy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Direct Contact Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
              <span>Direct Contact &amp; Inquiry</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Phone Contact */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-colors flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-red-400" />
                    Phone / Helpline
                  </span>
                  <button
                    onClick={() => handleCopy('9123870823', 'phone')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="text-lg font-mono font-black text-white tracking-wide">
                  9123870823
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="tel:9123870823"
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/919123870823?text=Hello%20Mohim%20Das,%20I%20am%20inquiring%20about%20the%20ARDM%20Academy%20%26%20CodeLX%20Free%20AI%20Workshop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Email Contact */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-colors flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-red-400" />
                    Official Email
                  </span>
                  <button
                    onClick={() => handleCopy('mohimdas300@gmail.com', 'email')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-white break-all">
                  mohimdas300@gmail.com
                </div>
                <div className="pt-1">
                  <a
                    href="mailto:mohimdas300@gmail.com?subject=Inquiry%20regarding%20AI%20Workshop%20and%20Coding%20Class"
                    className="block text-center py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* About Mohim Das & Workshop Mission */}
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Workshop Manager Profile &amp; Mission</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mohim Das serves as the <strong>Founder &amp; CEO of CodeLX</strong> and <strong>Joint Founder of ARDM Academy</strong>. He directs technological engineering, hands-on Python curriculum, logic design, and interactive artificial intelligence workshops for school and college learners.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Under his guidance, ARDM Academy and CodeLX bring completely free coding bootcamps, prompt engineering primers, and verifiable digital certifications to students across West Bengal and nationwide.
            </p>
          </div>

          {/* Key Roles & Badges */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">CodeLX</span>
                <span className="text-[11px] text-slate-400">Founder &amp; CEO</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">ARDM Academy</span>
                <span className="text-[11px] text-slate-400">Joint Founder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-slate-400 font-mono">
            Direct Workshop Manager Desk
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
