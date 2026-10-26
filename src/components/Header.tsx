import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Plus, Shield } from 'lucide-react';
import { HOSPITAL_CONTACT } from '../data/hospitalData';

interface HeaderProps {
  onOpenBooking: (doctorName?: string, departmentSlug?: string) => void;
  onOpenEmergencyModal?: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenEmergencyModal, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Emergency', href: '#emergency' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white transition-shadow duration-200">
      {/* Top Emergency Utility Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-rose-400">24/7 Level 1 Trauma Center</span>
            <span className="text-slate-500" aria-hidden="true">·</span>
            <span className="text-slate-300">Average Triage Time Under 3 Mins</span>
            <span className="hidden md:inline text-slate-500" aria-hidden="true">·</span>
            <span className="hidden md:inline text-slate-300">JCI & ISO 9001 Accredited</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a 
              href={`tel:${HOSPITAL_CONTACT.emergencyHotline.replace(/[^\d]/g, '')}`}
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer"
              title="Call 24/7 Emergency Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              <span>Emergency: {HOSPITAL_CONTACT.emergencyHotline}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-teal-300 hover:text-teal-200 transition-colors cursor-pointer bg-slate-800/90 hover:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 font-medium"
              title="Access Admin Console & Delete Controls"
            >
              <Shield className="w-3 h-3 text-teal-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-200 ${isScrolled ? 'shadow-md py-3' : 'py-4'} border-b border-slate-200/80`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark with Medical Cross Icon */}
          <a 
            href="#home" 
            className="flex items-center gap-2.5 text-slate-900 group shrink-0 focus-visible:outline-teal-600"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
          >
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm group-hover:bg-teal-700 transition-colors">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                Central Hospital
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-teal-700 transition-colors whitespace-nowrap focus-visible:outline-teal-600"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 active:bg-teal-800 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus-visible:outline-teal-600"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[96px] bg-white border-b border-slate-200 shadow-xl px-4 py-6 transition-all animate-in fade-in slide-in-from-top-2 duration-150 z-50">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-teal-700 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>
              <a
                href={`tel:${HOSPITAL_CONTACT.emergencyHotline.replace(/[^\d]/g, '')}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100"
              >
                <Phone className="w-4 h-4" />
                <span>Call Emergency ({HOSPITAL_CONTACT.emergencyHotline})</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200"
              >
                <Shield className="w-4 h-4 text-teal-600" />
                <span>Staff & Admin Portal (Delete Privileges)</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
