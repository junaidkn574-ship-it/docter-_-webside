import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Heart, 
  Brain, 
  Baby, 
  Activity, 
  ArrowRight, 
  Calendar,
  Check,
  Stethoscope
} from 'lucide-react';
import { DEPARTMENTS, Department } from '../data/hospitalData';
import { DepartmentModal } from './DepartmentModal';

interface ServicesSectionProps {
  onOpenBooking: (doctorName?: string, departmentSlug?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  // Helper to pick proper department icon
  const getDeptIcon = (slug: string) => {
    switch (slug) {
      case 'emergency-care':
        return <ShieldAlert className="w-6 h-6 text-rose-600" />;
      case 'cardiology':
        return <Heart className="w-6 h-6 text-red-600" />;
      case 'neurology':
        return <Brain className="w-6 h-6 text-indigo-600" />;
      case 'pediatrics':
        return <Baby className="w-6 h-6 text-amber-600" />;
      case 'orthopedics':
        return <Stethoscope className="w-6 h-6 text-teal-600" />;
      case 'diagnostics':
        return <Activity className="w-6 h-6 text-sky-600" />;
      default:
        return <Activity className="w-6 h-6 text-teal-600" />;
    }
  };

  const getDeptBg = (slug: string) => {
    switch (slug) {
      case 'emergency-care':
        return 'bg-rose-50 border-rose-100 group-hover:bg-rose-600 group-hover:text-white';
      case 'cardiology':
        return 'bg-red-50 border-red-100 group-hover:bg-red-600 group-hover:text-white';
      case 'neurology':
        return 'bg-indigo-50 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white';
      case 'pediatrics':
        return 'bg-amber-50 border-amber-100 group-hover:bg-amber-600 group-hover:text-white';
      case 'orthopedics':
        return 'bg-teal-50 border-teal-100 group-hover:bg-teal-600 group-hover:text-white';
      case 'diagnostics':
        return 'bg-sky-50 border-sky-100 group-hover:bg-sky-600 group-hover:text-white';
      default:
        return 'bg-slate-50 border-slate-100 group-hover:bg-teal-600 group-hover:text-white';
    }
  };

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-teal-700 mb-2">
              Clinical Specialties
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight [text-wrap:balance]">
              Core Medical Services & Advanced Departments
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Our multidisciplinary departments provide complete clinical pathways—from early precision screening and minimally invasive therapeutics to comprehensive post-surgical recovery.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment by Department</span>
            </button>
          </div>
        </div>

        {/* 6 Core Medical Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="group bg-white rounded-xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Emergency Indicator */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${getDeptBg(dept.slug)}`}>
                    {getDeptIcon(dept.slug)}
                  </div>
                  {dept.emergencyAvailable && (
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      24/7 On Call
                    </span>
                  )}
                </div>

                {/* Department Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-['Outfit',sans-serif]">
                  {dept.name}
                </h3>

                {/* Short Description */}
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {dept.shortDescription}
                </p>

                {/* Highlighted Procedures Preview */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Procedures
                  </span>
                  {dept.keyProcedures.slice(0, 2).map((proc, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 truncate">
                      <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{proc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Interactive Learn More Button & Direct Booking */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking(undefined, dept.slug)}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Facilities Banner */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Additional Specialized Units
            </span>
            <h4 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] mt-1">
              Need Oncology, Ophthalmology, or Ambulatory Surgery?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              In addition to our primary emergency and inpatient wings, Central Hospital operates certified specialty clinics for Comprehensive Cancer Infusion, Ophthalmology Laser Surgery, and Outpatient Rehabilitation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="shrink-0 px-5 py-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors cursor-pointer font-bold whitespace-nowrap shadow"
          >
            Request Referral or Consultation
          </button>
        </div>

      </div>

      {/* Interactive Department Modal */}
      {selectedDept && (
        <DepartmentModal
          department={selectedDept}
          onClose={() => setSelectedDept(null)}
          onBookDepartment={(slug) => {
            setSelectedDept(null);
            onOpenBooking(undefined, slug);
          }}
        />
      )}
    </section>
  );
};
