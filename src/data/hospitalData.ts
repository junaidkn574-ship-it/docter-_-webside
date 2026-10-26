export interface Department {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  keyProcedures: string[];
  equipment: string[];
  headOfDepartment: string;
  location: string;
  openHours: string;
  bedCapacity: number;
  emergencyAvailable: boolean;
  phoneExtension: string;
}

export interface Doctor {
  id: string;
  name: string;
  gender: 'female' | 'male';
  specialty: string;
  departmentSlug: string;
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  availableDays: string[];
  nextAvailable: string;
  consultationFee: string;
  image: string;
  bio: string;
  education: string[];
  languages: string[];
  acceptingNewPatients: boolean;
  roomNumber: string;
}

export interface HospitalStat {
  value: string;
  label: string;
  context: string;
}

export const HOSPITAL_STATS: HospitalStat[] = [
  { value: "45+", label: "Years of Excellence", context: "Continuously serving Metropolis since 1981" },
  { value: "280+", label: "Board-Certified Doctors", context: "Top specialists across 35 medical disciplines" },
  { value: "99.4%", label: "Patient Satisfaction", context: "Verified post-discharge patient feedback" },
  { value: "24/7", label: "Level 1 Trauma Care", context: "Under 3-minute average triage response time" },
];

export const DEPARTMENTS: Department[] = [
  {
    id: "dept-emergency",
    name: "Emergency & Trauma Care",
    slug: "emergency-care",
    tagline: "Rapid-response critical care 24 hours a day, 365 days a year.",
    shortDescription: "Immediate life-saving treatment for acute illnesses, cardiac arrests, trauma, and medical crises.",
    fullDescription: "Our Level 1 Trauma Center is equipped with 32 dedicated emergency resuscitation bays, an on-site surgical suite, 64-slice rapid CT scanner, and board-certified emergency medicine physicians on duty around the clock.",
    keyProcedures: [
      "Trauma resuscitation and advanced airway management",
      "Acute myocardial infarction (heart attack) rapid catheterization",
      "Hyperacute stroke thrombolysis and thrombectomy",
      "Pediatric emergency stabilization",
      "Toxicology and poisoning management"
    ],
    equipment: ["Dedicated Emergency CT Suite", "Point-of-Care Ultrasound", "Negative-Pressure Isolation Rooms", "Rapid Hemofiltration Systems"],
    headOfDepartment: "Dr. Marcus Vance, MD, FACEP",
    location: "West Wing, Ground Level (Entrance Gate 1)",
    openHours: "24 Hours / 7 Days",
    bedCapacity: 48,
    emergencyAvailable: true,
    phoneExtension: "Ext. 9110"
  },
  {
    id: "dept-cardiology",
    name: "Cardiology & Vascular Center",
    slug: "cardiology",
    tagline: "Comprehensive cardiovascular screening, intervention, and rehabilitation.",
    shortDescription: "Advanced cardiovascular diagnostics, interventional cardiology, electrophysiology, and open-heart surgeries.",
    fullDescription: "The Heart & Vascular Institute at Central Hospital delivers breakthrough clinical care for complex arrhythmias, coronary artery disease, valve disorders, and heart failure with state-of-the-art hybrid catheterization laboratories.",
    keyProcedures: [
      "Coronary angiography & drug-eluting stent placement",
      "Transcatheter Aortic Valve Replacement (TAVR)",
      "Cardiac electrophysiology & pacemaker/ICD implantation",
      "Minimally invasive bypass grafting",
      "Preventive lipidology and heart failure programs"
    ],
    equipment: ["3D Echocardiography", "Dual-Source Cardiac CT", "Biplane Cath Labs", "Cardiac MRI 3T"],
    headOfDepartment: "Dr. Sarah Jenkins, MD, FACC",
    location: "Heart Center, 3rd Floor (Tower B)",
    openHours: "Mon - Sat: 8:00 AM - 6:00 PM",
    bedCapacity: 64,
    emergencyAvailable: true,
    phoneExtension: "Ext. 3020"
  },
  {
    id: "dept-neurology",
    name: "Neurology & Neurosurgery",
    slug: "neurology",
    tagline: "Pioneering neurological treatments for brain, spine, and peripheral nerve disorders.",
    shortDescription: "Comprehensive care for stroke, epilepsy, neurodegenerative diseases, brain tumors, and spinal pathology.",
    fullDescription: "Central Hospital's Comprehensive Stroke & Spine Institute integrates high-resolution neuro-imaging, intraoperative robotic navigation, and multidisciplinary neuro-rehabilitation to deliver optimal neurological outcomes.",
    keyProcedures: [
      "Endovascular mechanical thrombectomy for acute stroke",
      "Robotic-assisted stereotactic brain biopsy and tumor resection",
      "Deep Brain Stimulation (DBS) for Parkinson's disease",
      "Minimally invasive spine decompression & fusion",
      "Comprehensive epilepsy monitoring and surgical mapping"
    ],
    equipment: ["Intraoperative MRI", "StealthStation Surgical Navigation", "Continuous 64-Channel Video EEG", "Transcranial Doppler"],
    headOfDepartment: "Dr. Arthur Pendelton, MD, FAANS",
    location: "Neuroscience Pavilion, 4th Floor",
    openHours: "Mon - Fri: 8:30 AM - 5:30 PM",
    bedCapacity: 42,
    emergencyAvailable: true,
    phoneExtension: "Ext. 4100"
  },
  {
    id: "dept-pediatrics",
    name: "Pediatrics & Neonatal Care",
    slug: "pediatrics",
    tagline: "Gentle, compassionate medical care for infants, children, and adolescents.",
    shortDescription: "From preventive well-child checkups to Level III Neonatal Intensive Care (NICU) and pediatric subspecialties.",
    fullDescription: "Designed to put young patients and their families at ease, our Pediatric Center provides child-friendly clinical environments, specialized pediatric pharmacology, and family-centered inpatient rooms with continuous support.",
    keyProcedures: [
      "Routine pediatric wellness visits and immunization schedules",
      "Neonatal intensive care for premature and critically ill newborns",
      "Pediatric asthma, allergy, and pulmonary therapies",
      "Pediatric gastroenterology and nutrition counseling",
      "Developmental pediatrics and behavioral milestones screening"
    ],
    equipment: ["Giraffe Omnibed Incubators", "Pediatric Bronchoscopy", "Child-Calibrated Low-Dose X-Ray", "Dedicated Pediatric Triage"],
    headOfDepartment: "Dr. Stephanie Jenkins, MD, FAAP",
    location: "Children's Wing, 2nd Floor",
    openHours: "Mon - Sat: 8:00 AM - 7:00 PM",
    bedCapacity: 38,
    emergencyAvailable: true,
    phoneExtension: "Ext. 2010"
  },
  {
    id: "dept-orthopedics",
    name: "Orthopedics & Sports Medicine",
    slug: "orthopedics",
    tagline: "Restoring movement, strength, and active lifestyles through precision musculoskeletal care.",
    shortDescription: "Joint replacements, sports injury repairs, spinal correction, and advanced orthopedic rehabilitation.",
    fullDescription: "Our board-certified orthopedic surgeons utilize muscle-sparing techniques, Mako robotic arm joint replacements, and individualized physiotherapy protocols to get athletes and active adults back to their peak performance.",
    keyProcedures: [
      "Robotic total knee and total hip arthroplasty",
      "Arthroscopic rotator cuff and labral repairs",
      "ACL and complex knee ligament reconstruction",
      "Complex fracture osteosynthesis and trauma repair",
      "Computerized gait analysis and sports biomechanics"
    ],
    equipment: ["Mako Robotic Arm", "High-Definition 4K Arthroscopy", "Digital Weight-Bearing Radiography", "Isokinetic Muscle Dynamometers"],
    headOfDepartment: "Dr. James Anderson, MD, FAAOS",
    location: "Orthopedic Pavilion, 1st Floor (East Wing)",
    openHours: "Mon - Fri: 8:00 AM - 5:00 PM",
    bedCapacity: 50,
    emergencyAvailable: true,
    phoneExtension: "Ext. 1040"
  },
  {
    id: "dept-diagnostics",
    name: "Diagnostics & Laboratory Services",
    slug: "diagnostics",
    tagline: "High-precision medical imaging, pathology, and rapid clinical diagnostic results.",
    shortDescription: "Accurate laboratory testing, digital 3T MRI, 128-slice CT scans, ultrasound, and molecular pathology.",
    fullDescription: "Accredited by the College of American Pathologists (CAP), our central laboratory operates 24/7, processing over 12,000 specimens weekly with 98% of critical blood panels returned within 45 minutes for rapid clinical decisions.",
    keyProcedures: [
      "High-field 3.0 Tesla MRI (Silent Scan technology)",
      "Low-dose 128-slice multidetector CT angiography",
      "Comprehensive biochemical, metabolic, and hormonal panels",
      "Liquid biopsy and cancer biomarker genomic profiling",
      "Digital mammography with 3D breast tomosynthesis"
    ],
    equipment: ["GE 3.0T SIGNA MRI", "Siemens SOMATOM Force CT", "Roche Cobas 8000 Automation", "Hologic 3D Dimensions Mammography"],
    headOfDepartment: "Dr. Elena Rostova, MD, PhD, FCAP",
    location: "Diagnostic Diagnostic Wing, Ground Level",
    openHours: "24 Hours for Inpatient/ER; Outpatients: 6:30 AM - 8:00 PM",
    bedCapacity: 20,
    emergencyAvailable: true,
    phoneExtension: "Ext. 1010"
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "doc-sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    gender: "female",
    specialty: "Interventional Cardiology",
    departmentSlug: "cardiology",
    qualifications: "MD, FACC, FSCAI",
    experienceYears: 16,
    rating: 4.96,
    reviewCount: 342,
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    nextAvailable: "Today at 2:30 PM",
    consultationFee: "$180",
    image: "/src/assets/images/doctor_cardiology_female_1793013066439.jpg",
    bio: "Chief of Interventional Cardiology with over 4,000 coronary interventions completed. Specializes in complex radial artery catheterization, valvular heart disease, and preventative cardiac care.",
    education: [
      "MD - Johns Hopkins University School of Medicine",
      "Fellowship in Interventional Cardiology - Cleveland Clinic",
      "Residency in Internal Medicine - Massachusetts General Hospital"
    ],
    languages: ["English", "Spanish"],
    acceptingNewPatients: true,
    roomNumber: "Suite 302-A"
  },
  {
    id: "doc-arthur-pendelton",
    name: "Dr. Arthur Pendelton",
    gender: "male",
    specialty: "Neurology & Neurovascular Care",
    departmentSlug: "neurology",
    qualifications: "MD, PhD, FAANS",
    experienceYears: 24,
    rating: 4.98,
    reviewCount: 489,
    availableDays: ["Monday", "Wednesday", "Friday"],
    nextAvailable: "Tomorrow at 10:00 AM",
    consultationFee: "$220",
    image: "/src/assets/images/doctor_neurology_male_1793013066999.jpg",
    bio: "Renowned neurosurgeon and Director of the Comprehensive Stroke Center. Nationally recognized for pioneering minimally invasive cranial approaches and aneurysm coiling therapies.",
    education: [
      "MD & PhD in Neurobiology - Stanford University",
      "Neurosurgical Fellowship - Mayo Clinic Rochester",
      "Chief Resident in Neurosurgery - UCSF Medical Center"
    ],
    languages: ["English", "German", "French"],
    acceptingNewPatients: true,
    roomNumber: "Suite 410-C"
  },
  {
    id: "doc-stephanie-jenkins",
    name: "Dr. Stephanie Jenkins",
    gender: "female",
    specialty: "Pediatric Medicine & Neonatology",
    departmentSlug: "pediatrics",
    qualifications: "MD, FAAP",
    experienceYears: 14,
    rating: 4.94,
    reviewCount: 521,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
    nextAvailable: "Today at 3:15 PM",
    consultationFee: "$150",
    image: "/src/assets/images/doctor_pediatrics_female_1793013082651.jpg",
    bio: "Dedicated pediatric specialist recognized for her empathetic, warm rapport with young children and parents. Focuses on preventative child wellness, pediatric asthma, and early developmental milestones.",
    education: [
      "MD - University of Pennsylvania Perelman School of Medicine",
      "Pediatric Residency - Children's Hospital of Philadelphia (CHOP)",
      "Neonatal Medicine Fellowship - Boston Children's Hospital"
    ],
    languages: ["English", "Spanish", "Portuguese"],
    acceptingNewPatients: true,
    roomNumber: "Suite 201-B"
  },
  {
    id: "doc-james-anderson",
    name: "Dr. James Anderson",
    gender: "male",
    specialty: "Orthopedic Surgery & Sports Medicine",
    departmentSlug: "orthopedics",
    qualifications: "MD, FAAOS",
    experienceYears: 18,
    rating: 4.92,
    reviewCount: 398,
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    nextAvailable: "Wednesday at 9:30 AM",
    consultationFee: "$190",
    image: "/src/assets/images/doctor_orthopedics_male_1793013083114.jpg",
    bio: "Lead Orthopedic Surgeon and team physician for regional collegiate athletics. Specializes in Mako robotic total joint replacement, complex ACL reconstruction, and arthroscopic shoulder repair.",
    education: [
      "MD - Harvard Medical School",
      "Orthopedic Surgery Residency - Hospital for Special Surgery (HSS)",
      "Sports Medicine Fellowship - Steadman Philippon Clinic"
    ],
    languages: ["English"],
    acceptingNewPatients: true,
    roomNumber: "Suite 104-E"
  },
  {
    id: "doc-marcus-vance",
    name: "Dr. Marcus Vance",
    gender: "male",
    specialty: "Emergency Medicine & Trauma",
    departmentSlug: "emergency-care",
    qualifications: "MD, FACEP",
    experienceYears: 19,
    rating: 4.95,
    reviewCount: 610,
    availableDays: ["24/7 ER Rotation"],
    nextAvailable: "On-Duty Now",
    consultationFee: "ER Triage",
    image: "/src/assets/images/doctor_neurology_male_1793013066999.jpg",
    bio: "Director of Emergency Services overseeing Level 1 Trauma operations. Certified in Advanced Trauma Life Support (ATLS) and disaster medicine command.",
    education: [
      "MD - Columbia University College of Physicians and Surgeons",
      "Emergency Medicine Residency - Bellevue Hospital Center, NYC",
      "Fellowship in Critical Care - Northwestern Memorial Hospital"
    ],
    languages: ["English", "Spanish"],
    acceptingNewPatients: true,
    roomNumber: "ER Command Center"
  },
  {
    id: "doc-elena-rostova",
    name: "Dr. Elena Rostova",
    gender: "female",
    specialty: "Clinical Pathology & Diagnostic Imaging",
    departmentSlug: "diagnostics",
    qualifications: "MD, PhD, FCAP",
    experienceYears: 15,
    rating: 4.91,
    reviewCount: 215,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    nextAvailable: "Tomorrow at 11:30 AM",
    consultationFee: "$160",
    image: "/src/assets/images/doctor_cardiology_female_1793013066439.jpg",
    bio: "Head of Diagnostic Laboratory and Clinical Pathology. Renowned for precision oncology biomarker testing and ultra-low dose volumetric imaging protocols.",
    education: [
      "MD & PhD in Molecular Pathology - Cornell Weill Medicine",
      "Pathology Residency - Memorial Sloan Kettering Cancer Center",
      "Diagnostic Fellowship - Brigham and Women's Hospital"
    ],
    languages: ["English", "Russian"],
    acceptingNewPatients: true,
    roomNumber: "Diag-Lab Suite 10"
  }
];

export const HOSPITAL_CONTACT = {
  name: "Central Hospital",
  tagline: "Premier Healthcare & Level 1 Trauma Center",
  emergencyHotline: "(800) 456-7890",
  emergencyDirectDial: "tel:8004567890",
  ambulanceHotline: "(800) 456-9911",
  mainReception: "(800) 456-7000",
  appointmentsDirect: "(800) 456-7020",
  emailInquiries: "care@centralhospital.org",
  appointmentsEmail: "appointments@centralhospital.org",
  address: "450 Central Medical Center Blvd, Metropolis, NY 10021",
  coordinates: { lat: 40.7614, lng: -73.9776 },
  hours: {
    emergency: "Open 24 Hours / 7 Days a Week",
    outpatientClinics: "Monday - Saturday: 7:30 AM - 7:30 PM",
    laboratory: "24 Hours (Outpatient: 6:30 AM - 8:00 PM)",
    pharmacy: "Open 24 Hours on Ground Floor",
    visitingHours: "Daily: 9:00 AM - 8:30 PM"
  }
};
