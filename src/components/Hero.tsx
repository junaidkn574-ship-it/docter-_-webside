import React from 'react';
import { Calendar, UserCheck, ShieldAlert, Stethoscope, Activity, ArrowRight, Clock, Award } from 'lucide-react';
import { HOSPITAL_CONTACT } from '../data/hospitalData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreDoctors: () => void;
  onExploreServices: () => void;
  onExploreEmergency: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onExploreDoctors,
  onExploreServices,
  onExploreEmergency,
}) => {
  return (
    <section id="home" className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image Container with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_central_hospital_1793013065527.jpg"
          alt="Central Hospital modern medical facility and architectural campus"
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/60" />
        <div className="absolute inset-0 bg-slate-950/30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-28 lg:pb-36">
        <div className="max-w-3xl">
          {/* Subtle Trust Anchor */}
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 mb-4 tracking-wide uppercase">
            <span className="flex items-center gap-1.5 bg-teal-950/80 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-md">
              <Award className="w-3.5 h-3.5 text-teal-400" />
              Nationally Ranked Medical Excellence
            </span>
            <span className="text-slate-400 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-slate-300 hidden sm:inline">45 Years of Compassionate Care</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-['Outfit',sans-serif] [text-wrap:balance]">
            Compassionate Care, <br />
            <span className="text-teal-400">Advanced Medicine</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-5 text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl font-normal">
            Central Hospital brings together 280+ board-certified specialists, state-of-the-art diagnostic imaging, and 24/7 Level 1 Trauma Care. We are committed to patient-first medicine when you need it most.
          </p>

          {/* Two Primary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500 active:bg-teal-700 transition-all shadow-lg hover:shadow-teal-600/30 focus-visible:outline-teal-400 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>Book an Appointment</span>
            </button>
            <button
              type="button"
              onClick={onExploreDoctors}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-100 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all hover:text-white backdrop-blur-sm focus-visible:outline-white whitespace-nowrap cursor-pointer"
            >
              <UserCheck className="w-5 h-5 text-teal-400" />
              <span>Find a Doctor</span>
            </button>
          </div>

          {/* Key Clinical Markers */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Average wait time: <strong className="text-white font-medium">Under 15 mins</strong></span>
            </div>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <div>
              <span>Emergency Hotline: <a href={`tel:${HOSPITAL_CONTACT.emergencyHotline.replace(/[^\d]/g, '')}`} className="text-rose-400 font-bold hover:underline">{HOSPITAL_CONTACT.emergencyHotline}</a></span>
            </div>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            <div className="hidden sm:inline">
              <span>Same-Day Appointments Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick-Access Info Cards Strip (Anchor Overlay) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          
          {/* Card 1: 24/7 Emergency */}
          <div className="bg-white rounded-xl p-6 shadow-xl border border-slate-200/90 text-slate-900 flex flex-col justify-between hover:shadow-2xl transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded">
                  Immediate 24/7
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                24/7 Emergency & Trauma
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Level 1 Trauma Care with dedicated resuscitation bays, hyperacute stroke response, and rapid cardiac catheterization.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`tel:${HOSPITAL_CONTACT.emergencyHotline.replace(/[^\d]/g, '')}`}
                className="text-sm font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                Call {HOSPITAL_CONTACT.emergencyHotline}
              </a>
              <button
                type="button"
                onClick={onExploreEmergency}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1"
              >
                ER Guide <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Expert Doctors */}
          <div className="bg-white rounded-xl p-6 shadow-xl border border-slate-200/90 text-slate-900 flex flex-col justify-between hover:shadow-2xl transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded">
                  280+ Specialists
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Expert Doctors & Surgeons
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Board-certified physicians across 35 medical specialties with Ivy-league training and patient-first clinical empathy.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onExploreDoctors}
                className="text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
              >
                Browse Directory <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-slate-500">Same-Day Slots</span>
            </div>
          </div>

          {/* Card 3: Modern Diagnostics */}
          <div className="bg-white rounded-xl p-6 shadow-xl border border-slate-200/90 text-slate-900 flex flex-col justify-between hover:shadow-2xl transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
                  Same-Day Lab
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                Modern Diagnostics & Lab
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                High-field 3T MRI, 128-slice CT scans, and automated pathology lab returning emergency panels in under 45 minutes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onExploreServices}
                className="text-sm font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
              >
                View Services <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-slate-500">CAP Accredited</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
