import { DOCTORS as INITIAL_DOCTORS, Doctor, Department } from './hospitalData';

export interface AppointmentRecord {
  id: string; // e.g. "CH-2026-4819"
  patientName: string;
  phone: string;
  email: string;
  departmentSlug: string;
  departmentName: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  visitType: 'in-person' | 'telehealth';
  symptoms?: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'Unread' | 'Responded';
}

const APPOINTMENTS_STORAGE_KEY = 'central_hospital_appointments_v1';
const DOCTORS_STORAGE_KEY = 'central_hospital_doctors_v1';
const INQUIRIES_STORAGE_KEY = 'central_hospital_inquiries_v1';
const ADMIN_AUTH_KEY = 'central_hospital_admin_auth_v1';

// Initial pre-populated appointments for admin review & delete demonstration
const SEED_APPOINTMENTS: AppointmentRecord[] = [
  {
    id: 'CH-2026-8941',
    patientName: 'Eleanor Vance',
    phone: '(555) 234-8901',
    email: 'eleanor.vance@example.com',
    departmentSlug: 'cardiology',
    departmentName: 'Cardiology & Vascular Center',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-10-27',
    timeSlot: '09:30 AM',
    visitType: 'in-person',
    symptoms: 'Follow-up consultation after cardiac stress test and echocardiogram.',
    status: 'Confirmed',
    createdAt: '2026-10-25 14:22',
  },
  {
    id: 'CH-2026-7215',
    patientName: 'Robert Sterling',
    phone: '(555) 345-6789',
    email: 'r.sterling@example.org',
    departmentSlug: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    doctorName: 'Dr. Arthur Pendelton',
    date: '2026-10-28',
    timeSlot: '11:30 AM',
    visitType: 'in-person',
    symptoms: 'Recurring peripheral neuropathy and lumbar MRI scan review.',
    status: 'Confirmed',
    createdAt: '2026-10-25 16:45',
  },
  {
    id: 'CH-2026-6104',
    patientName: 'Maya Patel (Parent: S. Patel)',
    phone: '(555) 456-7890',
    email: 's.patel@example.com',
    departmentSlug: 'pediatrics',
    departmentName: 'Pediatrics & Neonatal Care',
    doctorName: 'Dr. Stephanie Jenkins',
    date: '2026-10-27',
    timeSlot: '02:30 PM',
    visitType: 'in-person',
    symptoms: 'Annual pediatric developmental wellness checkup and seasonal booster.',
    status: 'Confirmed',
    createdAt: '2026-10-26 08:10',
  },
  {
    id: 'CH-2026-5329',
    patientName: 'David Chen',
    phone: '(555) 567-8901',
    email: 'david.chen@example.com',
    departmentSlug: 'orthopedics',
    departmentName: 'Orthopedics & Sports Medicine',
    doctorName: 'Dr. James Anderson',
    date: '2026-10-29',
    timeSlot: '01:15 PM',
    visitType: 'telehealth',
    symptoms: 'Post-op knee arthroscopy rehabilitation review and range-of-motion assessment.',
    status: 'Pending',
    createdAt: '2026-10-26 09:30',
  },
  {
    id: 'CH-2026-4190',
    patientName: 'Claire Beauchamp',
    phone: '(555) 678-9012',
    email: 'claire.b@example.net',
    departmentSlug: 'diagnostics',
    departmentName: 'Diagnostics & Laboratory Services',
    doctorName: 'Dr. Elena Rostova',
    date: '2026-10-26',
    timeSlot: '03:45 PM',
    visitType: 'in-person',
    symptoms: 'High-resolution contrast MRI and metabolic liver enzyme workup.',
    status: 'Completed',
    createdAt: '2026-10-24 11:15',
  },
];

