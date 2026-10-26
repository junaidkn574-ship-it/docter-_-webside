import React, { useState, useMemo } from 'react';
import { Search, Star, Calendar, X, Eye, User, Stethoscope } from 'lucide-react';
import { Doctor } from '../data/hospitalData';
import { AdminStore } from '../data/adminStore';
import { DoctorModal } from './DoctorModal';

interface FindDoctorSectionProps {
  onOpenBooking: (doctorName?: string, departmentSlug?: string) => void;
  dataVersion?: number;
}

export const FindDoctorSection: React.FC<FindDoctorSectionProps> = ({ onOpenBooking, dataVersion }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const doctorsList = useMemo(() => {
    return AdminStore.getDoctors();
  }, [dataVersion]);

  const specialties = [
    { label: 'All Specialties', value: 'all' },
    { label: 'Cardiology', value: 'cardiology' },
    { label: 'Neurology', value: 'neurology' },
    { label: 'Pediatrics', value: 'pediatrics' },
    { label: 'Orthopedics', value: 'orthopedics' },
    { label: 'Emergency', value: 'emergency-care' },
    { label: 'Diagnostics', value: 'diagnostics' },
  ];

  const filteredDoctors = useMemo(() => {
    return doctorsList.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.bio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === 'all' || doc.departmentSlug === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [doctorsList, searchQuery, selectedSpecialty]);

  return (
    <section id="doctors" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700 mb-2">
            Medical Faculty & Specialists
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight [text-wrap:balance]">
            Find an Expert Doctor for Your Care
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Search our directory of board-certified clinicians, surgeons, and pediatric specialists. Every physician at Central Hospital maintains active hospital privileges and adheres to the highest benchmarks of clinical excellence.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-10 max-w-4xl mx-auto space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor name, specialty, condition (e.g. Jenkins, Heart, Knee, Brain)..."
              className="w-full pl-11 pr-10 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all text-slate-900 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Specialty Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {specialties.map((spec) => (
              <button
                key={spec.value}
                type="button"
                onClick={() => setSelectedSpecialty(spec.value)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSpecialty === spec.value
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Results Summary */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-medium">
          <span>
            Showing <strong className="text-slate-900 tabular-nums">{filteredDoctors.length}</strong> qualified specialists
            {selectedSpecialty !== 'all' ? ` in ${specialties.find(s => s.value === selectedSpecialty)?.label}` : ''}
          </span>
          {selectedSpecialty !== 'all' || searchQuery ? (
            <button
              type="button"
              onClick={() => {
                setSelectedSpecialty('all');
                setSearchQuery('');
              }}
              className="text-teal-700 hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          ) : null}
        </div>

        {/* Doctor Profile Cards Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Doctor Image Header */}
                  <div className="relative aspect-square sm:aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={doc.image}
                      alt={`Portrait of ${doc.name}`}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating Info Overlay */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded shadow-sm border border-slate-100">
                      {doc.specialty}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="tabular-nums font-bold">{doc.rating}</span>
                      <span className="text-slate-300">({doc.reviewCount})</span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif] group-hover:text-teal-700 transition-colors">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">{doc.qualifications}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] text-slate-400 block">Experience</span>
                        <span className="text-xs font-bold text-slate-700 tabular-nums">{doc.experienceYears} Years</span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {doc.bio}
                    </p>

                    {/* Room & Next Available */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="truncate">
                        Clinic: <strong className="text-slate-700">{doc.roomNumber}</strong>
                      </span>
                      <span className="text-teal-700 font-medium shrink-0">
                        Next: {doc.nextAvailable}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-5 pb-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDoctor(doc)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(doc.name, doc.departmentSlug)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consult</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <User className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">No Specialists Found</h4>
            <p className="text-xs text-slate-500 mt-1">
              No doctors matched your search criteria "{searchQuery}". Try searching by department or view all faculties.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
            >
              Clear Search & Show All
            </button>
          </div>
        )}

      </div>

      {/* Physician Detailed Modal */}
      {selectedDoctor && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBookConsultation={(name, slug) => {
            setSelectedDoctor(null);
            onOpenBooking(name, slug);
          }}
        />
      )}
    </section>
  );
};
