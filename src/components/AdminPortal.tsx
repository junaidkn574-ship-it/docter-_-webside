import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldAlert, 
  Trash2, 
  Search, 
  Calendar, 
  UserCheck, 
  Mail, 
  CheckCircle, 
  Clock, 
  LogOut, 
  ArrowLeft, 
  Download, 
  Plus, 
  X, 
  AlertTriangle, 
  UserPlus, 
  RefreshCw,
  Building,
  Video,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import { 
  AdminStore, 
  AppointmentRecord, 
  InquiryRecord 
} from '../data/adminStore';
import { DEPARTMENTS, Doctor } from '../data/hospitalData';

interface AdminPortalProps {
  onClose: () => void;
  onDataChanged?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose, onDataChanged }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => AdminStore.isAdminAuthenticated());
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'appointments' | 'doctors' | 'inquiries' | 'analytics'>('appointments');

  // Loaded Data
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');

  // Selection for bulk delete
  const [selectedAppointmentIds, setSelectedAppointmentIds] = useState<string[]>([]);

  // Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'appointment' | 'bulk_appointments' | 'doctor' | 'inquiry';
    id?: string;
    name?: string;
  } | null>(null);

  // Add Doctor Modal State
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [newDoctorForm, setNewDoctorForm] = useState({
    name: '',
    specialty: '',
    departmentSlug: 'cardiology',
    qualifications: 'MD, Board Certified',
    experienceYears: 10,
    consultationFee: '$180',
    roomNumber: 'Suite 305',
    bio: '',
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAllData = () => {
    const appts = AdminStore.getAppointments();
    const docs = AdminStore.getDoctors();
    const inqs = AdminStore.getInquiries();
    setAppointments(appts);
    setDoctors(docs);
    setInquiries(inqs);
    if (onDataChanged) onDataChanged();
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  // Auth Handler
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (AdminStore.verifyPasscode(passcode)) {
      AdminStore.setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
      loadAllData();
    } else {
      setAuthError('Invalid Admin Passcode or Key. Please check your credentials or click Quick Demo Access.');
    }
  };

  const handleQuickDemoAccess = () => {
    AdminStore.setAdminAuthenticated(true);
    setIsAuthenticated(true);
    setAuthError('');
    loadAllData();
  };

  const handleLogout = () => {
    AdminStore.setAdminAuthenticated(false);
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Status Change Handler
  const handleStatusChange = (id: string, status: AppointmentRecord['status']) => {
    AdminStore.updateAppointmentStatus(id, status);
    loadAllData();
    showToast(`Appointment ${id} status updated to ${status}.`);
  };

  // Perform Delete after confirmation
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'appointment' && deleteTarget.id) {
      AdminStore.deleteAppointment(deleteTarget.id);
      setSelectedAppointmentIds((prev) => prev.filter((i) => i !== deleteTarget.id));
      showToast(`Appointment ${deleteTarget.id} permanently deleted.`);
    } else if (deleteTarget.type === 'bulk_appointments') {
      AdminStore.deleteBulkAppointments(selectedAppointmentIds);
      const count = selectedAppointmentIds.length;
      setSelectedAppointmentIds([]);
      showToast(`${count} appointments permanently deleted.`);
    } else if (deleteTarget.type === 'doctor' && deleteTarget.id) {
      AdminStore.deleteDoctor(deleteTarget.id);
      showToast(`Doctor record ${deleteTarget.name || deleteTarget.id} deleted.`);
    } else if (deleteTarget.type === 'inquiry' && deleteTarget.id) {
      AdminStore.deleteInquiry(deleteTarget.id);
      showToast(`Inquiry deleted.`);
    }

    setDeleteTarget(null);
    loadAllData();
  };

  // Add Doctor Form Submit
  const handleAddDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctorForm.name.trim() || !newDoctorForm.specialty.trim()) {
      return;
    }

    const docRecord: Doctor = {
      id: `doc-${Date.now()}`,
      name: newDoctorForm.name,
      gender: 'male',
      specialty: newDoctorForm.specialty,
      departmentSlug: newDoctorForm.departmentSlug,
      qualifications: newDoctorForm.qualifications,
      experienceYears: Number(newDoctorForm.experienceYears) || 5,
      rating: 4.9,
      reviewCount: 45,
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      nextAvailable: 'Available This Week',
      consultationFee: newDoctorForm.consultationFee,
      image: '/src/assets/images/doctor_neurology_male_1793013066999.jpg',
      bio: newDoctorForm.bio || `Specialist in ${newDoctorForm.specialty} at Central Hospital.`,
      education: ['Medical Board Certified Specialist', 'Central Medical Academic Faculty'],
      languages: ['English'],
      acceptingNewPatients: true,
      roomNumber: newDoctorForm.roomNumber,
    };

    AdminStore.addDoctor(docRecord);
    setIsAddDoctorOpen(false);
    setNewDoctorForm({
      name: '',
      specialty: '',
      departmentSlug: 'cardiology',
      qualifications: 'MD, Board Certified',
      experienceYears: 10,
      consultationFee: '$180',
      roomNumber: 'Suite 305',
      bio: '',
    });
    loadAllData();
    showToast(`Dr. ${docRecord.name} added to hospital faculty.`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Booking ID', 'Patient Name', 'Phone', 'Email', 'Department', 'Doctor', 'Date', 'Time Slot', 'Format', 'Status'];
    const rows = appointments.map((a) => [
      a.id,
      `"${a.patientName}"`,
      `"${a.phone}"`,
      `"${a.email}"`,
      `"${a.departmentName}"`,
      `"${a.doctorName}"`,
      a.date,
      a.timeSlot,
      a.visitType,
      a.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `central_hospital_appointments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Appointments CSV exported successfully.');
  };

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const matchQuery =
        appt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.phone.includes(searchQuery) ||
        appt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.doctorName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || appt.status.toLowerCase() === statusFilter.toLowerCase();
      const matchDept = deptFilter === 'all' || appt.departmentSlug === deptFilter;

      return matchQuery && matchStatus && matchDept;
    });
  }, [appointments, searchQuery, statusFilter, deptFilter]);

  // If not authenticated, render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-8 relative animate-in zoom-in-95 duration-150">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 bg-slate-900 text-teal-400 rounded-xl flex items-center justify-center mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
            Hospital Operations
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] mt-0.5">
            Admin & Staff Portal
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Authenticate to access patient appointments, manage doctors, review inquiries, and exercise delete privileges.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {authError && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
                {authError}
              </div>
            )}

            <div>
              <label htmlFor="admin-passcode-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Passcode or Auth Key
              </label>
              <input
                id="admin-passcode-input"
                type="password"
                placeholder="Enter admin passcode (e.g. admin2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 text-slate-900"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Default: <code className="bg-slate-100 px-1 rounded text-slate-600">admin2026</code> or your publishable key
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              Sign In to Admin Console
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleQuickDemoAccess}
              className="w-full py-2.5 px-4 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs rounded-xl transition-colors border border-teal-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-teal-600" />
              <span>One-Click Quick Admin Demo Access</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 overflow-y-auto flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="bg-slate-900 text-white px-4 sm:px-8 py-3.5 border-b border-slate-800 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
              CH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold font-['Outfit',sans-serif]">
                  Central Hospital Admin Console
                </h1>
                <span className="text-[11px] bg-teal-950 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded font-mono">
                  Full Delete Privileges
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block">
                Logged in as Clinical Operations Director
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-teal-400" />
              <span>Back to Public Website</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Nav Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2">
          <button
            type="button"
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-teal-50 text-teal-800 border border-teal-200'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Appointments</span>
            <span className="bg-teal-100 text-teal-800 text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-bold">
              {appointments.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('doctors')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'doctors'
                ? 'bg-teal-50 text-teal-800 border border-teal-200'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 text-teal-600" />
            <span>Doctor Directory</span>
            <span className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-bold">
              {doctors.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-teal-50 text-teal-800 border border-teal-200'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4 text-teal-600" />
            <span>Patient Inquiries</span>
            <span className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-bold">
              {inquiries.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-teal-50 text-teal-800 border border-teal-200'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-600" />
            <span>Overview & Reports</span>
          </button>
        </div>
      </div>

      {/* Main Admin View Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        
        {/* ================= 1. APPOINTMENTS TAB ================= */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            
            {/* Header & Bulk Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Patient Appointments Management
                </h2>
                <p className="text-xs text-slate-500">
                  Review booked appointments, update clinical visit statuses, and execute deletions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {selectedAppointmentIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setDeleteTarget({ type: 'bulk_appointments' })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Selected ({selectedAppointmentIds.length})</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by patient, ID, phone, or doctor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 text-slate-900"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none text-slate-800"
                >
                  <option value="all">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {/* Department Filter */}
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none text-slate-800"
                >
                  <option value="all">All Departments</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                      <th className="p-3 w-10">
                        <input
                          type="checkbox"
                          checked={
                            filteredAppointments.length > 0 &&
                            selectedAppointmentIds.length === filteredAppointments.length
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAppointmentIds(filteredAppointments.map((a) => a.id));
                            } else {
                              setSelectedAppointmentIds([]);
                            }
                          }}
                          className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        />
                      </th>
                      <th className="p-3">Reference ID</th>
                      <th className="p-3">Patient & Contact</th>
                      <th className="p-3">Department & Doctor</th>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Delete & Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={selectedAppointmentIds.includes(appt.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedAppointmentIds((prev) => [...prev, appt.id]);
                                } else {
                                  setSelectedAppointmentIds((prev) =>
                                    prev.filter((i) => i !== appt.id)
                                  );
                                }
                              }}
                              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                          </td>
                          <td className="p-3 font-mono font-bold text-teal-800">
                            {appt.id}
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-slate-900">{appt.patientName}</div>
                            <div className="text-slate-500 text-[11px]">{appt.phone}</div>
                            <div className="text-slate-400 text-[11px] truncate max-w-[180px]">{appt.email}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-slate-800">{appt.departmentName}</div>
                            <div className="text-slate-500 text-[11px]">{appt.doctorName}</div>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <div className="font-semibold text-slate-900">{appt.date}</div>
                            <div className="text-slate-500 text-[11px]">{appt.timeSlot}</div>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-700">
                              {appt.visitType === 'in-person' ? (
                                <>
                                  <Building className="w-3 h-3 text-teal-600" />
                                  <span>In-Person</span>
                                </>
                              ) : (
                                <>
                                  <Video className="w-3 h-3 text-teal-600" />
                                  <span>Telehealth</span>
                                </>
                              )}
                            </span>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <select
                              value={appt.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  appt.id,
                                  e.target.value as AppointmentRecord['status']
                                )
                              }
                              className={`px-2 py-1 text-[11px] font-semibold rounded border cursor-pointer ${
                                appt.status === 'Confirmed'
                                  ? 'bg-teal-50 border-teal-200 text-teal-800'
                                  : appt.status === 'Pending'
                                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                                  : appt.status === 'Completed'
                                  ? 'bg-sky-50 border-sky-200 text-sky-800'
                                  : 'bg-rose-50 border-rose-200 text-rose-800'
                              }`}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3 text-right whitespace-nowrap">
                            {/* DELETE BUTTON */}
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget({
                                  type: 'appointment',
                                  id: appt.id,
                                  name: `${appt.id} (${appt.patientName})`,
                                })
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                              title="Delete this appointment"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500">
                          No appointments match the current search/filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= 2. DOCTORS TAB ================= */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Faculty & Specialist Management
                </h2>
                <p className="text-xs text-slate-500">
                  Add new doctors to the hospital directory or remove inactive physicians using the Delete option.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddDoctorOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add New Doctor</span>
              </button>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-14 h-14 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                        {doc.specialty}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 truncate mt-1">
                        {doc.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 truncate">{doc.qualifications}</p>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Clinic Room: {doc.roomNumber}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Fee: {doc.consultationFee}
                    </span>

                    {/* DELETE DOCTOR BUTTON */}
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          type: 'doctor',
                          id: doc.id,
                          name: doc.name,
                        })
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                      title={`Delete ${doc.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Doctor</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 3. PATIENT INQUIRIES TAB ================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Contact & Patient Inquiries
                </h2>
                <p className="text-xs text-slate-500">
                  Messages submitted by patients through the website contact form.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                        <span className="text-slate-400 text-xs">·</span>
                        <span className="text-xs text-slate-500">{inq.email}</span>
                        {inq.phone && (
                          <>
                            <span className="text-slate-400 text-xs">·</span>
                            <span className="text-xs text-slate-500">{inq.phone}</span>
                          </>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ml-2 ${
                            inq.status === 'Responded'
                              ? 'bg-teal-50 text-teal-800'
                              : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                        {inq.message}
                      </p>
                      <span className="text-[10px] text-slate-400 block">
                        Received on: {inq.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {inq.status === 'Unread' && (
                        <button
                          type="button"
                          onClick={() => {
                            AdminStore.markInquiryResponded(inq.id);
                            loadAllData();
                            showToast('Inquiry marked as responded.');
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg cursor-pointer"
                        >
                          Mark Responded
                        </button>
                      )}

                      {/* DELETE INQUIRY BUTTON */}
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: 'inquiry',
                            id: inq.id,
                            name: `Inquiry from ${inq.name}`,
                          })
                        }
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
                  No patient inquiries found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 4. ANALYTICS & OVERVIEW TAB ================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                Hospital Clinical Metrics & Reports
              </h2>
              <p className="text-xs text-slate-500">
                Live scheduling statistics and operational controls.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Total Bookings</span>
                <div className="text-3xl font-extrabold text-teal-700 font-mono mt-1">
                  {appointments.length}
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">Stored in local database</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Active Specialists</span>
                <div className="text-3xl font-extrabold text-slate-900 font-mono mt-1">
                  {doctors.length}
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">Across 6 departments</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Pending Inquiries</span>
                <div className="text-3xl font-extrabold text-amber-600 font-mono mt-1">
                  {inquiries.filter((i) => i.status === 'Unread').length}
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">Require triage response</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Confirmed Patients</span>
                <div className="text-3xl font-extrabold text-sky-700 font-mono mt-1">
                  {appointments.filter((a) => a.status === 'Confirmed').length}
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">Ready for admission</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Data Maintenance & Reset
              </h3>
              <p className="text-xs text-slate-600">
                Need to reset demo records to initial hospital baseline data? This will repopulate the default sample appointments and doctors.
              </p>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('central_hospital_appointments_v1');
                  localStorage.removeItem('central_hospital_doctors_v1');
                  localStorage.removeItem('central_hospital_inquiries_v1');
                  loadAllData();
                  showToast('Database reset to initial hospital seed records.');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Demo Records</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4 border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
              Confirm Deletion
            </h3>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Are you sure you want to delete{' '}
              <strong className="text-slate-900">
                {deleteTarget.type === 'bulk_appointments'
                  ? `${selectedAppointmentIds.length} selected appointments`
                  : deleteTarget.name || deleteTarget.id}
              </strong>
              ? This action will permanently erase the record from the hospital system.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm & Permanently Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD DOCTOR MODAL ================= */}
      {isAddDoctorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                Add New Doctor to Faculty
              </h3>
              <button
                type="button"
                onClick={() => setIsAddDoctorOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDoctorSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Doctor Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Jennifer Adams"
                  value={newDoctorForm.name}
                  onChange={(e) => setNewDoctorForm({ ...newDoctorForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Specialty *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pediatric Cardiology"
                    value={newDoctorForm.specialty}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, specialty: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={newDoctorForm.departmentSlug}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, departmentSlug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.slug}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Years Exp.</label>
                  <input
                    type="number"
                    value={newDoctorForm.experienceYears}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, experienceYears: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Consult Fee</label>
                  <input
                    type="text"
                    value={newDoctorForm.consultationFee}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, consultationFee: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clinic Room</label>
                  <input
                    type="text"
                    value={newDoctorForm.roomNumber}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, roomNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Qualifications</label>
                <input
                  type="text"
                  value={newDoctorForm.qualifications}
                  onChange={(e) => setNewDoctorForm({ ...newDoctorForm, qualifications: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brief Bio</label>
                <textarea
                  rows={2}
                  value={newDoctorForm.bio}
                  onChange={(e) => setNewDoctorForm({ ...newDoctorForm, bio: e.target.value })}
                  placeholder="Specialist clinical focus and background..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDoctorOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                >
                  Save & Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
