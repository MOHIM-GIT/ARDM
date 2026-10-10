import React, { useState } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  SITE_CONFIG,
  getTelLink,
  getWhatsAppChannelLink,
  getMailtoLink,
} from '../config/siteConfig';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact ARDM Academy',
    'description': 'Direct telephone helpline, official WhatsApp channel and email address for ARDM Academy.',
    'mainEntity': {
      '@type': 'EducationalOrganization',
      'name': 'ARDM Academy',
      'telephone': '+916289139984',
      'email': 'ardmacademy@gmail.com',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Kolkata',
        'addressRegion': 'West Bengal',
        'addressCountry': 'IN',
      },
    },
  };

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      <SEOHead
        title="Contact | ARDM Academy"
        description="Contact ARDM Academy via helpline 6289139984, official WhatsApp channel, or email for admissions, mock test queries, and coaching support."
        canonical="https://ardmacademy.netlify.app/contact"
        breadcrumbs={[{ name: 'Contact Us', path: '/contact' }]}
        schema={contactSchema}
      />

      <Breadcrumbs items={[{ name: 'Contact Us', path: '/contact' }]} onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <header className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Support & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Contact ARDM Academy
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Have questions regarding our PROSTUTI Class 10 Mock Tests, registration verification, or free study materials? Our team is here to assist you.
          </p>
        </header>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Direct Academic Helpline</h2>
              <p className="text-xs text-slate-500">
                Call for immediate admission assistance, test center directions, or payment queries.
              </p>
              <p className="text-sm font-mono font-bold text-blue-700 bg-blue-50 p-2.5 rounded-xl">
                6289139984
              </p>
            </div>
            <a
              href={getTelLink()}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call 6289139984</span>
            </a>
          </div>

          {/* WhatsApp Channel */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Official WhatsApp Channel</h2>
              <p className="text-xs text-slate-500">
                Subscribe to our verified broadcast for exam alerts, study guides, and tips.
              </p>
              <p className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl truncate">
                ARDM Academy Broadcast Channel
              </p>
            </div>
            <a
              href={getWhatsAppChannelLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Join WhatsApp Channel</span>
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Email Administration</h2>
              <p className="text-xs text-slate-500">
                Send formal documentation, institutional inquiries, or student feedback.
              </p>
              <p className="text-xs font-mono font-bold text-purple-700 bg-purple-50 p-2.5 rounded-xl truncate">
                ardmacademy@gmail.com
              </p>
            </div>
            <a
              href={getMailtoLink()}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Write to Academy</span>
            </a>
          </div>
        </div>

        {/* Working Hours & Address */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">Campus Location</p>
              <p>Kolkata, West Bengal, India</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">Operating Schedule</p>
              <p>Monday – Sunday: 8:00 AM – 9:00 PM IST</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
