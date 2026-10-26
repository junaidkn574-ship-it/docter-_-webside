import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  RotateCcw,
  Sparkles,
  Building,
  Video
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, Doctor } from '../data/hospitalData';
import { AdminStore, AppointmentRecord } from '../data/adminStore';

interface AppointmentBookingSectionProps {
  initialDoctorName?: string;
  initialDepartmentSlug?: string;
  onClearInitial?: () => void;
  onDataChanged?: () => void;
}

interface FormState {
  departmentSlug: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  visitType: 'in-person' | 'telehealth';
  fullName: string;
  phone: string;
  email: string;
  symptoms: string;
}

interface ConfirmedBooking extends FormState {
  bookingId: string;
  bookedAt: string;
}

export const AppointmentBookingSection: React.FC<AppointmentBookingSectionProps> = ({
  initialDoctorName,
  initialDepartmentSlug,
  onDataChanged,
}) => {
  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<FormState>({
    departmentSlug: initialDepartmentSlug || 'cardiology',
    doctorName: initialDoctorName || '',
    date: todayStr,
    timeSlot: '09:30 AM',
    visitType: 'in-person',
    fullName: '',
    phone: '',
    email: '',
    symptoms: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Sync props if changed from external clicks
  useEffect(() => {
    if (initialDepartmentSlug) {
      setFormData((prev) => ({
        ...prev,
        departmentSlug: initialDepartmentSlug,
        doctorName: initialDoctorName || '',
      }));
    } else if (initialDoctorName) {
      const matchDoc = DOCTORS.find((d) => d.name === initialDoctorName);
      setFormData((prev) => ({
        ...prev,
        doctorName: initialDoctorName,
        departmentSlug: matchDoc ? matchDoc.departmentSlug : prev.departmentSlug,
      }));
    }
  }, [initialDepartmentSlug, initialDoctorName]);

  // Available doctors for selected department
  const availableDoctors = DOCTORS.filter(
    (d) => !formData.departmentSlug || d.departmentSlug === formData.departmentSlug
  );

  const timeSlots = [
    '08:30 AM', '09:30 AM', '10:45 AM', '11:30 AM',
    '01:15 PM', '02:30 PM', '03:45 PM', '05:00 PM'
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.departmentSlug) {
      newErrors.departmentSlug = 'Please select a clinical department';
    }

    if (!formData.date) {
      newErrors.date = 'Please pick a consultation date';
    } else if (formData.date < todayStr) {
      newErrors.date = 'Appointment date cannot be in the past';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a preferred time slot';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full patient name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter at least first and last name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for appointment confirmation';
    } else if (!/^[0-9+\-()\s]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please provide a valid contact number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required for receipt & notifications';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [activeMode, setActiveMode] = useState<'book' | 'manage'>('book');
  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState<AppointmentRecord | null>(null);
  const [lookupError, setLookupError] = useState('');
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    setCancelSuccessMsg('');
    const all = AdminStore.getAppointments();
    const cleanId = lookupId.trim().toUpperCase();
    const found = all.find((a) => a.id.toUpperCase() === cleanId);
    if (found) {
      setLookupResult(found);
    } else {
      setLookupError(`No appointment found with Reference ID "${lookupId.trim()}". Please verify the code or check with hospital reception.`);
      setLookupResult(null);
    }
  };

  const handlePatientDeleteAppointment = () => {
    if (!lookupResult) return;
    AdminStore.deleteAppointment(lookupResult.id);
    setCancelSuccessMsg(`Appointment ${lookupResult.id} has been permanently cancelled and removed from hospital records.`);
    setLookupResult(null);
    setShowDeleteConfirm(false);
    if (onDataChanged) onDataChanged();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const deptObj = DEPARTMENTS.find((d) => d.slug === formData.departmentSlug);
      const newRecord = AdminStore.addAppointment({
        patientName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        departmentSlug: formData.departmentSlug,
        departmentName: deptObj ? deptObj.name : formData.departmentSlug,
        doctorName: formData.doctorName || 'Assigned On-Duty Specialist',
        date: formData.date,
        timeSlot: formData.timeSlot,
        visitType: formData.visitType,
        symptoms: formData.symptoms,
        status: 'Confirmed',
      });

      setConfirmedBooking({
        ...formData,
        doctorName: newRecord.doctorName,
        bookingId: newRecord.id,
        bookedAt: newRecord.createdAt,
      });

      setIsSubmitting(false);
      if (onDataChanged) onDataChanged();
    }, 500);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setFormData({
      departmentSlug: 'cardiology',
      doctorName: '',
      date: todayStr,
      timeSlot: '09:30 AM',
      visitType: 'in-person',
      fullName: '',
      phone: '',
      email: '',
      symptoms: '',
    });
    setErrors({});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="appointment" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700 mb-2">
            Online Scheduling & Patient Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight [text-wrap:balance]">
            Book or Manage Your Appointment
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Schedule a new in-person clinic visit, or look up and cancel an existing appointment anytime using your reference number.
          </p>

          {/* Mode Tabs: Book New vs. Manage/Cancel */}
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl mt-6 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveMode('book');
                setLookupError('');
                setCancelSuccessMsg('');
              }}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeMode === 'book'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Book New Appointment
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveMode('manage');
                setConfirmedBooking(null);
              }}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMode === 'manage'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Manage / Cancel Existing Booking</span>
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-3xl mx-auto">
          {activeMode === 'manage' ? (
            /* ================= Manage / Cancel Appointment View ================= */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Look Up & Cancel Appointment
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your Booking Reference Number (e.g. <code>CH-2026-8941</code>) to review clinical appointment details or delete the booking.
                </p>
              </div>

              {cancelSuccessMsg && (
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{cancelSuccessMsg}</span>
                </div>
              )}

              {lookupError && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{lookupError}</span>
                </div>
              )}

              <form onSubmit={handleLookup} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. CH-2026-8941"
                  value={lookupId}
                  onChange={(e) => setLookupId(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 uppercase font-mono tracking-wide focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Find Booking
                </button>
              </form>

              {lookupResult && (
                <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4 animate-in fade-in duration-150">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                    <div>
                      <span className="text-xs text-slate-500 block">Booking Reference</span>
                      <strong className="text-base font-bold text-teal-800 font-mono">{lookupResult.id}</strong>
                    </div>
                    <div>
                      <span className="text-xs px-2.5 py-1 rounded font-bold bg-teal-100 text-teal-800">
                        Status: {lookupResult.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Patient:</span>
                      <strong className="text-slate-900">{lookupResult.patientName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Contact Phone:</span>
                      <span className="text-slate-900">{lookupResult.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Department:</span>
                      <strong className="text-slate-900">{lookupResult.departmentName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Consulting Doctor:</span>
                      <strong className="text-slate-900">{lookupResult.doctorName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Scheduled Date & Time:</span>
                      <strong className="text-slate-900">{lookupResult.date} at {lookupResult.timeSlot}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Visit Format:</span>
                      <span className="text-slate-900 capitalize">{lookupResult.visitType}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Need to reschedule or delete?
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      <span>Delete / Cancel Appointment</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Patient Delete Confirmation Modal */}
              {showDeleteConfirm && lookupResult && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                        Confirm Appointment Cancellation & Deletion
                      </h4>
                      <p className="text-xs text-rose-800 mt-0.5">
                        Are you sure you want to cancel and delete appointment <strong>{lookupResult.id}</strong>? The reserved slot with {lookupResult.doctorName} will be released.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg"
                    >
                      Keep Booking
                    </button>
                    <button
                      type="button"
                      onClick={handlePatientDeleteAppointment}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
                    >
                      Yes, Delete Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : confirmedBooking ? (
            /* ================= Success State View ================= */
            <div className="bg-white rounded-2xl border-2 border-teal-500/40 p-6 sm:p-10 shadow-xl animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-teal-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="text-center mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-2">
                  We Look Forward to Seeing You
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Your appointment request has been confirmed in the Central Hospital scheduling system.
                </p>
              </div>

              {/* Appointment Card Summary */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider block">Reference Number</span>
                    <strong className="text-lg font-bold text-teal-800 font-mono tracking-wide">{confirmedBooking.bookingId}</strong>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block">Visit Format</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                      {confirmedBooking.visitType === 'in-person' ? (
                        <>
                          <Building className="w-3.5 h-3.5 text-teal-600" />
                          <span>In-Person Clinic Visit</span>
                        </>
                      ) : (
                        <>
                          <Video className="w-3.5 h-3.5 text-teal-600" />
                          <span>Telehealth Video Link</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block">Department:</span>
                    <strong className="text-slate-900">
                      {DEPARTMENTS.find(d => d.slug === confirmedBooking.departmentSlug)?.name || confirmedBooking.departmentSlug}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Consulting Physician:</span>
                    <strong className="text-slate-900">{confirmedBooking.doctorName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Scheduled Date:</span>
                    <strong className="text-slate-900">{confirmedBooking.date}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Preferred Time:</span>
                    <strong className="text-slate-900">{confirmedBooking.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Patient Name:</span>
                    <strong className="text-slate-900">{confirmedBooking.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Contact Info:</span>
                    <span className="text-slate-900">{confirmedBooking.phone} · {confirmedBooking.email}</span>
                  </div>
                </div>

                {confirmedBooking.symptoms && (
                  <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700 block mb-0.5">Reported Symptoms / Notes:</span>
                    <p className="italic bg-white p-2.5 rounded border border-slate-200">{confirmedBooking.symptoms}</p>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-sky-50 border border-sky-100 rounded-lg p-4 text-xs text-sky-900 mb-8 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-sky-700 mt-0.5 shrink-0" />
                <p>
                  Please arrive 15 minutes prior to your scheduled time with a photo ID and insurance card. If you selected Telehealth, a secure encrypted link will be sent to your email 30 minutes before the consultation.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Print Summary</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Book Another Appointment</span>
                </button>
              </div>
            </div>
          ) : (
            /* ================= Interactive Form View ================= */
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-6">
              
              {/* Visit Type Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Visit Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, visitType: 'in-person' })}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                      formData.visitType === 'in-person'
                        ? 'bg-teal-50 border-teal-600 text-teal-800 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>In-Person Clinic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, visitType: 'telehealth' })}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                      formData.visitType === 'telehealth'
                        ? 'bg-teal-50 border-teal-600 text-teal-800 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Telehealth Video</span>
                  </button>
                </div>
              </div>

              {/* Two-Column: Department & Doctor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Department Selection */}
                <div>
                  <label htmlFor="dept-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Medical Department <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="dept-select"
                    value={formData.departmentSlug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        departmentSlug: e.target.value,
                        doctorName: '', // reset selected doctor if dept changes
                      })
                    }
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all text-slate-900 ${
                      errors.departmentSlug ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.slug}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {errors.departmentSlug && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.departmentSlug}
                    </p>
                  )}
                </div>

                {/* Doctor Selection */}
                <div>
                  <label htmlFor="doctor-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Doctor <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    id="doctor-select"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all text-slate-900"
                  >
                    <option value="">First Available On-Duty Specialist</option>
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name} ({doc.specialty})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date Picker */}
                <div>
                  <label htmlFor="booking-date" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="booking-date"
                      type="date"
                      min={todayStr}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all text-slate-900 ${
                        errors.date ? 'border-rose-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.date && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                    </p>
                  )}
                </div>

                {/* Time Slot Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Time Slot <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all text-slate-900"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.timeSlot && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.timeSlot}
                    </p>
                  )}
                </div>
              </div>

              {/* Patient Contact Information */}
              <div className="pt-2 border-t border-slate-100">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  Patient Contact Information
                </span>

                <div className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="patient-name" className="block text-xs font-medium text-slate-700 mb-1">
                      Patient Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="patient-name"
                        type="text"
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all text-slate-900 ${
                          errors.fullName ? 'border-rose-400' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="patient-phone" className="block text-xs font-medium text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="patient-phone"
                          type="tel"
                          placeholder="(555) 012-3456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all text-slate-900 ${
                            errors.phone ? 'border-rose-400' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="patient-email" className="block text-xs font-medium text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="patient-email"
                          type="email"
                          placeholder="patient@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all text-slate-900 ${
                            errors.email ? 'border-rose-400' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Reason for Visit / Symptoms */}
                  <div>
                    <label htmlFor="patient-symptoms" className="block text-xs font-medium text-slate-700 mb-1">
                      Symptoms or Reason for Consultation <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="patient-symptoms"
                      rows={3}
                      placeholder="Briefly describe your symptoms, previous diagnoses, or specific care requests..."
                      value={formData.symptoms}
                      onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  🔒 HIPAA Compliant & Confidential 256-Bit SSL Encryption
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl transition-all shadow-md hover:shadow-teal-600/25 cursor-pointer disabled:opacity-60 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Confirming Appointment...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm & Book Appointment</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