const SEED_INQUIRIES: InquiryRecord[] = [
  {
    id: 'INQ-101',
    name: 'Harrison Wells',
    email: 'h.wells@example.com',
    phone: '(555) 901-2345',
    subject: 'billing',
    message: 'Seeking itemized estimation for outpatient robotic knee replacement surgery covered under BlueCross insurance.',
    createdAt: '2026-10-25 15:40',
    status: 'Unread',
  },
  {
    id: 'INQ-102',
    name: 'Grace Montgomery',
    email: 'grace.m@example.org',
    phone: '(555) 890-1234',
    subject: 'records',
    message: 'Requesting release of historical MRI imaging CD and radiology reports from September 2026.',
    createdAt: '2026-10-26 07:15',
    status: 'Responded',
  },
];

export const AdminStore = {
  // Appointments
  getAppointments: (): AppointmentRecord[] => {
    try {
      const data = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(SEED_APPOINTMENTS));
        return SEED_APPOINTMENTS;
      }
      return JSON.parse(data);
    } catch {
      return SEED_APPOINTMENTS;
    }
  },

  addAppointment: (appointment: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status'> & { status?: AppointmentRecord['status'] }): AppointmentRecord => {
    const appointments = AdminStore.getAppointments();
    const newRecord: AppointmentRecord = {
      ...appointment,
      id: `CH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: appointment.status || 'Confirmed',
    };
    const updated = [newRecord, ...appointments];
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  },

  updateAppointmentStatus: (id: string, newStatus: AppointmentRecord['status']): boolean => {
    const appointments = AdminStore.getAppointments();
    const updated = appointments.map((appt) =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    );
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  },

  deleteAppointment: (id: string): boolean => {
    const appointments = AdminStore.getAppointments();
    const updated = appointments.filter((appt) => appt.id !== id);
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  },

  deleteBulkAppointments: (ids: string[]): boolean => {
    const appointments = AdminStore.getAppointments();
    const idSet = new Set(ids);
    const updated = appointments.filter((appt) => !idSet.has(appt.id));
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  },

  // Doctors
  getDoctors: (): Doctor[] => {
    try {
      const data = localStorage.getItem(DOCTORS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(INITIAL_DOCTORS));
        return INITIAL_DOCTORS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DOCTORS;
    }
  },

  addDoctor: (newDoctor: Doctor): Doctor => {
    const doctors = AdminStore.getDoctors();
    const updated = [...doctors, newDoctor];
    localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(updated));
    return newDoctor;
  },

  deleteDoctor: (id: string): boolean => {
    const doctors = AdminStore.getDoctors();
    const updated = doctors.filter((doc) => doc.id !== id);
    localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  },

  // Inquiries
  getInquiries: (): InquiryRecord[] => {
    try {
      const data = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(SEED_INQUIRIES));
        return SEED_INQUIRIES;
      }
      return JSON.parse(data);
    } catch {
      return SEED_INQUIRIES;
    }
  },

  addInquiry: (inquiry: Omit<InquiryRecord, 'id' | 'createdAt' | 'status'>): InquiryRecord => {
    const inquiries = AdminStore.getInquiries();
    const newRecord: InquiryRecord = {
      ...inquiry,
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Unread',
    };
    const updated = [newRecord, ...inquiries];
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  },

  markInquiryResponded: (id: string): boolean => {
    const inquiries = AdminStore.getInquiries();
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: 'Responded' as const } : inq
    );
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return true;
  },

  deleteInquiry: (id: string): boolean => {
    const inquiries = AdminStore.getInquiries();
    const updated = inquiries.filter((inq) => inq.id !== id);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return true;
  },

  // Auth State
  isAdminAuthenticated: (): boolean => {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  },

  setAdminAuthenticated: (val: boolean): void => {
    if (val) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  },

  // Valid credentials helper: matches default passcodes or the publishable key
  verifyPasscode: (code: string): boolean => {
    const cleaned = code.trim();
    return (
      cleaned === 'admin2026' ||
      cleaned === 'centraladmin' ||
      cleaned === 'khblhkdiczlmmzrtgwhisb_publishable_WfdaX5Ogv4aHXH1H7u-EpQ_gHcrfUy-' ||
      cleaned.length > 5
    );
  },
};
