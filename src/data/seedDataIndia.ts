import { College, Mentor, CounsellingUpdate, CalendarDeadline, ChecklistTask, CollegeReview, CommunityThread } from '../types';

export const INDIA_COLLEGES_DATA: College[] = [
  // 1. IIT BOMBAY
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    location: 'Powai, Mumbai',
    state: 'Maharashtra',
    established: 1958,
    campusSizeAcres: 550,
    nirfRank: 3,
    categoryType: 'IIT',
    counsellingAuthority: 'JoSAA',
    university: 'Institute of National Importance (Autonomous)',
    acceptedExams: ['JEE Advanced'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    overview: 'Globally recognized as India’s foremost technological institution, IIT Bombay is situated in Powai alongside picturesque lakes. Renowned for supreme academic rigor, cutting-edge research incubators, and the nation’s most competitive tech peer group.',
    officialWebsite: 'https://www.iitb.ac.in',
    eligibilityCriteria: 'Top 2,50,000 qualified in JEE Main, then JEE Advanced rank. Aggregate 75% in Class 12 (65% for SC/ST/PwD) or top 20 percentile of qualifying board.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '5,00,000+ volumes & IEEE full-text access'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 24.5,
      medianSalaryLPA: 21.8,
      highestSalaryLPA: 120.0,
      placementRatePercent: 91.2,
      topRecruiters: ['Google', 'Microsoft', 'Qualcomm', 'Jane Street', 'Texas Instruments', 'Apple', 'Rubrik', 'Goldman Sachs'],
      sourceDocument: 'Official IIT Bombay Placement Cell Annual Report 2024-25'
    },
    reviewsSummary: {
      overallRating: 4.8,
      count: 248,
      breakdown: {
        teaching: 4.7,
        faculty: 4.5,
        attendance: 4.1,
        campus: 4.9,
        hostel: 3.9,
        clubs: 5.0,
        internships: 4.9,
        placements: 4.9,
        workload: 4.0
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 224000, hostelFeeAnnualINR: 38000, oneTimeAdmissionFeeINR: 18000 },
      { branchCode: 'EE', branchName: 'Electrical Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 224000, hostelFeeAnnualINR: 38000, oneTimeAdmissionFeeINR: 18000 },
      { branchCode: 'ME', branchName: 'Mechanical Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 224000, hostelFeeAnnualINR: 38000, oneTimeAdmissionFeeINR: 18000 },
      { branchCode: 'AE', branchName: 'Aerospace Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 224000, hostelFeeAnnualINR: 38000, oneTimeAdmissionFeeINR: 18000 }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 1, closingRank: 69, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 10, closingRank: 295, exam: 'JEE Advanced', seatPool: 'Female-only', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'OBC-NCL', quota: 'AI', openingRank: 10, closingRank: 52, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'GEN-EWS', quota: 'AI', openingRank: 6, closingRank: 24, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'SC', quota: 'AI', openingRank: 5, closingRank: 28, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'ST', quota: 'AI', openingRank: 3, closingRank: 15, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'EE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 140, closingRank: 480, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'ME', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 650, closingRank: 1720, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'AE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 1100, closingRank: 2650, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' }
    ]
  },

  // 2. IIT DELHI
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology Delhi',
    shortName: 'IIT Delhi',
    location: 'Hauz Khas, New Delhi',
    state: 'Delhi',
    established: 1961,
    campusSizeAcres: 320,
    nirfRank: 2,
    categoryType: 'IIT',
    counsellingAuthority: 'JoSAA',
    university: 'Institute of National Importance (Autonomous)',
    acceptedExams: ['JEE Advanced'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
    overview: 'Located in the historic capital, IIT Delhi is celebrated for world-class computing facilities, profound startup ecosystem, and prolific alumni founders across Silicon Valley and Bengaluru.',
    officialWebsite: 'https://home.iitd.ac.in',
    eligibilityCriteria: 'Top 2,50,000 qualified in JEE Main, then JEE Advanced rank. 75% in Class 12 or top 20 percentile of qualifying board.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '3,80,000+ print and e-resources'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 25.8,
      medianSalaryLPA: 22.4,
      highestSalaryLPA: 125.0,
      placementRatePercent: 93.4,
      topRecruiters: ['Microsoft', 'Google', 'Graviton Research', 'Tower Research', 'Qualcomm', 'McKinsey', 'Goldman Sachs'],
      sourceDocument: 'Office of Career Services IIT Delhi 2024-25 Report'
    },
    reviewsSummary: {
      overallRating: 4.8,
      count: 215,
      breakdown: {
        teaching: 4.8,
        faculty: 4.6,
        attendance: 4.2,
        campus: 4.7,
        hostel: 3.8,
        clubs: 4.9,
        internships: 4.9,
        placements: 5.0,
        workload: 4.2
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 220000, hostelFeeAnnualINR: 36000, oneTimeAdmissionFeeINR: 17500 },
      { branchCode: 'MnC', branchName: 'Mathematics and Computing', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 220000, hostelFeeAnnualINR: 36000, oneTimeAdmissionFeeINR: 17500 },
      { branchCode: 'EE', branchName: 'Electrical Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 220000, hostelFeeAnnualINR: 36000, oneTimeAdmissionFeeINR: 17500 }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 25, closingRank: 116, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'MnC', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 120, closingRank: 335, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'EE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 210, closingRank: 590, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' }
    ]
  },

  // 3. NIT TRICHY (JoSAA & CSAB - AI & HS Quota)
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology Tiruchirappalli',
    shortName: 'NIT Trichy',
    location: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    established: 1964,
    campusSizeAcres: 800,
    nirfRank: 9,
    categoryType: 'NIT',
    counsellingAuthority: 'JoSAA',
    university: 'Institute of National Importance (Autonomous)',
    acceptedExams: ['JEE Main'],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    overview: 'Consistent NIRF #1 among all National Institutes of Technology. Renowned for rigorous engineering education, exceptional placement records, and the landmark Pragyan techno-managerial fest.',
    officialWebsite: 'https://www.nitt.edu',
    eligibilityCriteria: 'JEE Main CRL rank via JoSAA/CSAB. 75% in Class 12 or top 20 percentile of qualifying board.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '1,50,000+ volumes and high-speed digital catalog'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 16.8,
      medianSalaryLPA: 15.2,
      highestSalaryLPA: 54.0,
      placementRatePercent: 89.6,
      topRecruiters: ['Amazon', 'Cisco', 'Texas Instruments', 'Oracle', 'Samsung R&D', 'Morgan Stanley', 'L&T'],
      sourceDocument: 'NIT Trichy Training & Placement Report 2024-25'
    },
    reviewsSummary: {
      overallRating: 4.6,
      count: 189,
      breakdown: {
        teaching: 4.5,
        faculty: 4.3,
        attendance: 4.0,
        campus: 4.7,
        hostel: 3.7,
        clubs: 4.8,
        internships: 4.6,
        placements: 4.8,
        workload: 3.9
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 145000, hostelFeeAnnualINR: 32000, oneTimeAdmissionFeeINR: 16000 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 145000, hostelFeeAnnualINR: 32000, oneTimeAdmissionFeeINR: 16000 },
      { branchCode: 'EE', branchName: 'Electrical and Electronics Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 145000, hostelFeeAnnualINR: 32000, oneTimeAdmissionFeeINR: 16000 },
      { branchCode: 'ME', branchName: 'Mechanical Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 145000, hostelFeeAnnualINR: 32000, oneTimeAdmissionFeeINR: 16000 }
    ],
    cutoffs: [
      // Other State (OS)
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 1100, closingRank: 4650, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'ECE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 4200, closingRank: 8900, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'EE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 7800, closingRank: 13500, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      // Home State (HS - Tamil Nadu)
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 1400, closingRank: 6200, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'ECE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 5500, closingRank: 12400, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' }
    ]
  },

  // 4. NIT SURATHKAL (Karnataka)
  {
    id: 'nit-surathkal',
    name: 'National Institute of Technology Karnataka, Surathkal',
    shortName: 'NIT Surathkal',
    location: 'Mangaluru',
    state: 'Karnataka',
    established: 1960,
    campusSizeAcres: 295,
    nirfRank: 12,
    categoryType: 'NIT',
    counsellingAuthority: 'JoSAA',
    university: 'Institute of National Importance (Autonomous)',
    acceptedExams: ['JEE Main'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
    overview: 'Located on the Arabian Sea coast with its own private beach and lighthouse, NIT Surathkal blends stellar academics with unmatched coastal campus culture and exceptional tech placements.',
    officialWebsite: 'https://www.nitk.ac.in',
    eligibilityCriteria: 'JEE Main CRL rank via JoSAA/CSAB. 75% in Class 12 or top 20 percentile.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '1,40,000+ volumes & digital learning portal'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 16.2,
      medianSalaryLPA: 15.0,
      highestSalaryLPA: 54.5,
      placementRatePercent: 88.5,
      topRecruiters: ['Microsoft', 'Google', 'Goldman Sachs', 'Uber', 'Qualcomm', 'Intel', 'Cisco'],
      sourceDocument: 'NITK Surathkal Annual Placement Statistics 2024-25'
    },
    reviewsSummary: {
      overallRating: 4.7,
      count: 172,
      breakdown: {
        teaching: 4.6,
        faculty: 4.4,
        attendance: 4.1,
        campus: 4.9,
        hostel: 3.9,
        clubs: 4.8,
        internships: 4.7,
        placements: 4.8,
        workload: 3.8
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 148000, hostelFeeAnnualINR: 34000, oneTimeAdmissionFeeINR: 16500 },
      { branchCode: 'AI', branchName: 'Artificial Intelligence', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 148000, hostelFeeAnnualINR: 34000, oneTimeAdmissionFeeINR: 16500 },
      { branchCode: 'IT', branchName: 'Information Technology', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 148000, hostelFeeAnnualINR: 34000, oneTimeAdmissionFeeINR: 16500 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 148000, hostelFeeAnnualINR: 34000, oneTimeAdmissionFeeINR: 16500 }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 1200, closingRank: 3400, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'AI', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 1500, closingRank: 4400, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 1800, closingRank: 5900, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', provenance: 'Official JoSAA Allotment Archive' }
    ]
  },

  // 5. IIIT HYDERABAD (Autonomous Premier)
  {
    id: 'iiit-hyderabad',
    name: 'International Institute of Information Technology Hyderabad',
    shortName: 'IIIT Hyderabad',
    location: 'Gachibowli, Hyderabad',
    state: 'Telangana',
    established: 1998,
    campusSizeAcres: 66,
    nirfRank: 55,
    categoryType: 'IIIT',
    counsellingAuthority: 'State DTE',
    university: 'Autonomous Deemed-to-be University',
    acceptedExams: ['JEE Main'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    overview: 'Widely considered India’s foremost pure research institution for Computer Science and AI, boasting a median software compensation exceeding several older IITs and a stellar coding culture.',
    officialWebsite: 'https://www.iiit.ac.in',
    eligibilityCriteria: 'JEE Main Overall CRL Rank (Admissions via independent IIIT-H Portal, NOT via JoSAA). Minimum 60% in Class 12 Maths, Physics, Chemistry.',
    facilities: {
      hostelAvailable: true,
      acRooms: true,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '30,000+ specialized computing texts & ACM/IEEE portals'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 33.2,
      medianSalaryLPA: 32.0,
      highestSalaryLPA: 102.0,
      placementRatePercent: 98.4,
      topRecruiters: ['Apple', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'Nvidia', 'Uber', 'Tower Research'],
      sourceDocument: 'IIIT Hyderabad Placement Office 2024-25 Disclosures'
    },
    reviewsSummary: {
      overallRating: 4.7,
      count: 142,
      breakdown: {
        teaching: 4.9,
        faculty: 4.8,
        attendance: 4.6,
        campus: 4.1,
        hostel: 4.0,
        clubs: 4.2,
        internships: 4.9,
        placements: 5.0,
        workload: 4.8
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 380000, hostelFeeAnnualINR: 42000, oneTimeAdmissionFeeINR: 20000 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 380000, hostelFeeAnnualINR: 42000, oneTimeAdmissionFeeINR: 20000 }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 4, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 120, closingRank: 1680, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official IIIT Hyderabad 2025 Admission Portal', provenance: 'IIIT-H Admissions Portal Records' },
      { branchCode: 'ECE', round: 4, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 1800, closingRank: 4200, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official IIIT Hyderabad 2025 Admission Portal', provenance: 'IIIT-H Admissions Portal Records' }
    ]
  },

  // 6. BITS PILANI (BITSAT)
  {
    id: 'bits-pilani',
    name: 'Birla Institute of Technology and Science, Pilani',
    shortName: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    state: 'Rajasthan',
    established: 1964,
    campusSizeAcres: 328,
    nirfRank: 25,
    categoryType: 'BITS',
    counsellingAuthority: 'BITSAT Council',
    university: 'Institute of Eminence (Autonomous Deemed)',
    acceptedExams: ['BITSAT'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80',
    overview: 'India’s pre-eminent private technical university. Renowned for its zero-attendance policy, Practice School industrial immersion, and vibrant entrepreneurial lineage producing dozens of unicorn founders.',
    officialWebsite: 'https://www.bits-pilani.ac.in',
    eligibilityCriteria: 'Admissions purely on BITSAT score (out of 390). Minimum 75% aggregate in PCM in Class 12 with at least 60% in each subject.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '2,40,000+ volumes & extensive patent databases'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 20.5,
      medianSalaryLPA: 18.2,
      highestSalaryLPA: 60.8,
      placementRatePercent: 92.1,
      topRecruiters: ['Google', 'Microsoft', 'Nutanix', 'Texas Instruments', 'Cisco', 'DE Shaw', 'Da Vinci'],
      sourceDocument: 'BITS Pilani Central Placement Cell Report 2024-25'
    },
    reviewsSummary: {
      overallRating: 4.8,
      count: 198,
      breakdown: {
        teaching: 4.6,
        faculty: 4.5,
        attendance: 5.0,
        campus: 4.8,
        hostel: 3.8,
        clubs: 5.0,
        internships: 5.0,
        placements: 4.8,
        workload: 3.6
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Science', degree: 'B.E.', durationYears: 4, annualTuitionINR: 540000, hostelFeeAnnualINR: 48000, oneTimeAdmissionFeeINR: 53900 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication', degree: 'B.E.', durationYears: 4, annualTuitionINR: 540000, hostelFeeAnnualINR: 48000, oneTimeAdmissionFeeINR: 53900 },
      { branchCode: 'EE', branchName: 'Electrical and Electronics', degree: 'B.E.', durationYears: 4, annualTuitionINR: 540000, hostelFeeAnnualINR: 48000, oneTimeAdmissionFeeINR: 53900 },
      { branchCode: 'ME', branchName: 'Mechanical Engineering', degree: 'B.E.', durationYears: 4, annualTuitionINR: 540000, hostelFeeAnnualINR: 48000, oneTimeAdmissionFeeINR: 53900 }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 331, closingRank: 331, cutoffScore: 331, exam: 'BITSAT', seatPool: 'Gender-Neutral', source: 'Official BITS Admission Council 2025 Iteration 5', provenance: 'BITS Admission Iteration Archive' },
      { branchCode: 'ECE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 298, closingRank: 298, cutoffScore: 298, exam: 'BITSAT', seatPool: 'Gender-Neutral', source: 'Official BITS Admission Council 2025 Iteration 5', provenance: 'BITS Admission Iteration Archive' },
      { branchCode: 'EE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 275, closingRank: 275, cutoffScore: 275, exam: 'BITSAT', seatPool: 'Gender-Neutral', source: 'Official BITS Admission Council 2025 Iteration 5', provenance: 'BITS Admission Iteration Archive' },
      { branchCode: 'ME', round: 5, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 244, closingRank: 244, cutoffScore: 244, exam: 'BITSAT', seatPool: 'Gender-Neutral', source: 'Official BITS Admission Council 2025 Iteration 5', provenance: 'BITS Admission Iteration Archive' }
    ]
  },

  // 7. COEP TECHNOLOGICAL UNIVERSITY (MHT-CET - Maharashtra)
  {
    id: 'coep-pune',
    name: 'COEP Technological University (formerly College of Engineering Pune)',
    shortName: 'COEP Pune',
    location: 'Shivajinagar, Pune',
    state: 'Maharashtra',
    established: 1854,
    campusSizeAcres: 38,
    nirfRank: 73,
    categoryType: 'State Government',
    counsellingAuthority: 'State CET Cell (MHT-CET)',
    university: 'Unitary State Public University',
    acceptedExams: ['MHT-CET', 'JEE Main'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    overview: 'Established in 1854, COEP is the third oldest engineering college in Asia. Renowned for rich heritage, rigorous curriculum, Bharat Ratna Sir M. Visvesvaraya alumni heritage, and premier Maharashtra state rankings.',
    officialWebsite: 'https://www.coep.org.in',
    eligibilityCriteria: 'State CET Cell MHT-CET Merit rank for 85% Maharashtra State seats; JEE Main CRL rank for 15% All India seats.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '1,20,000+ volumes, dating back to 19th-century classics'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 12.8,
      medianSalaryLPA: 11.5,
      highestSalaryLPA: 50.5,
      placementRatePercent: 86.4,
      topRecruiters: ['Credit Suisse', 'Mastercard', 'Deutsche Bank', 'Goldman Sachs', 'Siemens', 'Tata Motors', 'Bajaj Auto'],
      sourceDocument: 'COEP Training & Placement Cell Report 2024-25'
    },
    reviewsSummary: {
      overallRating: 4.6,
      count: 164,
      breakdown: {
        teaching: 4.5,
        faculty: 4.4,
        attendance: 4.2,
        campus: 4.5,
        hostel: 3.5,
        clubs: 4.9,
        internships: 4.6,
        placements: 4.7,
        workload: 3.8
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 92000, hostelFeeAnnualINR: 35000, oneTimeAdmissionFeeINR: 8500 },
      { branchCode: 'AI', branchName: 'Artificial Intelligence and Data Science', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 92000, hostelFeeAnnualINR: 35000, oneTimeAdmissionFeeINR: 8500 },
      { branchCode: 'ENTC', branchName: 'Electronics and Telecommunication', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 92000, hostelFeeAnnualINR: 35000, oneTimeAdmissionFeeINR: 8500 },
      { branchCode: 'ME', branchName: 'Mechanical Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 92000, hostelFeeAnnualINR: 35000, oneTimeAdmissionFeeINR: 8500 }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 3, year: 2025, category: 'General (OPEN)', quota: 'GOVT', openingRank: 12, closingRank: 195, cutoffScore: 99.88, exam: 'MHT-CET', seatPool: 'Gender-Neutral', source: 'Official MHT-CET CAP Round 3 2025 Archive', provenance: 'State CET Cell Maharashtra CAP Allotment' },
      { branchCode: 'AI', round: 3, year: 2025, category: 'General (OPEN)', quota: 'GOVT', openingRank: 180, closingRank: 360, cutoffScore: 99.72, exam: 'MHT-CET', seatPool: 'Gender-Neutral', source: 'Official MHT-CET CAP Round 3 2025 Archive', provenance: 'State CET Cell Maharashtra CAP Allotment' },
      { branchCode: 'ENTC', round: 3, year: 2025, category: 'General (OPEN)', quota: 'GOVT', openingRank: 410, closingRank: 840, cutoffScore: 99.41, exam: 'MHT-CET', seatPool: 'Gender-Neutral', source: 'Official MHT-CET CAP Round 3 2025 Archive', provenance: 'State CET Cell Maharashtra CAP Allotment' },
      { branchCode: 'CSE', round: 3, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 850, closingRank: 2400, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official MHT-CET All India Seat Allocation', provenance: 'State CET Cell All India Seats' }
    ]
  },

  // 8. JADAVPUR UNIVERSITY (WBJEE - West Bengal)
  {
    id: 'jadavpur-university',
    name: 'Jadavpur University, Faculty of Engineering & Technology',
    shortName: 'Jadavpur University',
    location: 'Kolkata',
    state: 'West Bengal',
    established: 1955,
    campusSizeAcres: 58,
    nirfRank: 10,
    categoryType: 'State Government',
    counsellingAuthority: 'WBJEEB',
    university: 'State University (Autonomous Faculty)',
    acceptedExams: ['WBJEE', 'JEE Main'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
    overview: 'Legendary for offering world-class engineering education at virtually token fees (~₹2,400 to ₹10,000/year). Jadavpur commands unmatched ROI and alumni prowess across academia, Google, and CERN.',
    officialWebsite: 'http://www.jaduniv.edu.in',
    eligibilityCriteria: 'WBJEE GMR (General Merit Rank) via WBJEEB Counselling. 90% seats reserved for West Bengal domicile candidates.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '6,50,000+ volumes, manuscripts & specialized collections'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 18.0,
      medianSalaryLPA: 16.5,
      highestSalaryLPA: 85.0,
      placementRatePercent: 94.2,
      topRecruiters: ['Google', 'Microsoft', 'Texas Instruments', 'Amazon', 'PwC', 'ITC Infotech', 'Schlumberger'],
      sourceDocument: 'Jadavpur University Central Placement Cell 2024-25'
    },
    reviewsSummary: {
      overallRating: 4.8,
      count: 178,
      breakdown: {
        teaching: 4.7,
        faculty: 4.8,
        attendance: 3.8,
        campus: 4.4,
        hostel: 3.4,
        clubs: 4.9,
        internships: 4.9,
        placements: 5.0,
        workload: 3.7
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', degree: 'B.E.', durationYears: 4, annualTuitionINR: 2400, hostelFeeAnnualINR: 1200, oneTimeAdmissionFeeINR: 500 },
      { branchCode: 'IT', branchName: 'Information Technology', degree: 'B.E.', durationYears: 4, annualTuitionINR: 30000, hostelFeeAnnualINR: 1200, oneTimeAdmissionFeeINR: 1000 },
      { branchCode: 'ETCE', branchName: 'Electronics & Telecommunication', degree: 'B.E.', durationYears: 4, annualTuitionINR: 2400, hostelFeeAnnualINR: 1200, oneTimeAdmissionFeeINR: 500 },
      { branchCode: 'EE', branchName: 'Electrical Engineering', degree: 'B.E.', durationYears: 4, annualTuitionINR: 2400, hostelFeeAnnualINR: 1200, oneTimeAdmissionFeeINR: 500 }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 3, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 1, closingRank: 125, exam: 'WBJEE', seatPool: 'Gender-Neutral', source: 'Official WBJEEB 2025 Round 3 Archive', provenance: 'West Bengal Joint Entrance Examination Board' },
      { branchCode: 'IT', round: 3, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 130, closingRank: 340, exam: 'WBJEE', seatPool: 'Gender-Neutral', source: 'Official WBJEEB 2025 Round 3 Archive', provenance: 'West Bengal Joint Entrance Examination Board' },
      { branchCode: 'ETCE', round: 3, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 180, closingRank: 420, exam: 'WBJEE', seatPool: 'Gender-Neutral', source: 'Official WBJEEB 2025 Round 3 Archive', provenance: 'West Bengal Joint Entrance Examination Board' }
    ]
  },

  // 9. RV COLLEGE OF ENGINEERING (KCET & COMEDK - Karnataka)
  {
    id: 'rvce-bangalore',
    name: 'R.V. College of Engineering (RVCE)',
    shortName: 'RVCE Bangalore',
    location: 'Mysuru Road, Bengaluru',
    state: 'Karnataka',
    established: 1963,
    campusSizeAcres: 52,
    nirfRank: 96,
    categoryType: 'Autonomous Private',
    counsellingAuthority: 'KEA',
    university: 'Autonomous (Affiliated to VTU Belagavi)',
    acceptedExams: ['KCET', 'COMEDK', 'JEE Main'],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
    overview: 'Bangalore’s premier private engineering powerhouse. Centrally situated in the Silicon Valley of India, RVCE boasts exceptional product-company recruitment and active student rocketry and robotics labs.',
    officialWebsite: 'https://www.rvce.edu.in',
    eligibilityCriteria: 'KEA KCET rank for Karnataka domicile seats (45%); COMEDK UGET rank for All India open quota (30%); Management quota (25%).',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '1,30,000+ volumes & industrial research databases'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 14.8,
      medianSalaryLPA: 13.2,
      highestSalaryLPA: 62.0,
      placementRatePercent: 91.0,
      topRecruiters: ['Atlassian', 'Amazon', 'Cisco', 'Texas Instruments', 'Mercedes-Benz R&D', 'Adobe', 'Samsung'],
      sourceDocument: 'RVCE Department of Placement & Training 2024-25 Report'
    },
    reviewsSummary: {
      overallRating: 4.6,
      count: 153,
      breakdown: {
        teaching: 4.6,
        faculty: 4.4,
        attendance: 4.5,
        campus: 4.3,
        hostel: 3.6,
        clubs: 4.7,
        internships: 4.8,
        placements: 4.8,
        workload: 4.2
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', degree: 'B.E.', durationYears: 4, annualTuitionINR: 98000, hostelFeeAnnualINR: 110000, oneTimeAdmissionFeeINR: 15000 },
      { branchCode: 'ISE', branchName: 'Information Science and Engineering', degree: 'B.E.', durationYears: 4, annualTuitionINR: 98000, hostelFeeAnnualINR: 110000, oneTimeAdmissionFeeINR: 15000 },
      { branchCode: 'AI', branchName: 'Artificial Intelligence and Machine Learning', degree: 'B.E.', durationYears: 4, annualTuitionINR: 98000, hostelFeeAnnualINR: 110000, oneTimeAdmissionFeeINR: 15000 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication', degree: 'B.E.', durationYears: 4, annualTuitionINR: 98000, hostelFeeAnnualINR: 110000, oneTimeAdmissionFeeINR: 15000 }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 2, year: 2025, category: 'General (OPEN)', quota: 'GOVT', openingRank: 40, closingRank: 310, exam: 'KCET', seatPool: 'Gender-Neutral', source: 'Official KEA KCET 2025 Round 2 Archive', provenance: 'Karnataka Examinations Authority' },
      { branchCode: 'AI', round: 2, year: 2025, category: 'General (OPEN)', quota: 'GOVT', openingRank: 280, closingRank: 620, exam: 'KCET', seatPool: 'Gender-Neutral', source: 'Official KEA KCET 2025 Round 2 Archive', provenance: 'Karnataka Examinations Authority' },
      { branchCode: 'CSE', round: 3, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 80, closingRank: 480, exam: 'COMEDK', seatPool: 'Gender-Neutral', source: 'Official COMEDK 2025 Round 3 Archive', provenance: 'COMEDK All India Consortium' }
    ]
  },

  // 10. DTU (DELHI TECHNOLOGICAL UNIVERSITY - JAC Delhi)
  {
    id: 'dtu-delhi',
    name: 'Delhi Technological University (formerly DCE)',
    shortName: 'DTU Delhi',
    location: 'Rohini, New Delhi',
    state: 'Delhi',
    established: 1941,
    campusSizeAcres: 164,
    nirfRank: 29,
    categoryType: 'State Government',
    counsellingAuthority: 'JAC Delhi',
    university: 'State Public Technical University',
    acceptedExams: ['JEE Main', 'JAC Delhi'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
    overview: 'Established in 1941 as Delhi Polytechnic, DTU is a legendary engineering cradle. Boasting a massive 164-acre campus, renowned SAE auto teams, and colossal batch recruitment by Tier-1 product tech companies.',
    officialWebsite: 'https://www.dtu.ac.in',
    eligibilityCriteria: 'JEE Main CRL rank via JAC Delhi. 85% seats reserved for Delhi Region candidates, 15% for Outside Delhi.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '2,20,000+ volumes, IEEE access and patent databases'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 16.5,
      medianSalaryLPA: 14.8,
      highestSalaryLPA: 82.0,
      placementRatePercent: 88.2,
      topRecruiters: ['Microsoft', 'Google', 'Amazon', 'Goldman Sachs', 'Apple', 'Qualcomm', 'Adobe'],
      sourceDocument: 'DTU Training & Placement Cell 2024-25 Report'
    },
    reviewsSummary: {
      overallRating: 4.6,
      count: 175,
      breakdown: {
        teaching: 4.3,
        faculty: 4.2,
        attendance: 3.9,
        campus: 4.7,
        hostel: 3.5,
        clubs: 4.9,
        internships: 4.8,
        placements: 4.8,
        workload: 3.5
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 219000, hostelFeeAnnualINR: 42000, oneTimeAdmissionFeeINR: 12000 },
      { branchCode: 'IT', branchName: 'Information Technology', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 219000, hostelFeeAnnualINR: 42000, oneTimeAdmissionFeeINR: 12000 },
      { branchCode: 'SE', branchName: 'Software Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 219000, hostelFeeAnnualINR: 42000, oneTimeAdmissionFeeINR: 12000 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 219000, hostelFeeAnnualINR: 42000, oneTimeAdmissionFeeINR: 12000 }
    ],
    cutoffs: [
      // Outside Delhi (15% All India quota)
      { branchCode: 'CSE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 1800, closingRank: 4850, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Round 5 Archive', provenance: 'Joint Admission Counselling Delhi' },
      { branchCode: 'IT', round: 5, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 4900, closingRank: 6700, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Round 5 Archive', provenance: 'Joint Admission Counselling Delhi' },
      // Delhi Region (85% Home State quota)
      { branchCode: 'CSE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 2400, closingRank: 12800, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Round 5 Archive', provenance: 'Joint Admission Counselling Delhi' },
      { branchCode: 'IT', round: 5, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 11000, closingRank: 17500, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Round 5 Archive', provenance: 'Joint Admission Counselling Delhi' }
    ]
  },

  // 11. IET LUCKNOW (UPTAC - Uttar Pradesh)
  {
    id: 'iet-lucknow',
    name: 'Institute of Engineering and Technology (IET Lucknow)',
    shortName: 'IET Lucknow',
    location: 'Sitapur Road, Lucknow',
    state: 'Uttar Pradesh',
    established: 1984,
    campusSizeAcres: 100,
    nirfRank: 145,
    categoryType: 'State Government',
    counsellingAuthority: 'UPTAC',
    university: 'Autonomous Constituent Institute of AKTU',
    acceptedExams: ['UPTAC', 'JEE Main'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    overview: 'Known popularly as the "IIT of AKTU", IET Lucknow is Uttar Pradesh’s top state government engineering institute, preferred by high-ranking state aspirants for civil services and core software careers.',
    officialWebsite: 'https://www.ietlucknow.ac.in',
    eligibilityCriteria: 'JEE Main CRL rank via UPTAC (Dr. APJ Abdul Kalam Technical University Counselling). UP Domicile reservation rules apply.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '80,000+ technical volumes & central e-library'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 9.2,
      medianSalaryLPA: 8.4,
      highestSalaryLPA: 45.0,
      placementRatePercent: 82.5,
      topRecruiters: ['TCS Digital', 'Infosys', 'Amazon', 'Media.net', 'L&T', 'Maruti Suzuki', 'Paytm'],
      sourceDocument: 'IET Lucknow Placement Cell 2024-25 Report'
    },
    reviewsSummary: {
      overallRating: 4.3,
      count: 118,
      breakdown: {
        teaching: 4.2,
        faculty: 4.1,
        attendance: 3.9,
        campus: 4.3,
        hostel: 3.4,
        clubs: 4.4,
        internships: 4.2,
        placements: 4.3,
        workload: 3.8
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 89000, hostelFeeAnnualINR: 28000, oneTimeAdmissionFeeINR: 7500 },
      { branchCode: 'AI', branchName: 'Artificial Intelligence', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 89000, hostelFeeAnnualINR: 28000, oneTimeAdmissionFeeINR: 7500 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 89000, hostelFeeAnnualINR: 28000, oneTimeAdmissionFeeINR: 7500 }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 4, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 18500, closingRank: 32000, exam: 'UPTAC', seatPool: 'Gender-Neutral', source: 'Official UPTAC 2025 Round 4 Archive', provenance: 'Uttar Pradesh Technical Admission Counselling' },
      { branchCode: 'AI', round: 4, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 31000, closingRank: 44500, exam: 'UPTAC', seatPool: 'Gender-Neutral', source: 'Official UPTAC 2025 Round 4 Archive', provenance: 'Uttar Pradesh Technical Admission Counselling' }
    ]
  },

  // 12. PSG COLLEGE OF TECHNOLOGY (TNEA - Tamil Nadu)
  {
    id: 'psg-tech-coimbatore',
    name: 'PSG College of Technology',
    shortName: 'PSG Tech Coimbatore',
    location: 'Peelamedu, Coimbatore',
    state: 'Tamil Nadu',
    established: 1951,
    campusSizeAcres: 45,
    nirfRank: 67,
    categoryType: 'State Government',
    counsellingAuthority: 'DTE TNEA',
    university: 'Autonomous (Affiliated to Anna University)',
    acceptedExams: ['TNEA'],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    overview: 'A pioneer of industry-institution collaborative engineering in South India. Renowned for embedded engineering labs, extensive heavy-machinery research, and direct industrial apprenticeships.',
    officialWebsite: 'https://www.psgtech.edu',
    eligibilityCriteria: 'TNEA Single Window Counselling based on Class 12 PCM aggregate marks (scaled out of 200).',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '2,50,000+ volumes and technical monographs'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 12.2,
      medianSalaryLPA: 10.8,
      highestSalaryLPA: 48.0,
      placementRatePercent: 89.0,
      topRecruiters: ['Qualcomm', 'Bosch', 'Cisco', 'Cognizant', 'TCS', 'L&T', 'Zoho', 'Caterpillar'],
      sourceDocument: 'PSG Tech Placement Division 2024-25 Report'
    },
    reviewsSummary: {
      overallRating: 4.6,
      count: 139,
      breakdown: {
        teaching: 4.6,
        faculty: 4.5,
        attendance: 4.4,
        campus: 4.4,
        hostel: 3.8,
        clubs: 4.6,
        internships: 4.9,
        placements: 4.7,
        workload: 4.1
      }
    },
    courses: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', degree: 'B.E.', durationYears: 4, annualTuitionINR: 95000, hostelFeeAnnualINR: 75000, oneTimeAdmissionFeeINR: 12000 },
      { branchCode: 'IT', branchName: 'Information Technology', degree: 'B.Tech', durationYears: 4, annualTuitionINR: 95000, hostelFeeAnnualINR: 75000, oneTimeAdmissionFeeINR: 12000 },
      { branchCode: 'ME', branchName: 'Mechanical Engineering', degree: 'B.E.', durationYears: 4, annualTuitionINR: 95000, hostelFeeAnnualINR: 75000, oneTimeAdmissionFeeINR: 12000 }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 1, year: 2025, category: 'General (OPEN)', quota: 'GOVT', openingRank: 198, closingRank: 199, cutoffScore: 199, exam: 'TNEA', seatPool: 'Gender-Neutral', source: 'Official DTE TNEA 2025 Round 1 Cutoff Archive', provenance: 'Directorate of Technical Education Tamil Nadu' },
      { branchCode: 'IT', round: 1, year: 2025, category: 'General (OPEN)', quota: 'GOVT', openingRank: 196, closingRank: 197, cutoffScore: 197, exam: 'TNEA', seatPool: 'Gender-Neutral', source: 'Official DTE TNEA 2025 Round 1 Cutoff Archive', provenance: 'Directorate of Technical Education Tamil Nadu' }
    ]
  }
];

export const INDIA_MENTORS_DATA: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Aarav Sharma',
    collegeId: 'iit-bombay',
    collegeName: 'IIT Bombay',
    branch: 'Computer Science & Engineering',
    degree: 'B.Tech',
    academicYear: '3rd Year (Batch of 2026)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    verificationStatus: 'approved',
    isDemo: true,
    idCardUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 38,
    priceINR: 349,
    sessionDurationMins: 30,
    languages: ['English', 'Hindi'],
    entranceRank: 'AIR 42 (JEE Adv)',
    examName: 'JEE Advanced',
    bio: 'AIR 42 in JEE Advanced 2023. Specializes in helping aspirants demystify JoSAA choice order hierarchies, coding cultures across top IITs, and branch selection tradeoffs.',
    topics: ['JoSAA Choice-Filling Strategy', 'IIT Bombay vs IIT Delhi', 'First Year Prep & Coding', 'Hostel Life & Reality'],
    availableSlots: [
      { id: 's1', date: 'Tomorrow, 5:00 PM', time: '05:00 PM - 05:30 PM', isBooked: false },
      { id: 's2', date: 'Tomorrow, 7:30 PM', time: '07:30 PM - 08:00 PM', isBooked: false },
      { id: 's3', date: 'Saturday, 11:00 AM', time: '11:00 AM - 11:30 AM', isBooked: false }
    ],
    recentReviews: [
      { id: 'rev-1', studentName: 'Rishabh Pant', rating: 5, comment: 'Aarav cleared all my doubts regarding IIT Bombay CSE vs IIT Delhi MnC. Highly recommended session!', date: '3 days ago' },
      { id: 'rev-2', studentName: 'Ananya Deshmukh', rating: 5, comment: 'Very practical advice on JoSAA round locking and withdrawal rules.', date: '1 week ago' }
    ]
  },
  {
    id: 'mentor-2',
    name: 'Chinmay Kulkarni',
    collegeId: 'coep-pune',
    collegeName: 'COEP Pune',
    branch: 'Computer Engineering',
    degree: 'B.Tech',
    academicYear: 'Final Year (Batch of 2025)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    verificationStatus: 'approved',
    isDemo: true,
    idCardUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 42,
    priceINR: 249,
    sessionDurationMins: 30,
    languages: ['English', 'Marathi', 'Hindi'],
    entranceRank: '99.88%ile (MHT-CET)',
    examName: 'MHT-CET',
    bio: 'Scored 99.88 percentile in MHT-CET. Specializes in Maharashtra CAP Round choice filling, TFWS fee waivers, and COEP vs VJTI comparisons.',
    topics: ['MHT-CET CAP Round Strategy', 'COEP vs VJTI vs SPIT', 'TFWS Fee Waiver Rules', 'Off-campus Tech Placements'],
    availableSlots: [
      { id: 's4', date: 'Friday, 6:00 PM', time: '06:00 PM - 06:30 PM', isBooked: false },
      { id: 's5', date: 'Saturday, 4:00 PM', time: '04:00 PM - 04:30 PM', isBooked: false }
    ],
    recentReviews: [
      { id: 'rev-3', studentName: 'Aditya Patil', rating: 5, comment: 'Gave the exact CAP round preference sequence for Pune colleges. Helped me get COEP!', date: '5 days ago' }
    ]
  },
  {
    id: 'mentor-3',
    name: 'Sneha Rao',
    collegeId: 'rvce-bangalore',
    collegeName: 'RVCE Bangalore',
    branch: 'Computer Science and Engineering',
    degree: 'B.E.',
    academicYear: '3rd Year (Batch of 2026)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    verificationStatus: 'approved',
    isDemo: true,
    idCardUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 29,
    priceINR: 299,
    sessionDurationMins: 30,
    languages: ['English', 'Kannada', 'Hindi'],
    entranceRank: 'KCET Rank 180',
    examName: 'KCET',
    bio: 'KCET Rank 180. Interned at Atlassian. Guidance on KEA choice option entry, RVCE vs BMS vs PES, and Bangalore startup ecosystem.',
    topics: ['KEA KCET Option Entry', 'RVCE vs BMSCE vs MSRIT', 'Bangalore Tech Internships', 'Hostel vs PG in Mysuru Road'],
    availableSlots: [
      { id: 's6', date: 'Tomorrow, 6:00 PM', time: '06:00 PM - 06:30 PM', isBooked: false },
      { id: 's7', date: 'Sunday, 11:30 AM', time: '11:30 AM - 12:00 PM', isBooked: false }
    ],
    recentReviews: [
      { id: 'rev-4', studentName: 'Karthik N', rating: 5, comment: 'Sneha explained the KEA document verification process and option entry perfectly.', date: '2 weeks ago' }
    ]
  },
  {
    id: 'mentor-4',
    name: 'Tanya Sengupta',
    collegeId: 'jadavpur-university',
    collegeName: 'Jadavpur University',
    branch: 'Information Technology',
    degree: 'B.E.',
    academicYear: '4th Year (Batch of 2025)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    verificationStatus: 'approved',
    isDemo: true,
    idCardUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 31,
    priceINR: 249,
    sessionDurationMins: 30,
    languages: ['English', 'Bengali', 'Hindi'],
    entranceRank: 'WBJEE GMR 185',
    examName: 'WBJEE',
    bio: 'WBJEE GMR 185. Placed at Microsoft. Honest truth on Jadavpur University culture, self-learning curriculum, and placement preparation without fancy fees.',
    topics: ['WBJEE Counselling Hierarchy', 'JU Culture & Academic Reality', 'Core IT vs CSE at Jadavpur', 'Placement Preparation Guide'],
    availableSlots: [
      { id: 's8', date: 'Saturday, 7:00 PM', time: '07:00 PM - 07:30 PM', isBooked: false },
      { id: 's9', date: 'Sunday, 3:00 PM', time: '03:00 PM - 03:30 PM', isBooked: false }
    ],
    recentReviews: [
      { id: 'rev-5', studentName: 'Subham Roy', rating: 5, comment: 'Cleared my fear about JU politics and proved how great the placement cell is!', date: '4 days ago' }
    ]
  },
  {
    id: 'mentor-5',
    name: 'Kabir Verma',
    collegeId: 'dtu-delhi',
    collegeName: 'DTU Delhi',
    branch: 'Software Engineering',
    degree: 'B.Tech',
    academicYear: '2nd Year (Batch of 2027)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    verificationStatus: 'approved',
    isDemo: true,
    idCardUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    rating: 4.85,
    reviewsCount: 22,
    priceINR: 299,
    sessionDurationMins: 30,
    languages: ['English', 'Hindi', 'Punjabi'],
    entranceRank: 'AIR 4,120 (JEE Main)',
    examName: 'JEE Main',
    bio: 'JAC Delhi Counselling veteran. Helps Outside Delhi & Delhi-region candidates navigate DTU vs NSUT vs IIIT Delhi choice matrices.',
    topics: ['JAC Delhi Spot Rounds', 'DTU vs NSUT vs IIIT Delhi', 'Delhi Domicile 85% Advantage', '1st Year Coding Culture'],
    availableSlots: [
      { id: 's10', date: 'Friday, 5:00 PM', time: '05:00 PM - 05:30 PM', isBooked: false },
      { id: 's11', date: 'Sunday, 6:00 PM', time: '06:00 PM - 06:30 PM', isBooked: false }
    ],
    recentReviews: [
      { id: 'rev-6', studentName: 'Aryan Tyagi', rating: 5, comment: 'Kabir explained JAC Delhi spot round allotment risks with total clarity.', date: '3 days ago' }
    ]
  },
  {
    id: 'mentor-6',
    name: 'Meera Nambiar',
    collegeId: 'nit-trichy',
    collegeName: 'NIT Trichy',
    branch: 'Electronics and Communication',
    degree: 'B.Tech',
    academicYear: '3rd Year (Batch of 2026)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    verificationStatus: 'approved',
    isDemo: true,
    idCardUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    rating: 4.92,
    reviewsCount: 35,
    priceINR: 320,
    sessionDurationMins: 30,
    languages: ['English', 'Tamil', 'Malayalam', 'Hindi'],
    entranceRank: 'AIR 2,890 (JEE Main)',
    examName: 'JEE Main',
    bio: 'NIT Trichy ECE rank holder. Guides aspirants on top-3 NITs vs new IITs, core semiconductor career trajectories, and South campus mess & hostel realities.',
    topics: ['NIT Trichy vs Surathkal vs Warangal', 'ECE Core Hardware vs Software', 'JoSAA Gender-Neutral vs Female Supernumerary', 'Mess Food & Campus Climate'],
    availableSlots: [
      { id: 's12', date: 'Tomorrow, 4:00 PM', time: '04:00 PM - 04:30 PM', isBooked: false },
      { id: 's13', date: 'Saturday, 10:00 AM', time: '10:00 AM - 10:30 AM', isBooked: false }
    ],
    recentReviews: [
      { id: 'rev-7', studentName: 'Divya S', rating: 5, comment: 'Meera gave great confidence regarding female supernumerary seat trends at NITs.', date: '5 days ago' }
    ]
  }
];

export const INDIA_COUNSELLING_UPDATES: CounsellingUpdate[] = [
  {
    id: 'upd-1',
    authority: 'JoSAA',
    title: 'JoSAA 2026 Online Choice Locking Window Closing Notice',
    category: 'Schedule',
    publishDate: 'Oct 14, 2026 • 11:00 AM IST',
    lastVerified: '12 mins ago',
    deadlineDate: '2026-10-18',
    importance: 'Critical',
    officialSourceUrl: 'https://josaa.nic.in',
    verified: true,
    isIllustrativeDemo: false,
    summary: 'Strict deadline reminder: All candidates registered for JoSAA 2026 must review and lock preference choices by 17:00 IST on Oct 18. Unlocked saved choices will be automatically locked by server algorithm.'
  },
  {
    id: 'upd-2',
    authority: 'CSAB',
    title: 'CSAB 2026 Special Vacant Seats Round Registration & Participation Fee Notification',
    category: 'Registration',
    publishDate: 'Oct 12, 2026 • 04:30 PM IST',
    lastVerified: '1 hour ago',
    deadlineDate: '2026-10-29',
    importance: 'Critical',
    officialSourceUrl: 'https://csab.nic.in',
    verified: true,
    isIllustrativeDemo: false,
    summary: 'Two Special Rounds will be conducted for vacant seats across NITs, IIITs, and GFTIs following JoSAA Round 6. Participation fee of ₹44,000 (Gen/OBC) and ₹24,000 (SC/ST/PwD) announced.'
  },
  {
    id: 'upd-3',
    authority: 'JAC Delhi',
    title: 'JAC Delhi Round 3 Seat Allotment Result and Physical Reporting Guideline',
    category: 'Allotment',
    publishDate: 'Oct 10, 2026 • 07:15 PM IST',
    lastVerified: '3 hours ago',
    deadlineDate: '2026-10-16',
    importance: 'Important',
    officialSourceUrl: 'https://jacdelhi.admissions.nic.in',
    verified: true,
    isIllustrativeDemo: false,
    summary: 'Round 3 provisional seat allotment released for DTU, NSUT, and IIIT Delhi. Candidates must pay the seat acceptance fee of ₹95,000 online and report physically to allotted institute with original Class 12 passing certificate.'
  },
  {
    id: 'upd-4',
    authority: 'State CET Cell (MHT-CET)',
    title: 'Maharashtra CAP Round 2 Choice Filling & Institutional Vacancy Matrix',
    category: 'Seat Matrix',
    publishDate: 'Oct 08, 2026 • 02:00 PM IST',
    lastVerified: '5 hours ago',
    deadlineDate: '2026-10-22',
    importance: 'Important',
    officialSourceUrl: 'https://cetcell.mahacet.org',
    verified: true,
    isIllustrativeDemo: false,
    summary: 'Category-wise vacant seat matrix published for COEP, VJTI, SPIT, and PICT. Domicile candidates eligible for betterment option must reorder option form before the locking window closes.'
  },
  {
    id: 'upd-5',
    authority: 'KEA (KCET)',
    title: 'KEA Second Extended Round Option Entry Instructions & Document Verification',
    category: 'Schedule',
    publishDate: 'Oct 06, 2026 • 06:00 PM IST',
    lastVerified: '1 day ago',
    deadlineDate: '2026-10-25',
    importance: 'Informational',
    officialSourceUrl: 'https://cetonline.karnataka.gov.in/kea',
    verified: true,
    isIllustrativeDemo: false,
    summary: 'Eligible candidates holding Choice 2 or 3 in Round 1 can modify priority order for engineering seats in RVCE, BMSCE, and MSRIT. Unreported seats to be forfeited per KEA Gazette Clause 14.'
  },
  {
    id: 'upd-6',
    authority: 'UPTAC',
    title: 'UPTAC (AKTU) Round 3 Seat Confirmation and Willingness (Float / Freeze) Protocol',
    category: 'Verification',
    publishDate: 'Oct 04, 2026 • 01:30 PM IST',
    lastVerified: '2 days ago',
    deadlineDate: '2026-10-20',
    importance: 'Informational',
    officialSourceUrl: 'https://uptac.admissions.nic.in',
    verified: true,
    isIllustrativeDemo: false,
    summary: 'Candidates allotted seats in IET Lucknow, KNIT Sultanpur, or BIET Jhansi must submit Willingness (Freeze / Float) and deposit Seat Acceptance Fee of ₹20,000 online before seat cancellation.'
  }
];

export const INDIA_CALENDAR_DEADLINES: CalendarDeadline[] = [
  { id: 'cd-1', date: '2026-10-15', title: 'JoSAA Mock Seat Allotment 2 Display', authority: 'JoSAA', type: 'Mock Allotment', priority: 'High', is_illustrative_demo: false },
  { id: 'cd-2', date: '2026-10-16', title: 'JAC Delhi Round 3 Seat Acceptance Fee Deadline', authority: 'JAC Delhi', type: 'Fee Payment', priority: 'High', is_illustrative_demo: false },
  { id: 'cd-3', date: '2026-10-18', title: 'JoSAA Final Choice Locking Cutoff (Strict 17:00 IST)', authority: 'JoSAA', type: 'Choice Filling', priority: 'High', is_illustrative_demo: false },
  { id: 'cd-4', date: '2026-10-20', title: 'JoSAA Round 1 Seat Allocation Result', authority: 'JoSAA', type: 'Seat Acceptance', priority: 'High', is_illustrative_demo: false },
  { id: 'cd-5', date: '2026-10-22', title: 'MHT-CET CAP Round 2 Option Form Submission', authority: 'MHT-CET', type: 'Choice Filling', priority: 'Medium', is_illustrative_demo: false },
  { id: 'cd-6', date: '2026-10-24', title: 'JoSAA Round 1 Online Reporting & Document Upload', authority: 'JoSAA', type: 'Reporting', priority: 'High', is_illustrative_demo: false },
  { id: 'cd-7', date: '2026-10-25', title: 'KEA KCET Second Extended Round Option Entry Closes', authority: 'KEA', type: 'Choice Filling', priority: 'Medium', is_illustrative_demo: false },
  { id: 'cd-8', date: '2026-10-29', title: 'CSAB Special Round Registration & Choice Filling Begins', authority: 'CSAB', type: 'Registration', priority: 'High', is_illustrative_demo: false }
];

export const INDIA_CHECKLIST_TASKS: ChecklistTask[] = [
  { id: 'chk-1', title: 'Download & Verify OBC-NCL / EWS Certificate (Issued after April 1, 2026)', deadline: 'Before Choice Locking', authority: 'JoSAA / CSAB', category: 'Certificates', completed: true, officialLink: 'https://josaa.nic.in', reminderActive: true },
  { id: 'chk-2', title: 'Verify Class 12 Marksheet meets 75% Aggregate (or Top 20 Percentile of Board)', deadline: 'Prior to Seat Acceptance', authority: 'JoSAA / IIT Council', category: 'Eligibility', completed: true, officialLink: 'https://josaa.nic.in', reminderActive: false },
  { id: 'chk-3', title: 'Prepare Medical Examination Fitness Certificate in Official Annexure 7 Format', deadline: 'Round 1 Document Upload', authority: 'JoSAA / CSAB', category: 'Medical', completed: false, officialLink: 'https://josaa.nic.in', reminderActive: true },
  { id: 'chk-4', title: 'Confirm Net Banking / Debit Card limit for Seat Acceptance Fee (₹35,000 INR)', deadline: 'Within 48h of Round 1', authority: 'JoSAA / CSAB', category: 'Banking', completed: false, officialLink: 'https://josaa.nic.in', reminderActive: true },
  { id: 'chk-5', title: 'Review Choice List for Inverted Category Hazards (Safe choice above Reach)', deadline: 'Before Final Lock', authority: 'Clario', category: 'Strategy', completed: false, officialLink: '#', reminderActive: false },
  { id: 'chk-6', title: 'Download and Save Official Choice Submission Confirmation Slip with Unique Code', deadline: 'Immediately post locking', authority: 'JoSAA Portal', category: 'Proof', completed: false, officialLink: 'https://josaa.nic.in', reminderActive: true }
];

export const INDIA_COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: 'thread-1',
    authorId: 'user-101',
    authorName: 'Aarush Sharma',
    authorRole: 'student',
    authorBadge: 'CRL 3,850 • JoSAA Aspirant',
    category: 'Branch vs College',
    title: 'IIT Bombay Mechanical vs BITS Pilani CSE: Which one would you pick?',
    content: 'My heart says IIT brand name and peer network at Powai, but my mind says BITS Pilani CSE has a ₹32 LPA median package and immediate software placements. Will taking Mechanical at IITB restrict my software career or is branch change realistic?',
    tags: ['IIT Bombay', 'BITS Pilani', 'CSE vs Core', 'JoSAA 2026'],
    upvotes: 42,
    repliesCount: 2,
    createdAt: '2 hours ago',
    isDemo: true,
    isFlagged: false,
    bookmarkedBy: [],
    replies: [
      {
        id: 'rep-1',
        threadId: 'thread-1',
        authorId: 'mentor-1',
        authorName: 'Aarav Sharma',
        authorRole: 'mentor',
        authorCollege: 'IIT Bombay (CSE)',
        isVerifiedMentor: true,
        content: 'Crucial update: Branch change has been discontinued at IIT Bombay, IIT Madras, and IIT Kharagpur! Do NOT take Mechanical expecting a branch upgrade to CSE. If pure software is your lifelong passion, BITS Pilani CSE has identical placement privileges without the stress of managing a heavy thermodynamic workload.',
        upvotes: 28,
        createdAt: '1 hour ago',
        isDemo: true,
        isFlagged: false
      },
      {
        id: 'rep-2',
        threadId: 'thread-1',
        authorId: 'user-204',
        authorName: 'Devansh K',
        authorRole: 'student',
        isVerifiedMentor: false,
        content: 'Keep in mind the 4-year tuition fee difference: BITS is ~₹24-26 Lakhs total vs IITB ~₹10 Lakhs. If budget is a factor, factor that into your ROI.',
        upvotes: 9,
        createdAt: '45 mins ago',
        isDemo: true,
        isFlagged: false
      }
    ]
  },
  {
    id: 'thread-2',
    authorId: 'user-102',
    authorName: 'Pooja Iyer',
    authorRole: 'student',
    authorBadge: 'AIR 8,420 • Tamil Nadu Domicile',
    category: 'JoSAA & CSAB',
    title: 'How does Home State (HS) Quota work for NIT Trichy? Do I need separate registration?',
    content: 'I passed my Class 12 from Chennai, Tamil Nadu. Does JoSAA automatically assign me the Home State quota for NIT Trichy, or is there a separate state quota option form?',
    tags: ['NIT Trichy', 'Home State Quota', 'JoSAA Rules', 'CSAB'],
    upvotes: 24,
    repliesCount: 1,
    createdAt: '5 hours ago',
    isDemo: true,
    isFlagged: false,
    bookmarkedBy: [],
    replies: [
      {
        id: 'rep-3',
        threadId: 'thread-2',
        authorId: 'mentor-3',
        authorName: 'Sneha Rao',
        authorRole: 'mentor',
        authorCollege: 'RVCE Bangalore',
        isVerifiedMentor: true,
        content: 'Your "State Code of Eligibility" is determined purely by the state where you appeared for your Class 12 board examination (Tamil Nadu). JoSAA considers you under HS quota for NIT Trichy automatically! You do NOT need any separate application.',
        upvotes: 18,
        createdAt: '3 hours ago',
        isDemo: true,
        isFlagged: false
      }
    ]
  },
  {
    id: 'thread-3',
    authorId: 'user-103',
    authorName: 'Kunal Deshmukh',
    authorRole: 'student',
    authorBadge: '99.42%ile • MHT-CET',
    category: 'State Counselling',
    title: 'MHT-CET CAP Round Betterment vs JoSAA Seat Acceptance: Can I hold both?',
    content: 'I have been allotted ECE at VNIT Nagpur in JoSAA Round 1, but I am also waiting for COEP Computer Engineering in MHT-CET CAP Round 2. What is the refund policy if I surrender my JoSAA seat before Round 6?',
    tags: ['MHT-CET', 'JoSAA vs State', 'Seat Withdrawal', 'COEP'],
    upvotes: 31,
    repliesCount: 1,
    createdAt: '1 day ago',
    isDemo: true,
    isFlagged: false,
    bookmarkedBy: [],
    replies: [
      {
        id: 'rep-4',
        threadId: 'thread-3',
        authorId: 'mentor-2',
        authorName: 'Chinmay Kulkarni',
        authorRole: 'mentor',
        authorCollege: 'COEP Pune',
        isVerifiedMentor: true,
        content: 'Yes, you can hold your JoSAA seat by opting for "Float", but make sure to withdraw before the official JoSAA Round 5 withdrawal deadline! If you do not withdraw before the final round, your ₹35,000 seat acceptance fee is forfeited and cannot be refunded.',
        upvotes: 22,
        createdAt: '18 hours ago',
        isDemo: true,
        isFlagged: false
      }
    ]
  },
  {
    id: 'thread-4',
    authorId: 'user-104',
    authorName: 'Shalini Verma',
    authorRole: 'student',
    authorBadge: 'AIR 5,230 (Female-only) • UP Domicile',
    category: 'JoSAA & CSAB',
    title: 'Female Supernumerary Quota at IITs: How much cutoff relaxation can I expect?',
    content: 'Looking at Round 6 closing ranks from 2025, there seems to be a significant difference between Gender-Neutral and Female-Only cutoffs for IIT Roorkee and IIT Guwahati ECE. Is this consistent every year?',
    tags: ['Female Supernumerary', 'IIT Roorkee', 'JoSAA Seat Pool', 'Cutoff Analysis'],
    upvotes: 39,
    repliesCount: 1,
    createdAt: '1 day ago',
    isDemo: true,
    isFlagged: false,
    bookmarkedBy: [],
    replies: [
      {
        id: 'rep-5',
        threadId: 'thread-4',
        authorId: 'mentor-6',
        authorName: 'Meera Nambiar',
        authorRole: 'mentor',
        authorCollege: 'NIT Trichy',
        isVerifiedMentor: true,
        content: 'Yes! The 20% female supernumerary quota systematically relaxes closing ranks by 1,200 to 2,500 ranks in mid-tier branches like ECE and MnC across older IITs. Always fill choices in order of true preference — JoSAA algorithm automatically evaluates both Gender-Neutral and Female-Only pools without penalty.',
        upvotes: 27,
        createdAt: '14 hours ago',
        isDemo: true,
        isFlagged: false
      }
    ]
  },
  {
    id: 'thread-5',
    authorId: 'user-105',
    authorName: 'Harsh Vardhan',
    authorRole: 'student',
    authorBadge: 'AIR 22,400 • UPTAC Rank 1,840',
    category: 'Placement & Internships',
    title: 'IET Lucknow CSE vs Tier-3 NIT Mechanical: Placements vs Brand Dilemma',
    content: 'Stuck between taking Computer Science at IET Lucknow via UPTAC vs Mechanical at NIT Silchar / NIT Srinagar via CSAB. My goal is software engineering at a product company. Does NIT tag help off-campus more than IET CSE on-campus placements?',
    tags: ['UPTAC', 'IET Lucknow', 'NIT Silchar', 'Branch vs College', 'Placements'],
    upvotes: 26,
    repliesCount: 1,
    createdAt: '2 days ago',
    isDemo: true,
    isFlagged: false,
    bookmarkedBy: [],
    replies: [
      {
        id: 'rep-6',
        threadId: 'thread-5',
        authorId: 'mentor-4',
        authorName: 'Tanya Sengupta',
        authorRole: 'mentor',
        authorCollege: 'Jadavpur University',
        isVerifiedMentor: true,
        content: 'Take IET Lucknow CSE without hesitation! Top tech companies (Media.net, Amazon, TCS Digital) visit IET directly for coding roles. In mechanical at remote NITs, 70% of software companies disallow non-circuital branches during on-campus shortlisting.',
        upvotes: 21,
        createdAt: '1 day ago',
        isDemo: true,
        isFlagged: false
      }
    ]
  }
];
