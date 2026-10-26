import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Navigation,
  Compass,
  Building,
  Car
} from 'lucide-react';
import { HOSPITAL_CONTACT } from '../data/hospitalData';
import { AdminStore } from '../data/adminStore';

interface EmergencyContactSectionProps {
  onDataChanged?: () => void;
}

export const EmergencyContactSection: React.FC<EmergencyContactSectionProps> = ({ onDataChanged }) => {
  // Campus Map Active Zone
  const [activeZone, setActiveZone] = useState<'er' | 'main' | 'outpatient' | 'parking'>('er');

  // Contact Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const campusZones = {
    er: {
      title: 'Emergency & Trauma Bay (Gate 1)',
      location: 'West Campus Blvd · Direct Ambulance Ramp',
      hours: '24 Hours / 7 Days a Week',
      description: 'Dedicated emergency entrance with covered ambulance drop-off, rapid triage intake, and direct elevator access to operating theatres.',
      badge: 'Immediate Critical Access',
    },
    main: {
      title: 'Main Inpatient Tower (Gate 2)',
      location: 'Central Plaza · Main Hospital Atrium',
      hours: 'Visiting Hours: 9:00 AM - 8:30 PM',
      description: 'Patient admissions, surgery check-in, intensive care units (ICU), patient rooms, and main reception desk.',
      badge: 'Inpatient & Surgical Wings',
    },
    outpatient: {
      title: 'Outpatient Specialty Pavilion (Gate 3)',
      location: 'East Medical Parkway · Level 1 & 2',
      hours: 'Mon - Sat: 7:30 AM - 7:30 PM',
      description: 'Specialist consultation suites, cardiology center, pediatrics clinic, and sports medicine rehabilitation gym.',
      badge: 'Specialist Consultations',
    },
    parking: {
      title: 'Patient & Visitor Parking Deck P1/P2',
      location: 'North Access Road · Multi-level Covered Parking',
      hours: 'Open 24/7 · First 2 Hours Free for Patients',
      description: 'Automated electric vehicle charging, ADA wheelchair ramps, and climate-controlled covered skybridges to Main Atrium.',
      badge: 'Covered Skybridge Access',
    },
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name.trim() || !inquiryForm.email.trim() || !inquiryForm.message.trim()) {
      setFormError('Please fill in your name, email, and message.');
      return;
    }
    setFormError('');
    AdminStore.addInquiry({
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      subject: inquiryForm.subject,
      message: inquiryForm.message,
    });
    setFormSubmitted(true);
    if (onDataChanged) onDataChanged();
  };

  return (
    <section id="emergency" className="py-20 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HIGH CONTRAST EMERGENCY BANNER ================= */}
        <div className="mb-16 bg-gradient-to-r from-rose-950 via-slate-950 to-slate-900 text-white rounded-2xl p-6 sm:p-10 border-2 border-rose-600/60 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-600 text-white">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Medical Emergency Services
                </span>
                <span className="text-rose-300 text-xs font-semibold">
                  24/7/365 Non-Stop Response
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white [text-wrap:balance]">
                Life-Threatening Emergency? Immediate Help Is Ready.
              </h2>
              
              <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
                If you or someone nearby is experiencing chest pain, stroke symptoms (facial drooping, arm weakness, speech difficulty), severe trauma, or acute breathing distress, call our emergency hotline immediately or dial 911.
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs text-rose-200">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-rose-400" />
                  <span>On-site Board-Certified Emergency Physicians 24/7</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-rose-400" />
                  <span>Entrance: Gate 1, West Campus Blvd</span>
                </div>
              </div>
            </div>

            {/* Direct Call Action Box */}
            <div className="bg-slate-900/90 p-6 rounded-xl border border-rose-500/40 text-center shrink-0 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-rose-300 font-semibold block mb-1">
                24/7 Emergency Hotline
              </span>
              <a
                href={`tel:${HOSPITAL_CONTACT.emergencyHotline.replace(/[^\d]/g, '')}`}
                className="text-2xl sm:text-3xl font-black text-rose-400 hover:text-rose-300 transition-colors font-mono tracking-tight block py-1"
              >
                {HOSPITAL_CONTACT.emergencyHotline}
              </a>
              <span className="text-[11px] text-slate-400 block mt-1">
                Ambulance Dispatch: <strong className="text-slate-200">{HOSPITAL_CONTACT.ambulanceHotline}</strong>
              </span>

              <a
                href={`tel:${HOSPITAL_CONTACT.emergencyHotline.replace(/[^\d]/g, '')}`}
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-xs rounded-lg transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Emergency Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= GENERAL CONTACT & CAMPUS MAP ================= */}
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Hospital Details & Interactive Campus Visualizer (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>Central Hospital Metropolis Campus</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                Visit & Contact Our Medical Center
              </h3>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Campus Address</strong>
                    <span className="text-slate-600">{HOSPITAL_CONTACT.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <Phone className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Main Reception</strong>
                    <span className="text-slate-600">{HOSPITAL_CONTACT.mainReception}</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Appointments: {HOSPITAL_CONTACT.appointmentsDirect}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Operational Hours</strong>
                    <span className="text-slate-600">{HOSPITAL_CONTACT.hours.emergency}</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">{HOSPITAL_CONTACT.hours.outpatientClinics}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <Mail className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">General Inquiries</strong>
                    <span className="text-slate-600">{HOSPITAL_CONTACT.emailInquiries}</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Response within 4 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Campus Map Placeholder & Navigator */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-teal-700" />
                    <span>Interactive Hospital Campus Map</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click a sector to inspect facility access gates, parking, and building entrances.
                  </p>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(HOSPITAL_CONTACT.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Sector Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveZone('er')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer ${
                    activeZone === 'er'
                      ? 'bg-rose-50 border-rose-500 text-rose-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Gate 1: Emergency
                </button>
                <button
                  type="button"
                  onClick={() => setActiveZone('main')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer ${
                    activeZone === 'main'
                      ? 'bg-teal-50 border-teal-600 text-teal-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Gate 2: Main Tower
                </button>
                <button
                  type="button"
                  onClick={() => setActiveZone('outpatient')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer ${
                    activeZone === 'outpatient'
                      ? 'bg-sky-50 border-sky-600 text-sky-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Gate 3: Outpatient
                </button>
                <button
                  type="button"
                  onClick={() => setActiveZone('parking')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer ${
                    activeZone === 'parking'
                      ? 'bg-slate-200 border-slate-600 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Parking Deck P1
                </button>
              </div>

              {/* Styled SVG Campus Blueprint Schematic */}
              <div className="relative aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
                <svg className="w-full h-full max-h-[260px]" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid background lines */}
                  <defs>
                    <pattern id="campus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="800" height="450" fill="url(#campus-grid)" />

                  {/* Campus Roads */}
                  <path d="M 50 225 L 750 225" stroke="#334155" strokeWidth="24" strokeLinecap="round" />
                  <path d="M 220 50 L 220 400" stroke="#334155" strokeWidth="20" strokeLinecap="round" />
                  <path d="M 580 50 L 580 400" stroke="#334155" strokeWidth="20" strokeLinecap="round" />

                  {/* Gate 1: Emergency & Trauma Wing */}
                  <g 
                    onClick={() => setActiveZone('er')} 
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <rect 
                      x="70" y="80" width="120" height="110" rx="8" 
                      fill={activeZone === 'er' ? '#e11d48' : '#881337'} 
                      stroke="#f43f5e" strokeWidth={activeZone === 'er' ? '3' : '1'} 
                    />
                    <text x="130" y="130" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">
                      EMERGENCY
                    </text>
                    <text x="130" y="150" fill="#fecdd3" fontSize="10" textAnchor="middle">
                      Gate 1 · 24/7 ER
                    </text>
                  </g>

                  {/* Gate 2: Main Inpatient Pavilion Tower */}
                  <g 
                    onClick={() => setActiveZone('main')} 
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <rect 
                      x="250" y="60" width="300" height="135" rx="10" 
                      fill={activeZone === 'main' ? '#0d9488' : '#134e4a'} 
                      stroke="#2dd4bf" strokeWidth={activeZone === 'main' ? '3' : '1'} 
                    />
                    <text x="400" y="120" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">
                      MAIN INPATIENT TOWER
                    </text>
                    <text x="400" y="145" fill="#99f6e4" fontSize="11" textAnchor="middle">
                      Gate 2 · Atrium · Surgical Suites · ICU
                    </text>
                  </g>

                  {/* Gate 3: Outpatient Specialty Pavilion */}
                  <g 
                    onClick={() => setActiveZone('outpatient')} 
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <rect 
                      x="610" y="80" width="130" height="110" rx="8" 
                      fill={activeZone === 'outpatient' ? '#0284c7' : '#075985'} 
                      stroke="#38bdf8" strokeWidth={activeZone === 'outpatient' ? '3' : '1'} 
                    />
                    <text x="675" y="130" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">
                      OUTPATIENT
                    </text>
                    <text x="675" y="150" fill="#bae6fd" fontSize="10" textAnchor="middle">
                      Gate 3 · Clinics
                    </text>
                  </g>

                  {/* Diagnostic Wing */}
                  <rect x="250" y="270" width="170" height="110" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                  <text x="335" y="325" fill="#e2e8f0" fontSize="12" fontWeight="600" textAnchor="middle">
                    DIAGNOSTICS & MRI
                  </text>
                  <text x="335" y="345" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    Laboratory · Radiology
                  </text>

                  {/* Parking Deck */}
                  <g 
                    onClick={() => setActiveZone('parking')} 
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <rect 
                      x="450" y="270" width="160" height="110" rx="8" 
                      fill={activeZone === 'parking' ? '#475569' : '#0f172a'} 
                      stroke="#94a3b8" strokeWidth={activeZone === 'parking' ? '3' : '1'} 
                    />
                    <text x="530" y="325" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">
                      PARKING DECK P1/P2
                    </text>
                    <text x="530" y="345" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                      Covered Skybridge to Tower
                    </text>
                  </g>

                  {/* Compass Rose */}
                  <circle cx="740" cy="400" r="16" fill="#1e293b" />
                  <text x="740" y="405" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">N</text>
                </svg>
              </div>

              {/* Active Zone Details Card */}
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h5 className="text-sm font-bold text-slate-900">
                    {campusZones[activeZone].title}
                  </h5>
                  <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                    {campusZones[activeZone].badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  {campusZones[activeZone].description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-200/80">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    {campusZones[activeZone].location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {campusZones[activeZone].hours}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Column 2: General Inquiries Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
              Direct Contact
            </span>
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif] mb-2">
              Send an Inquiry or Question
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Have questions regarding insurance coverage, medical records, or visiting policies? Our patient advocacy team will respond promptly.
            </p>

            {formSubmitted ? (
              <div className="p-6 bg-teal-50 rounded-xl border border-teal-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-teal-950">Inquiry Received</h4>
                <p className="text-xs text-teal-800 leading-relaxed">
                  Thank you, <strong>{inquiryForm.name}</strong>. Your message has been routed to our patient relations department. An officer will reply via email at <strong>{inquiryForm.email}</strong> within 4 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setInquiryForm({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'general',
                      message: '',
                    });
                  }}
                  className="mt-3 text-xs font-semibold text-teal-700 hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs">
                    {formError}
                  </div>
                )}

                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-medium text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="inquiry-email" className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      placeholder="name@domain.com"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 text-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-phone" className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-subject" className="block text-xs font-medium text-slate-700 mb-1">
                    Department or Inquiry Topic
                  </label>
                  <select
                    id="inquiry-subject"
                    value={inquiryForm.subject}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 text-slate-900"
                  >
                    <option value="general">General Patient Inquiries</option>
                    <option value="billing">Billing, Insurance & Estimations</option>
                    <option value="records">Medical Records & Release of Information</option>
                    <option value="feedback">Patient Experience & Quality of Care</option>
                    <option value="careers">Clinical Careers & Nursing Staffing</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="inquiry-message" className="block text-xs font-medium text-slate-700 mb-1">
                    How Can We Assist You? <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={4}
                    placeholder="Type your question or request..."
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Patient Relations Hotline</span>
              <strong className="text-slate-700">{HOSPITAL_CONTACT.mainReception}</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
