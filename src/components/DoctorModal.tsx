import React from 'react';
import { X, Star, Calendar, GraduationCap, Languages, MapPin, Award, CheckCircle } from 'lucide-react';
import { Doctor } from '../data/hospitalData';

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookConsultation: (doctorName: string, departmentSlug: string) => void;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({
  doctor,
  onClose,
  onBookConsultation,
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-doctor-title"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-teal-400">
            Physician Profile & Credentials
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close physician profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-28 h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {doctor.specialty}
                </span>
                <span className="text-slate-400 text-xs">·</span>
                <span className="text-xs text-slate-500 font-medium tabular-nums">{doctor.experienceYears} Years Clinical Exp.</span>
              </div>
              <h3 id="modal-doctor-title" className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                {doctor.name}
              </h3>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">{doctor.qualifications}</p>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-600">
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums">{doctor.rating}</span>
                  <span className="text-slate-400 font-normal">({doctor.reviewCount} verified reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-teal-700">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                  <span>Accepting New Patients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Clinical Background
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {doctor.bio}
            </p>
          </div>

          {/* Education & Fellowships */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-teal-700" />
              <span>Education, Residencies & Fellowships</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {doctor.education.map((edu, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Award className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Clinic Room
              </span>
              <strong className="text-slate-900">{doctor.roomNumber}</strong>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-slate-400" /> Languages
              </span>
              <strong className="text-slate-900">{doctor.languages.join(', ')}</strong>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Next Available
              </span>
              <strong className="text-teal-700">{doctor.nextAvailable}</strong>
            </div>
          </div>
        </div>

        {/* Footer with Consultation Booking */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            <span>Standard Consultation: </span>
            <strong className="text-slate-900 text-sm">{doctor.consultationFee}</strong>
            <span className="text-slate-400 ml-1">(Covered by major insurers)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookConsultation(doctor.name, doctor.departmentSlug);
              }}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
