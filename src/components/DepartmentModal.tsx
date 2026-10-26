import React from 'react';
import { X, CheckCircle, Clock, MapPin, Phone, Users, Shield, Calendar } from 'lucide-react';
import { Department } from '../data/hospitalData';

interface DepartmentModalProps {
  department: Department | null;
  onClose: () => void;
  onBookDepartment: (departmentSlug: string) => void;
}

export const DepartmentModal: React.FC<DepartmentModalProps> = ({
  department,
  onClose,
  onBookDepartment,
}) => {
  if (!department) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-department-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-teal-400">
              Department Details
            </span>
            <h3 id="modal-department-title" className="text-2xl font-bold font-['Outfit',sans-serif] mt-0.5">
              {department.name}
            </h3>
            <p className="text-xs text-slate-300 mt-1">{department.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close department details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
              Clinical Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {department.fullDescription}
            </p>
          </div>

          {/* Key Procedures */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
              Specialized Treatments & Procedures
            </h4>
            <div className="space-y-2">
              {department.keyProcedures.map((proc, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                  <span>{proc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Equipment */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
              Diagnostic & Surgical Technology
            </h4>
            <div className="flex flex-wrap gap-2">
              {department.equipment.map((eq, i) => (
                <span 
                  key={i} 
                  className="bg-slate-100 text-slate-800 text-xs px-3 py-1.5 rounded-md font-medium border border-slate-200"
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Operational Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2.5">
              <Users className="w-4 h-4 text-teal-700 shrink-0" />
              <div>
                <span className="text-slate-500 block">Department Chief</span>
                <span className="font-semibold text-slate-900">{department.headOfDepartment}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
              <div>
                <span className="text-slate-500 block">Location</span>
                <span className="font-semibold text-slate-900">{department.location}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-teal-700 shrink-0" />
              <div>
                <span className="text-slate-500 block">Operating Hours</span>
                <span className="font-semibold text-slate-900">{department.openHours}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-teal-700 shrink-0" />
              <div>
                <span className="text-slate-500 block">Capacity & Care</span>
                <span className="font-semibold text-slate-900 tabular-nums">{department.bedCapacity} Dedicated Inpatient Beds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>Direct Extension: <strong>{department.phoneExtension}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookDepartment(department.slug);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book in {department.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
