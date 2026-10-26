import React from 'react';
import { CheckCircle2, Shield, HeartPulse, Building2, Users } from 'lucide-react';
import { HOSPITAL_STATS } from '../data/hospitalData';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700 mb-2">
            About Central Hospital
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight [text-wrap:balance]">
            Decades of Pioneering Healthcare, Grounded in Human Empathy
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded with a steadfast mission to make world-class healthcare accessible, Central Hospital blends clinical rigor with genuine compassion. From routine preventative wellness to life-critical neurosurgery, our integrated teams put patients at the center of every clinical decision.
          </p>
        </div>

        {/* 4 Key Statistics Strip with Tabular Numerals */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {HOSPITAL_STATS.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div className="text-3xl sm:text-4xl font-black text-teal-700 font-['Outfit',sans-serif] tabular-nums">
                {stat.value}
              </div>
              <div className="mt-2">
                <div className="text-base font-bold text-slate-900">{stat.label}</div>
                <div className="text-xs text-slate-500 mt-1 leading-snug">{stat.context}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two-Column Split: Mission & Vision + Facility & Laboratory Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Mission, Vision, and Core Commitments */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Our Clinical Mission</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To preserve human health and heal with relentless clinical excellence, compassionate communication, and personalized treatment regimens tailored to every individual's unique biological and personal needs.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-700">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Our Patient-First Vision</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To be the benchmark regional academic medical center, leading healthcare innovations in minimally invasive surgery, precision oncology, and acute emergency care while maintaining an environment of warmth and transparency.
                </p>
              </div>

              {/* Guarantees List */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
                  Why Families Trust Central Hospital
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>Joint Commission (JCI) Accredited</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>Multidisciplinary Tumor Boards</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>Rapid Same-Day Imaging & Lab</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>Transparent Billing & Estimates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>In-House 24/7 Clinical Pharmacy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>Secure Online Medical Records</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4 text-teal-400" />
                <span>Schedule a Campus Consultation</span>
              </button>
            </div>
          </div>

          {/* Column 2: Facility Image Showcase + Technology Overview */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm h-full flex flex-col">
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src="/src/assets/images/hospital_diagnostics_lab_1793013067261.jpg"
                  alt="State of the art medical diagnostics laboratory at Central Hospital"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-teal-400" />
                  <span>College of American Pathologists (CAP) Certified</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    State-of-the-Art Diagnostic & Imaging Wing
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Accurate diagnoses drive effective cures. Our facility houses 3.0 Tesla Silent MRI suites, 128-slice volumetric computed tomography (CT), high-resolution 3D mammography, and robotic automated blood chemistry processors that deliver clinical insights with unprecedented speed.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="block text-base font-bold text-slate-900 tabular-nums">12,000+</span>
                    <span className="text-[11px] text-slate-500">Weekly Tests</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="block text-base font-bold text-slate-900 tabular-nums">&lt;45 min</span>
                    <span className="text-[11px] text-slate-500">Stat Lab Panels</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="block text-base font-bold text-slate-900 tabular-nums">100%</span>
                    <span className="text-[11px] text-slate-500">Digital PACS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
