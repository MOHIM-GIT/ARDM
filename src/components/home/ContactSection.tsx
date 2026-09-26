import React, { useState } from 'react';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  SITE_CONFIG,
  getTelLink,
  getWhatsAppChannelLink,
  getMailtoLink,
} from '../../config/siteConfig';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [subject, setSubject] = useState('PROSTUTI Class 10 Mock Test Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setContact('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contact ARDM Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            We are Here to Help Students & Parents
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Have questions regarding the PROSTUTI Class 10 mock examinations, subject coaching, or free educational mentorship?
            Reach out via phone, official WhatsApp channel, or email.
          </p>
        </div>

        {/* 3 Contact Cards: Call, WhatsApp Channel, Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 1. Phone Call Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Direct Academic Helpline</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Speak directly with an academic advisor regarding syllabus, test centers, and registration doubts.
              </p>
              <p className="text-sm font-mono font-bold text-blue-700 bg-blue-50/70 p-2.5 rounded-xl">
                6289139984
              </p>
            </div>

            <a
              href={getTelLink()}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call 6289139984</span>
            </a>
          </div>

          {/* 2. Official WhatsApp Channel Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Official WhatsApp Channel</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive instant board exam alerts, downloadable study material PDFs, and direct guidance broadcasts.
              </p>
              <p className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50/70 p-2.5 rounded-xl truncate">
                ARDM Academy Broadcast Channel
              </p>
            </div>

            <a
              href={getWhatsAppChannelLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Join WhatsApp Channel</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          {/* 3. Email Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Official Email Support</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                For formal communications, institutional collaborations, and administrative fee verification.
              </p>
              <p className="text-sm font-mono font-semibold text-indigo-700 bg-indigo-50/70 p-2.5 rounded-xl break-all">
                ardmacademy@gmail.com
              </p>
            </div>

            <a
              href={getMailtoLink()}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email to ardmacademy@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Operational Schedule & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <h4 className="text-base font-bold text-slate-900">Contact ARDM Academy Helpdesk</h4>

            <div className="flex items-start gap-3 text-xs text-slate-600">
              <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 mb-0.5">Location Hub:</strong>
                <span>{SITE_CONFIG.contact.location}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-600">
              <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 mb-0.5">Support Schedule:</strong>
                <span>{SITE_CONFIG.contact.workingHours}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 space-y-1">
              <p className="font-bold">PROSTUTI 2026 Examination Notice:</p>
              <p className="text-slate-600">
                Admit cards are issued digitally on the platform upon payment approval. If you require venue change assistance, contact our helpline.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
            <h4 className="text-base font-bold text-slate-900 mb-1">Send a Message</h4>
            <p className="text-xs text-slate-500 mb-6">
              Our academic mentorship desk responds within 24 hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-sm text-emerald-900">Inquiry Received!</h5>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out to ARDM Academy. A mentor will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Student or Guardian Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Contact Phone / Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. 6289139984"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option>PROSTUTI Class 10 Mock Test Inquiry</option>
                    <option>Admit Card & Venue Assistance</option>
                    <option>Free Guidance & Study Materials</option>
                    <option>Computer Science & AI Courses</option>
                    <option>Other Support</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Message</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your query..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                >
                  Send Inquiry to ARDM Academy
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
