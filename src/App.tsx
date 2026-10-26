import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { FindDoctorSection } from './components/FindDoctorSection';
import { AppointmentBookingSection } from './components/AppointmentBookingSection';
import { EmergencyContactSection } from './components/EmergencyContactSection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { Phone, Calendar, Shield } from 'lucide-react';
import { HOSPITAL_CONTACT } from './data/hospitalData';

export default function App() {
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string | undefined>(undefined);
  const [selectedDeptForBooking, setSelectedDeptForBooking] = useState<string | undefined>(undefined);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [dataVersion, setDataVersion] = useState(1);

  const handleDataChanged = () => {
    setDataVersion((v) => v + 1);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (doctorName?: string, departmentSlug?: string) => {
    setSelectedDoctorForBooking(doctorName);
    setSelectedDeptForBooking(departmentSlug);
    scrollToSection('appointment');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-800">
      {/* Navigation Header */}
      <Header 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreDoctors={() => scrollToSection('doctors')}
          onExploreServices={() => scrollToSection('services')}
          onExploreEmergency={() => scrollToSection('emergency')}
        />

        {/* About Us & Clinical Excellence Section */}
        <AboutSection 
          onOpenBooking={() => handleOpenBooking()} 
        />

        {/* Core Medical Services Section */}
        <ServicesSection 
          onOpenBooking={handleOpenBooking} 
        />

        {/* Find a Doctor Section */}
        <FindDoctorSection 
          onOpenBooking={handleOpenBooking} 
          dataVersion={dataVersion}
        />

        {/* Interactive Appointment Booking Form (with Patient Self-Service Cancel/Delete) */}
        <AppointmentBookingSection
          initialDoctorName={selectedDoctorForBooking}
          initialDepartmentSlug={selectedDeptForBooking}
          onDataChanged={handleDataChanged}
          onClearInitial={() => {
            setSelectedDoctorForBooking(undefined);
            setSelectedDeptForBooking(undefined);
          }}
        />

        {/* Emergency Callout & Contact / Campus Map Section */}
        <EmergencyContactSection onDataChanged={handleDataChanged} />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={handleOpenBooking} 
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      {/* Admin Portal Console Overlay */}
      {isAdminPortalOpen && (
        <AdminPortal 
          onClose={() => setIsAdminPortalOpen(false)}
          onDataChanged={handleDataChanged}
        />
      )}

      {/* Mobile Floating Sticky Quick Action Bar (Under 15% Viewport Cap) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 z-30 flex items-center gap-2 shadow-lg">
        <a
          href={`tel:${HOSPITAL_CONTACT.emergencyHotline.replace(/[^\d]/g, '')}`}
          className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2 bg-rose-600 text-white rounded-lg text-xs font-bold"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call ER</span>
        </a>
        <button
          type="button"
          onClick={() => handleOpenBooking()}
          className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2 bg-teal-600 text-white rounded-lg text-xs font-bold"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </button>
        <button
          type="button"
          onClick={() => setIsAdminPortalOpen(true)}
          className="p-2 bg-slate-900 text-teal-400 rounded-lg text-xs font-bold shrink-0"
          title="Admin Console"
        >
          <Shield className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
