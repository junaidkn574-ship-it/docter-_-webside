import React from 'react';
import { Plus, Phone, Mail, MapPin, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { HOSPITAL_CONTACT, DEPARTMENTS } from '../data/hospitalData';

interface FooterProps {
  onOpenBooking: (doctorName?: string, departmentSlug?: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 text-xs border-t border-slate-800">
      {/* Top Accreditation & Trust Ribbon */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Joint Commission (JCI) Accredited
            </span>
            <span className="text-slate-600 hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline">ISO 9001:2015 Healthcare Certified</span>
            <span className="text-slate-600 hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline">Level 1 Adult & Pediatric Trauma Center</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Emergency Direct:</span>
            <a
              href={`tel:${HOSPITAL_CONTACT.emergencyHotline.replace(/[^\d]/g, '')}`}
              className="text-rose-400 font-bold hover:underline font-mono"
            >
              {HOSPITAL_CONTACT.emergencyHotline}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
                <Plus className="w-5 h-5 stroke-[3]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
                Central Hospital
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Premier healthcare institution providing advanced medical care, comprehensive 24/7 emergency services, and specialized treatments across 35 clinical disciplines.
            </p>

            <div className="pt-2 space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>{HOSPITAL_CONTACT.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>General: {HOSPITAL_CONTACT.mainReception}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Inquiries: {HOSPITAL_CONTACT.emailInquiries}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-white block mb-4">
              Quick Links
            </span>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => { e.preventDefault(); handleSmoothScroll('#home'); }}
                  className="hover:text-teal-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); handleSmoothScroll('#about'); }}
                  className="hover:text-teal-400 transition-colors"
                >
                  About Our Hospital
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => { e.preventDefault(); handleSmoothScroll('#services'); }}
                  className="hover:text-teal-400 transition-colors"
                >
                  Clinical Services
                </a>
              </li>
              <li>
                <a 
                  href="#doctors" 
                  onClick={(e) => { e.preventDefault(); handleSmoothScroll('#doctors'); }}
                  className="hover:text-teal-400 transition-colors"
                >
                  Find a Doctor
                </a>
              </li>
              <li>
                <a 
                  href="#emergency" 
                  onClick={(e) => { e.preventDefault(); handleSmoothScroll('#emergency'); }}
                  className="hover:text-teal-400 transition-colors text-rose-400 font-semibold"
                >
                  24/7 Emergency Care
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); handleSmoothScroll('#contact'); }}
                  className="hover:text-teal-400 transition-colors"
                >
                  Contact & Campus Map
                </a>
              </li>
            </ul>
          </div>

          {/* Clinical Departments */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-white block mb-4">
              Key Departments
            </span>
            <ul className="space-y-2.5">
              {DEPARTMENTS.slice(0, 6).map((dept) => (
                <li key={dept.id}>
                  <button
                    type="button"
                    onClick={() => onOpenBooking(undefined, dept.slug)}
                    className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                  >
                    {dept.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Resources & Legal */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-white block mb-4">
              Patient Resources
            </span>
            <ul className="space-y-2.5">
              <li>
                <span className="hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-1">
                  <span>Patient Portal Login</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </span>
              </li>
              <li>
                <span className="hover:text-teal-400 transition-colors cursor-pointer">
                  Insurance Accepted List
                </span>
              </li>
              <li>
                <span className="hover:text-teal-400 transition-colors cursor-pointer">
                  Medical Records Request
                </span>
              </li>
              <li>
                <span className="hover:text-teal-400 transition-colors cursor-pointer">
                  Patient Rights & Responsibilities
                </span>
              </li>
              <li>
                <span className="hover:text-teal-400 transition-colors cursor-pointer">
                  Financial Assistance Policy
                </span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-teal-400 hover:text-teal-300 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Admin & Operations Console</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Medical Advice Disclaimer:</strong> The content provided on this website is for informational and educational purposes only and does not substitute for professional medical advice, clinical diagnosis, or treatment. Always seek the advice of your physician or qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website. In case of a medical emergency, immediately call 911 or visit our 24/7 Emergency Center.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Social */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {currentYear} Central Hospital. All rights reserved. HIPAA Compliant.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Accessibility Statement</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Nondiscrimination Notice</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
