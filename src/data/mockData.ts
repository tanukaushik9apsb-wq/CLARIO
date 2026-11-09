import { College, Mentor, CounsellingUpdate, CalendarDeadline, ChecklistTask, CollegeReview } from '../types';

export const COLLEGES_DATA: College[] = [
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
    eligibilityCriteria: 'Top 2,50,000 qualified in JEE Main, then JEE Advanced rank. Aggregate 75% in Class 12 (65% for SC/ST/PwD) or top 20 percentile of board.',
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
      {
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 224000,
        hostelFeeAnnualINR: 36000,
        oneTimeAdmissionFeeINR: 18000
      },
      {
        branchCode: 'EE',
        branchName: 'Electrical Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 224000,
        hostelFeeAnnualINR: 36000,
        oneTimeAdmissionFeeINR: 18000
      },
      {
        branchCode: 'ME',
        branchName: 'Mechanical Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 224000,
        hostelFeeAnnualINR: 36000,
        oneTimeAdmissionFeeINR: 18000
      },
      {
        branchCode: 'AE',
        branchName: 'Aerospace Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 224000,
        hostelFeeAnnualINR: 36000,
        oneTimeAdmissionFeeINR: 18000
      }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 1, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 1, closingRank: 68, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 1, closingRank: 69, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2024, category: 'General (OPEN)', quota: 'AI', openingRank: 1, closingRank: 67, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2024 Archive', lastUpdated: 'Aug 2024' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'OBC-NCL', quota: 'AI', openingRank: 10, closingRank: 52, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'GEN-EWS', quota: 'AI', openingRank: 6, closingRank: 24, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'EE', round: 1, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 140, closingRank: 440, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'EE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 140, closingRank: 480, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'ME', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 650, closingRank: 1720, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'AE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 1200, closingRank: 2650, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' }
    ]
  },
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
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    overview: 'Located in the heart of South Delhi, IIT Delhi offers a vibrant technological ecosystem, distinguished startup culture, and pioneering departments in Mathematics & Computing and Artificial Intelligence.',
    officialWebsite: 'https://home.iitd.ac.in',
    eligibilityCriteria: 'JEE Advanced Rank + 75% in Class 12 or Top 20 percentile in respective State Board.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '4,50,000+ volumes'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 23.8,
      medianSalaryLPA: 20.5,
      highestSalaryLPA: 115.0,
      placementRatePercent: 89.8,
      topRecruiters: ['Microsoft', 'Google', 'Tower Research', 'Optiver', 'Uber', 'Bain & Co', 'McKinsey', 'Intel'],
      sourceDocument: 'Office of Career Services IIT Delhi Summary 2025'
    },
    reviewsSummary: {
      overallRating: 4.8,
      count: 215,
      breakdown: {
        teaching: 4.6,
        faculty: 4.4,
        attendance: 3.8,
        campus: 4.8,
        hostel: 3.8,
        clubs: 4.9,
        internships: 4.9,
        placements: 4.9,
        workload: 3.9
      }
    },
    courses: [
      {
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 220000,
        hostelFeeAnnualINR: 38000,
        oneTimeAdmissionFeeINR: 16000
      },
      {
        branchCode: 'MnC',
        branchName: 'Mathematics and Computing',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 220000,
        hostelFeeAnnualINR: 38000,
        oneTimeAdmissionFeeINR: 16000
      },
      {
        branchCode: 'EE',
        branchName: 'Electrical Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 220000,
        hostelFeeAnnualINR: 38000,
        oneTimeAdmissionFeeINR: 16000
      }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 1, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 15, closingRank: 115, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 15, closingRank: 118, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2024, category: 'General (OPEN)', quota: 'AI', openingRank: 18, closingRank: 116, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2024 Archive', lastUpdated: 'Aug 2024' },
      { branchCode: 'MnC', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 120, closingRank: 340, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'EE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 350, closingRank: 650, exam: 'JEE Advanced', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' }
    ]
  },
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
    university: 'Autonomous Information Technology Institute',
    acceptedExams: ['JEE Main'],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=1600&q=80',
    overview: 'Widely celebrated for producing India’s elite algorithmic coders, NLP researchers, and computer vision scientists. Admission takes place via JEE Main CRL through IIIT-H own portal (not JoSAA).',
    officialWebsite: 'https://www.iiit.ac.in',
    eligibilityCriteria: 'JEE Main CRL score (typically top 0.1-0.2%). No home state reservation; pure merit list.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '70,000+ targeted tech and research papers'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 34.5,
      medianSalaryLPA: 32.0,
      highestSalaryLPA: 102.0,
      placementRatePercent: 98.4,
      topRecruiters: ['Apple', 'Google', 'Meta', 'Uber', 'DE Shaw', 'Directi', 'NVIDIA', 'Adobe'],
      sourceDocument: 'IIIT Hyderabad Placement Office Official Portal Report'
    },
    reviewsSummary: {
      overallRating: 4.7,
      count: 142,
      breakdown: {
        teaching: 4.9,
        faculty: 4.8,
        attendance: 4.6,
        campus: 4.2,
        hostel: 4.1,
        clubs: 4.3,
        internships: 5.0,
        placements: 5.0,
        workload: 4.7
      }
    },
    courses: [
      {
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 380000,
        hostelFeeAnnualINR: 65000,
        oneTimeAdmissionFeeINR: 20000
      },
      {
        branchCode: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 380000,
        hostelFeeAnnualINR: 65000,
        oneTimeAdmissionFeeINR: 20000
      }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 1, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 120, closingRank: 950, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'IIIT-H Admissions Portal Archive 2025', lastUpdated: 'July 2025' },
      { branchCode: 'CSE', round: 4, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 120, closingRank: 1680, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'IIIT-H Admissions Portal Archive 2025', lastUpdated: 'July 2025' },
      { branchCode: 'CSE', round: 4, year: 2024, category: 'General (OPEN)', quota: 'AI', openingRank: 110, closingRank: 1590, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'IIIT-H Admissions Portal Archive 2024', lastUpdated: 'July 2024' },
      { branchCode: 'ECE', round: 4, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 1400, closingRank: 4200, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'IIIT-H Admissions Portal Archive 2025', lastUpdated: 'July 2025' }
    ]
  },
  {
    id: 'bits-pilani',
    name: 'Birla Institute of Technology and Science, Pilani',
    shortName: 'BITS Pilani',
    location: 'Pilani Campus, Vidya Vihar',
    state: 'Rajasthan',
    established: 1964,
    campusSizeAcres: 328,
    nirfRank: 25,
    categoryType: 'BITS',
    counsellingAuthority: 'BITSAT',
    university: 'Birla Institute of Technology & Science (Deemed University)',
    acceptedExams: ['BITSAT'],
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80',
    overview: 'Famous for its zero-attendance policy, world-class alumni network (BITSians), Practice School (PS-1 & PS-2) compulsory industry internships, and exceptional student entrepreneurship ecosystem.',
    officialWebsite: 'https://www.bits-pilani.ac.in',
    eligibilityCriteria: 'BITSAT score + min 75% aggregate in Physics, Chemistry, and Math with at least 60% in each subject in Class 12.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '2,50,000+ volumes with 24/7 reading rooms'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 20.8,
      medianSalaryLPA: 18.5,
      highestSalaryLPA: 82.0,
      placementRatePercent: 93.6,
      topRecruiters: ['Microsoft', 'Amazon', 'Cisco', 'Texas Instruments', 'JP Morgan Chase', 'NutaniX', 'Da Vinci'],
      sourceDocument: 'BITS Pilani Central Placement Division Consolidated Report 2025'
    },
    reviewsSummary: {
      overallRating: 4.8,
      count: 184,
      breakdown: {
        teaching: 4.6,
        faculty: 4.4,
        attendance: 5.0, // 0% attendance policy is loved!
        campus: 4.5,
        hostel: 3.9,
        clubs: 4.9,
        internships: 4.9,
        placements: 4.8,
        workload: 3.6
      }
    },
    courses: [
      {
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        degree: 'B.E.',
        durationYears: 4,
        annualTuitionINR: 575000,
        hostelFeeAnnualINR: 52000,
        oneTimeAdmissionFeeINR: 55000
      },
      {
        branchCode: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        degree: 'B.E.',
        durationYears: 4,
        annualTuitionINR: 575000,
        hostelFeeAnnualINR: 52000,
        oneTimeAdmissionFeeINR: 55000
      },
      {
        branchCode: 'Eco-Dual',
        branchName: 'M.Sc. Economics + B.E. Dual Degree',
        degree: 'Dual Degree',
        durationYears: 5,
        annualTuitionINR: 575000,
        hostelFeeAnnualINR: 52000,
        oneTimeAdmissionFeeINR: 55000
      }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 1, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 345, closingRank: 331, cutoffScore: 331, exam: 'BITSAT', seatPool: 'Gender-Neutral', source: 'Official BITSAT Cutoff Iteration Archive 2025', lastUpdated: 'July 2025' },
      { branchCode: 'CSE', round: 4, year: 2024, category: 'General (OPEN)', quota: 'AI', openingRank: 340, closingRank: 326, cutoffScore: 326, exam: 'BITSAT', seatPool: 'Gender-Neutral', source: 'Official BITSAT Cutoff Iteration Archive 2024', lastUpdated: 'July 2024' },
      { branchCode: 'ECE', round: 1, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 310, closingRank: 298, cutoffScore: 298, exam: 'BITSAT', seatPool: 'Gender-Neutral', source: 'Official BITSAT Cutoff Iteration Archive 2025', lastUpdated: 'July 2025' },
      { branchCode: 'Eco-Dual', round: 1, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 285, closingRank: 268, cutoffScore: 268, exam: 'BITSAT', seatPool: 'Gender-Neutral', source: 'Official BITSAT Cutoff Iteration Archive 2025', lastUpdated: 'July 2025' }
    ]
  },
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology Tiruchirappalli',
    shortName: 'NIT Trichy',
    location: 'Thuvakudi, Tiruchirappalli',
    state: 'Tamil Nadu',
    established: 1964,
    campusSizeAcres: 800,
    nirfRank: 9,
    categoryType: 'NIT',
    counsellingAuthority: 'JoSAA',
    university: 'National Institute of Technology (Autonomous)',
    acceptedExams: ['JEE Main'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
    overview: 'The uncontested #1 ranked NIT in India for over a decade. Possesses sprawling 800-acre infrastructure, exceptional peer caliber from across the nation, and an enviable placement track record in core engineering and IT.',
    officialWebsite: 'https://www.nitt.edu',
    eligibilityCriteria: 'JEE Main CRL / Category rank via JoSAA/CSAB. 75% in 12th Board examinations.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '1,80,000+ volumes'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 17.8,
      medianSalaryLPA: 15.2,
      highestSalaryLPA: 68.0,
      placementRatePercent: 92.4,
      topRecruiters: ['Qualcomm', 'Oracle', 'Samsung', 'Cisco', 'Morgan Stanley', 'Texas Instruments', 'L&T'],
      sourceDocument: 'NIT Trichy Dept of Training & Placement Verified Brochure 2025'
    },
    reviewsSummary: {
      overallRating: 4.6,
      count: 176,
      breakdown: {
        teaching: 4.4,
        faculty: 4.2,
        attendance: 3.9,
        campus: 4.7,
        hostel: 3.8,
        clubs: 4.8,
        internships: 4.6,
        placements: 4.7,
        workload: 3.9
      }
    },
    courses: [
      {
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 145000,
        hostelFeeAnnualINR: 42000,
        oneTimeAdmissionFeeINR: 14000
      },
      {
        branchCode: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 145000,
        hostelFeeAnnualINR: 42000,
        oneTimeAdmissionFeeINR: 14000
      },
      {
        branchCode: 'EEE',
        branchName: 'Electrical and Electronics Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 145000,
        hostelFeeAnnualINR: 42000,
        oneTimeAdmissionFeeINR: 14000
      },
      {
        branchCode: 'ME',
        branchName: 'Mechanical Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 145000,
        hostelFeeAnnualINR: 42000,
        oneTimeAdmissionFeeINR: 14000
      }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 1, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 850, closingRank: 3800, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 850, closingRank: 4650, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2024, category: 'General (OPEN)', quota: 'OS', openingRank: 820, closingRank: 4420, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2024 Archive', lastUpdated: 'Aug 2024' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 1200, closingRank: 6800, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'ECE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 3200, closingRank: 7800, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'EEE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 6500, closingRank: 12400, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'ME', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 11000, closingRank: 19200, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' }
    ]
  },
  {
    id: 'nit-surathkal',
    name: 'National Institute of Technology Karnataka, Surathkal',
    shortName: 'NIT Surathkal',
    location: 'Surathkal, Mangaluru',
    state: 'Karnataka',
    established: 1960,
    campusSizeAcres: 295,
    nirfRank: 12,
    categoryType: 'NIT',
    counsellingAuthority: 'JoSAA',
    university: 'National Institute of Technology (Autonomous)',
    acceptedExams: ['JEE Main'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80',
    overview: 'One of India’s most scenic campuses with its own private beach and lighthouse on the Arabian Sea coast. Superb coding culture, excellent software & core company recruitments.',
    officialWebsite: 'https://www.nitk.ac.in',
    eligibilityCriteria: 'JEE Main rank via JoSAA / CSAB rounds. Minimum 75% marks in class XII boards.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '1,50,000+ volumes'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 18.2,
      medianSalaryLPA: 15.0,
      highestSalaryLPA: 65.0,
      placementRatePercent: 93.1,
      topRecruiters: ['Microsoft', 'Wells Fargo', 'Amazon', 'Deere & Co', 'Intuit', 'Texas Instruments'],
      sourceDocument: 'NITK Surathkal Official Placement Statistics 2024-25'
    },
    reviewsSummary: {
      overallRating: 4.7,
      count: 154,
      breakdown: {
        teaching: 4.4,
        faculty: 4.3,
        attendance: 3.9,
        campus: 5.0, // Beach campus!
        hostel: 4.0,
        clubs: 4.7,
        internships: 4.7,
        placements: 4.8,
        workload: 3.8
      }
    },
    courses: [
      {
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 148000,
        hostelFeeAnnualINR: 44000,
        oneTimeAdmissionFeeINR: 15000
      },
      {
        branchCode: 'AI',
        branchName: 'Artificial Intelligence',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 148000,
        hostelFeeAnnualINR: 44000,
        oneTimeAdmissionFeeINR: 15000
      },
      {
        branchCode: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 148000,
        hostelFeeAnnualINR: 44000,
        oneTimeAdmissionFeeINR: 15000
      }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 1, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 1100, closingRank: 3200, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 1100, closingRank: 3600, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2024, category: 'General (OPEN)', quota: 'OS', openingRank: 1050, closingRank: 3450, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2024 Archive', lastUpdated: 'Aug 2024' },
      { branchCode: 'AI', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 1600, closingRank: 4400, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'ECE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 4200, closingRank: 9100, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' }
    ]
  },
  {
    id: 'dtu-delhi',
    name: 'Delhi Technological University',
    shortName: 'DTU',
    location: 'Bawana Road, Shahbad Daulatpur, Delhi',
    state: 'Delhi',
    established: 1941,
    campusSizeAcres: 164,
    nirfRank: 35,
    categoryType: 'State Government',
    counsellingAuthority: 'JAC Delhi',
    university: 'Delhi Technological University (State Technical University)',
    acceptedExams: ['JEE Main', 'JAC Delhi'],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1600&q=80',
    overview: 'Formerly Delhi College of Engineering (DCE). Premier state technical university with 85% Delhi Region reservation. Renowned for supreme ROI, location advantage for internships, and vibrant student societies.',
    officialWebsite: 'https://www.dtu.ac.in',
    eligibilityCriteria: 'JEE Main CRL score via JAC Delhi counselling. 85% Home State (Delhi) quota, 15% Outside Delhi quota. Min 60% in PCM.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '3,00,000+ volumes'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 16.5,
      medianSalaryLPA: 14.0,
      highestSalaryLPA: 82.0,
      placementRatePercent: 88.5,
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Atlassian', 'Adobe', 'Tower Research', 'Goldman Sachs'],
      sourceDocument: 'DTU Placement & Training Cell Report 2024-25'
    },
    reviewsSummary: {
      overallRating: 4.5,
      count: 220,
      breakdown: {
        teaching: 4.1,
        faculty: 3.9,
        attendance: 4.2,
        campus: 4.5,
        hostel: 3.4,
        clubs: 4.8,
        internships: 4.8,
        placements: 4.7,
        workload: 3.4
      }
    },
    courses: [
      {
        branchCode: 'CSE',
        branchName: 'Computer Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 215000,
        hostelFeeAnnualINR: 48000,
        oneTimeAdmissionFeeINR: 12000
      },
      {
        branchCode: 'IT',
        branchName: 'Information Technology',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 215000,
        hostelFeeAnnualINR: 48000,
        oneTimeAdmissionFeeINR: 12000
      },
      {
        branchCode: 'SE',
        branchName: 'Software Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 215000,
        hostelFeeAnnualINR: 48000,
        oneTimeAdmissionFeeINR: 12000
      },
      {
        branchCode: 'MCE',
        branchName: 'Mathematics and Computing',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 215000,
        hostelFeeAnnualINR: 48000,
        oneTimeAdmissionFeeINR: 12000
      }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 2500, closingRank: 11400, exam: 'JAC Delhi', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Cutoffs Archive', lastUpdated: 'July 2025' },
      { branchCode: 'CSE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 1200, closingRank: 4800, exam: 'JAC Delhi', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Cutoffs Archive', lastUpdated: 'July 2025' },
      { branchCode: 'CSE', round: 5, year: 2024, category: 'General (OPEN)', quota: 'HS', openingRank: 2200, closingRank: 10900, exam: 'JAC Delhi', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2024 Cutoffs Archive', lastUpdated: 'July 2024' },
      { branchCode: 'IT', round: 5, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 6200, closingRank: 16800, exam: 'JAC Delhi', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Cutoffs Archive', lastUpdated: 'July 2025' },
      { branchCode: 'SE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 8500, closingRank: 21400, exam: 'JAC Delhi', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Cutoffs Archive', lastUpdated: 'July 2025' },
      { branchCode: 'MCE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 11000, closingRank: 27500, exam: 'JAC Delhi', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Cutoffs Archive', lastUpdated: 'July 2025' }
    ]
  },
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences New Delhi',
    shortName: 'AIIMS New Delhi',
    location: 'Ansari Nagar, New Delhi',
    state: 'Delhi',
    established: 1956,
    campusSizeAcres: 115,
    nirfRank: 1,
    categoryType: 'Premier Medical',
    counsellingAuthority: 'MCC NEET',
    university: 'Autonomous Apex Medical Institute under Ministry of Health',
    acceptedExams: ['NEET UG'],
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1600&q=80',
    overview: 'The pinnacle of medical education and research in South Asia. Offering world-class clinical patient exposure, subsidized tuition fees (under ₹2,000/yr), and undisputed medical prestige.',
    officialWebsite: 'https://www.aiims.edu',
    eligibilityCriteria: 'NEET-UG qualification with All India Rank typically within top 50 for General category. Age minimum 17 years.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: 'National Medical Library access with 1,00,000+ volumes'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 18.0,
      medianSalaryLPA: 16.5,
      highestSalaryLPA: 35.0,
      placementRatePercent: 100.0,
      topRecruiters: ['AIIMS Residency', 'PGI Chandigarh', 'Max Healthcare', 'Fortis', 'Mayo Clinic Fellowships'],
      sourceDocument: 'AIIMS Academic Section MBBS Outcomes 2025'
    },
    reviewsSummary: {
      overallRating: 4.9,
      count: 110,
      breakdown: {
        teaching: 5.0,
        faculty: 5.0,
        attendance: 4.8,
        campus: 4.6,
        hostel: 4.2,
        clubs: 4.4,
        internships: 5.0,
        placements: 5.0,
        workload: 4.9
      }
    },
    courses: [
      {
        branchCode: 'MBBS',
        branchName: 'Bachelor of Medicine and Bachelor of Surgery',
        degree: 'MBBS',
        durationYears: 5.5,
        annualTuitionINR: 1628,
        hostelFeeAnnualINR: 1200,
        oneTimeAdmissionFeeINR: 500
      }
    ],
    cutoffs: [
      { branchCode: 'MBBS', round: 1, year: 2025, category: 'General (OPEN)', quota: 'AI', openingRank: 1, closingRank: 57, cutoffScore: 715, exam: 'NEET UG', seatPool: 'Gender-Neutral', source: 'MCC NEET UG Allotment Results Archive 2025', lastUpdated: 'Aug 2025' },
      { branchCode: 'MBBS', round: 1, year: 2024, category: 'General (OPEN)', quota: 'AI', openingRank: 1, closingRank: 55, cutoffScore: 715, exam: 'NEET UG', seatPool: 'Gender-Neutral', source: 'MCC NEET UG Allotment Results Archive 2024', lastUpdated: 'Aug 2024' },
      { branchCode: 'MBBS', round: 1, year: 2025, category: 'OBC-NCL', quota: 'AI', openingRank: 60, closingRank: 240, cutoffScore: 705, exam: 'NEET UG', seatPool: 'Gender-Neutral', source: 'MCC NEET UG Allotment Results Archive 2025', lastUpdated: 'Aug 2025' },
      { branchCode: 'MBBS', round: 1, year: 2025, category: 'SC', quota: 'AI', openingRank: 150, closingRank: 980, cutoffScore: 680, exam: 'NEET UG', seatPool: 'Gender-Neutral', source: 'MCC NEET UG Allotment Results Archive 2025', lastUpdated: 'Aug 2025' }
    ]
  },
  {
    id: 'iiit-delhi',
    name: 'Indraprastha Institute of Information Technology Delhi',
    shortName: 'IIIT Delhi',
    location: 'Okhla Industrial Estate Phase III, New Delhi',
    state: 'Delhi',
    established: 2008,
    campusSizeAcres: 25,
    nirfRank: 75,
    categoryType: 'IIIT',
    counsellingAuthority: 'JAC Delhi',
    university: 'State University of Delhi (Autonomous Research University)',
    acceptedExams: ['JEE Main', 'JAC Delhi'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    overview: 'Cutting-edge state research university renowned for stellar faculty credentials (100% PhDs from top world universities), rigorous academic culture, and top-tier AI & Systems research.',
    officialWebsite: 'https://www.iiitd.ac.in',
    eligibilityCriteria: 'JEE Main rank via JAC Delhi counselling. Min 70% in PCM in Class XII boards (65% for reserved categories).',
    facilities: {
      hostelAvailable: true,
      acRooms: true,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '50,000+ volumes & ACM/IEEE Digital Library access'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 20.4,
      medianSalaryLPA: 18.0,
      highestSalaryLPA: 51.0,
      placementRatePercent: 94.2,
      topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'Tower Research', 'Qualcomm', 'Adobe', 'Amazon'],
      sourceDocument: 'IIIT Delhi Placement Office Official Report 2024-25'
    },
    reviewsSummary: {
      overallRating: 4.6,
      count: 98,
      breakdown: {
        teaching: 4.8,
        faculty: 4.8,
        attendance: 4.2,
        campus: 4.6,
        hostel: 4.4,
        clubs: 4.3,
        internships: 4.9,
        placements: 4.8,
        workload: 4.6
      }
    },
    courses: [
      {
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 425000,
        hostelFeeAnnualINR: 60000,
        oneTimeAdmissionFeeINR: 20000
      },
      {
        branchCode: 'CSAM',
        branchName: 'Computer Science and Applied Mathematics',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 425000,
        hostelFeeAnnualINR: 60000,
        oneTimeAdmissionFeeINR: 20000
      },
      {
        branchCode: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 425000,
        hostelFeeAnnualINR: 60000,
        oneTimeAdmissionFeeINR: 20000
      }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 2200, closingRank: 4200, exam: 'JAC Delhi', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Cutoffs Archive', lastUpdated: 'July 2025' },
      { branchCode: 'CSE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 3800, closingRank: 14200, exam: 'JAC Delhi', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Cutoffs Archive', lastUpdated: 'July 2025' },
      { branchCode: 'CSAM', round: 5, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 7800, closingRank: 18500, exam: 'JAC Delhi', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Cutoffs Archive', lastUpdated: 'July 2025' },
      { branchCode: 'ECE', round: 5, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 12000, closingRank: 24000, exam: 'JAC Delhi', seatPool: 'Gender-Neutral', source: 'Official JAC Delhi 2025 Cutoffs Archive', lastUpdated: 'July 2025' }
    ]
  },
  {
    id: 'nit-rourkela',
    name: 'National Institute of Technology Rourkela',
    shortName: 'NIT Rourkela',
    location: 'Sector 1, Rourkela',
    state: 'Odisha',
    established: 1961,
    campusSizeAcres: 647,
    nirfRank: 16,
    categoryType: 'NIT',
    counsellingAuthority: 'JoSAA',
    university: 'National Institute of Technology (Autonomous)',
    acceptedExams: ['JEE Main'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    overview: 'Premier national technical institute with modern residential facilities, state-of-the-art supercomputing labs, and extensive industry linkages across Eastern India.',
    officialWebsite: 'https://www.nitrkl.ac.in',
    eligibilityCriteria: 'JEE Main CRL score via JoSAA/CSAB counselling rounds. 75% in 12th Board examinations.',
    facilities: {
      hostelAvailable: true,
      acRooms: false,
      wifiCampus: true,
      sportsComplex: true,
      medicalCenter: true,
      libraryVolumes: '1,20,000+ volumes'
    },
    placements: {
      reportingYear: 2025,
      avgSalaryLPA: 15.7,
      medianSalaryLPA: 13.8,
      highestSalaryLPA: 52.0,
      placementRatePercent: 91.5,
      topRecruiters: ['Amazon', 'Microsoft', 'Tata Steel', 'Qualcomm', 'Shell', 'Maruti Suzuki', 'Barclays'],
      sourceDocument: 'NIT Rourkela Training & Placement Official Brochure 2025'
    },
    reviewsSummary: {
      overallRating: 4.5,
      count: 130,
      breakdown: {
        teaching: 4.3,
        faculty: 4.1,
        attendance: 3.8,
        campus: 4.8,
        hostel: 4.0,
        clubs: 4.6,
        internships: 4.5,
        placements: 4.6,
        workload: 3.8
      }
    },
    courses: [
      {
        branchCode: 'CSE',
        branchName: 'Computer Science and Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 140000,
        hostelFeeAnnualINR: 38000,
        oneTimeAdmissionFeeINR: 15000
      },
      {
        branchCode: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 140000,
        hostelFeeAnnualINR: 38000,
        oneTimeAdmissionFeeINR: 15000
      },
      {
        branchCode: 'ME',
        branchName: 'Mechanical Engineering',
        degree: 'B.Tech',
        durationYears: 4,
        annualTuitionINR: 140000,
        hostelFeeAnnualINR: 38000,
        oneTimeAdmissionFeeINR: 15000
      }
    ],
    cutoffs: [
      { branchCode: 'CSE', round: 1, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 1800, closingRank: 3400, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 1800, closingRank: 3800, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'CSE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'HS', openingRank: 3200, closingRank: 8500, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'ECE', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 4500, closingRank: 11200, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' },
      { branchCode: 'ME', round: 6, year: 2025, category: 'General (OPEN)', quota: 'OS', openingRank: 15000, closingRank: 28400, exam: 'JEE Main', seatPool: 'Gender-Neutral', source: 'Official JoSAA 2025 Archive', lastUpdated: 'Aug 2025' }
    ]
  }
];

export const MENTORS_DATA: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Aarav Sharma',
    collegeId: 'iit-bombay',
    collegeName: 'IIT Bombay',
    branch: 'Computer Science and Engineering',
    degree: 'B.Tech',
    academicYear: '3rd Year (Batch of 2026)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    rating: 4.95,
    reviewsCount: 48,
    priceINR: 349,
    sessionDurationMins: 30,
    languages: ['English', 'Hindi'],
    entranceRank: 'AIR 42',
    examName: 'JEE Advanced',
    bio: 'Secured AIR 42 in JEE Advanced. Guided 70+ students last counselling cycle. Expert on JoSAA choice locking strategy, branch vs college tradeoffs, and preparing for 1st-year coding at IITs.',
    topics: [
      'JoSAA Choice-Filling Strategy & Pitfalls',
      'Old IIT Non-Circuital vs New IIT CSE Tradeoff',
      'First Year Survival & GPA Management',
      'Hostel Life & Extracurriculars at Powai'
    ],
    availableSlots: [
      { id: 's1', date: 'Tomorrow, 5:00 PM', time: '05:00 PM - 05:30 PM', isBooked: false },
      { id: 's2', date: 'Tomorrow, 7:30 PM', time: '07:30 PM - 08:00 PM', isBooked: false },
      { id: 's3', date: 'Saturday, 11:00 AM', time: '11:00 AM - 11:30 AM', isBooked: false },
      { id: 's4', date: 'Sunday, 4:00 PM', time: '04:00 PM - 04:30 PM', isBooked: false }
    ],
    recentReviews: [
      {
        id: 'rev-1',
        studentName: 'Rohan K.',
        rating: 5,
        comment: 'Aarav saved me from making a massive blunder in my JoSAA order! His breakdown of branch change reality at IITB was eye-opening.',
        date: '3 days ago'
      },
      {
        id: 'rev-2',
        studentName: 'Sneha Patel',
        rating: 5,
        comment: 'Very empathetic and clear. He answered every single question my parents and I had about mess food and course rigor.',
        date: '1 week ago'
      }
    ]
  },
  {
    id: 'mentor-2',
    name: 'Diya Krishnan',
    collegeId: 'bits-pilani',
    collegeName: 'BITS Pilani',
    branch: 'Computer Science (Dual Degree Eco)',
    degree: 'M.Sc + B.E.',
    academicYear: '4th Year (Batch of 2026)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    rating: 4.92,
    reviewsCount: 39,
    priceINR: 299,
    sessionDurationMins: 30,
    languages: ['English', 'Hindi', 'Tamil'],
    entranceRank: 'BITSAT 342 / JEE Adv 4,120',
    examName: 'BITSAT / JEE',
    bio: 'Navigated the BITS dual-degree journey from Economics to CSE with a 9.4 CGPA. Master of BITS vs Top NIT dilemma, Practice School internship placement insights, and zero-attendance lifestyle.',
    topics: [
      'Demystifying BITS Dual Degree (MSc + BE)',
      'BITS Pilani vs Top 3 NITs (Trichy/Surathkal)',
      'Practice School (PS-1 & PS-2) Placements',
      'Finance & Tech Minor Choices'
    ],
    availableSlots: [
      { id: 's5', date: 'Today, 8:00 PM', time: '08:00 PM - 08:30 PM', isBooked: false },
      { id: 's6', date: 'Friday, 6:00 PM', time: '06:00 PM - 06:30 PM', isBooked: false },
      { id: 's7', date: 'Sunday, 10:30 AM', time: '10:30 AM - 11:00 AM', isBooked: false }
    ],
    recentReviews: [
      {
        id: 'rev-3',
        studentName: 'Varun M.',
        rating: 5,
        comment: 'Diya gave realistic numbers on dual degree CGPA cutoffs. No marketing hype, pure practical data. 10/10 recommendation.',
        date: '5 days ago'
      }
    ]
  },
  {
    id: 'mentor-3',
    name: 'Kabir Sengupta',
    collegeId: 'iiit-hyderabad',
    collegeName: 'IIIT Hyderabad',
    branch: 'Computer Science and Engineering',
    degree: 'B.Tech',
    academicYear: 'Final Year (Batch of 2025)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    rating: 4.98,
    reviewsCount: 62,
    priceINR: 399,
    sessionDurationMins: 30,
    languages: ['English', 'Hindi', 'Bengali'],
    entranceRank: 'JEE Main CRL 418',
    examName: 'JEE Main',
    bio: 'Incoming Software Engineer at Apple. IIIT Hyderabad taught me intense discipline and coding fundamentals. Happy to advise students choosing between IIT lower branches vs IIIT-H CSE.',
    topics: [
      'Why IIIT Hyderabad Placements Lead the Country',
      'Handling Academic Rigor & Workload',
      'Undergraduate Research & Publications (CVIT/LTRC)',
      'Direct Admission via JEE Main CRL'
    ],
    availableSlots: [
      { id: 's8', date: 'Saturday, 2:00 PM', time: '02:00 PM - 02:30 PM', isBooked: false },
      { id: 's9', date: 'Saturday, 4:00 PM', time: '04:00 PM - 04:30 PM', isBooked: false },
      { id: 's10', date: 'Sunday, 8:00 PM', time: '08:00 PM - 08:30 PM', isBooked: false }
    ],
    recentReviews: [
      {
        id: 'rev-4',
        studentName: 'Pranav T.',
        rating: 5,
        comment: 'Incredible clarity on coding culture and daily life at Gachibowli campus.',
        date: '2 weeks ago'
      }
    ]
  },
  {
    id: 'mentor-4',
    name: 'Ananya Deshmukh',
    collegeId: 'nit-trichy',
    collegeName: 'NIT Trichy',
    branch: 'Electronics and Communication Engineering',
    degree: 'B.Tech',
    academicYear: '3rd Year (Batch of 2026)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    rating: 4.88,
    reviewsCount: 31,
    priceINR: 279,
    sessionDurationMins: 30,
    languages: ['English', 'Hindi', 'Marathi'],
    entranceRank: 'JEE Main CRL 3,840',
    examName: 'JEE Main',
    bio: 'Outside State student who moved from Pune to Trichy. Specialized in guiding students on culture shift, hostel accommodation, and balancing core electronics vs software placements.',
    topics: [
      'Outside State (OS) vs Home State (HS) Dynamics',
      'ECE Course Rigor & Core Semiconductor Jobs',
      'Life at NITT: Weather, Mess Food & Clubs',
      'NIT Trichy vs Surathkal vs Warangal Comparison'
    ],
    availableSlots: [
      { id: 's11', date: 'Tomorrow, 6:00 PM', time: '06:00 PM - 06:30 PM', isBooked: false },
      { id: 's12', date: 'Sunday, 11:30 AM', time: '11:30 AM - 12:00 PM', isBooked: false }
    ],
    recentReviews: [
      {
        id: 'rev-5',
        studentName: 'Aditya Rao',
        rating: 5,
        comment: 'Resolved all my anxieties regarding language and food at Trichy. Super friendly!',
        date: '4 days ago'
      }
    ]
  },
  {
    id: 'mentor-5',
    name: 'Dr. Siddharth Verma (Intern)',
    collegeId: 'aiims-delhi',
    collegeName: 'AIIMS New Delhi',
    branch: 'MBBS (Internship Phase)',
    degree: 'MBBS',
    academicYear: 'Intern (Batch of 2020)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    rating: 4.96,
    reviewsCount: 54,
    priceINR: 399,
    sessionDurationMins: 30,
    languages: ['English', 'Hindi'],
    entranceRank: 'NEET AIR 23',
    examName: 'NEET UG',
    bio: 'Graduating intern at AIIMS New Delhi. Mentoring NEET aspirants on MCC All India Quota seat matrix, state quota vs central institutes, and surviving the marathon of clinical MBBS.',
    topics: [
      'MCC All India Quota Choice Filling Order',
      'AIIMS New Delhi vs Top State Medical Colleges',
      'Hostel Life, Stipend & Clinical Exposure',
      'USMLE & INI-CET Preparation Strategies'
    ],
    availableSlots: [
      { id: 's13', date: 'Saturday, 8:00 PM', time: '08:00 PM - 08:30 PM', isBooked: false },
      { id: 's14', date: 'Sunday, 2:00 PM', time: '02:00 PM - 02:30 PM', isBooked: false }
    ],
    recentReviews: [
      {
        id: 'rev-6',
        studentName: 'Tanya B.',
        rating: 5,
        comment: 'Dr. Siddharth gave the exact breakdown of bond periods and internal PG reservations. Crucial for any medical aspirant!',
        date: '1 week ago'
      }
    ]
  },
  {
    id: 'mentor-6',
    name: 'Tanvi Bansal',
    collegeId: 'dtu-delhi',
    collegeName: 'Delhi Technological University',
    branch: 'Software Engineering',
    degree: 'B.Tech',
    academicYear: '4th Year (Batch of 2025)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    verifiedIdentity: true,
    verifiedCollegeAffiliation: true,
    rating: 4.89,
    reviewsCount: 29,
    priceINR: 249,
    sessionDurationMins: 30,
    languages: ['English', 'Hindi', 'Punjabi'],
    entranceRank: 'JEE Main CRL 14,200 (Delhi Region)',
    examName: 'JAC Delhi',
    bio: 'Cracked software internships at Microsoft and Atlassian. Helping students understand JAC Delhi counselling mechanics, DTU vs NSUT vs IIIT-Delhi comparison, and day-scholar lifestyle.',
    topics: [
      'JAC Delhi Seat Allotment Dynamics & Upgradation',
      'DTU vs NSUT vs IIIT Delhi (Pros & Cons)',
      'Tech Society Placements & Off-Campus Hunting',
      'Commuting vs Hostels for Delhi Region Students'
    ],
    availableSlots: [
      { id: 's15', date: 'Tomorrow, 9:00 PM', time: '09:00 PM - 09:30 PM', isBooked: false },
      { id: 's16', date: 'Friday, 5:00 PM', time: '05:00 PM - 05:30 PM', isBooked: false }
    ],
    recentReviews: [
      {
        id: 'rev-7',
        studentName: 'Kunal G.',
        rating: 5,
        comment: 'Super crisp guidance on JAC Delhi choice filling. Highly recommended!',
        date: '3 days ago'
      }
    ]
  }
];

export const COUNSELLING_UPDATES_DATA: CounsellingUpdate[] = [
  {
    id: 'upd-1',
    authority: 'JoSAA',
    title: 'JoSAA 2026 Registration and Choice Filling Window Opened',
    category: 'Registration',
    publishDate: 'Oct 12, 2026 • 10:00 AM IST',
    lastVerified: 'Oct 14, 2026 • 09:30 AM IST',
    deadlineDate: '2026-10-18T17:00:00',
    importance: 'Critical',
    officialSourceUrl: 'https://josaa.nic.in',
    verified: true,
    summary: 'Candidate registration and choice filling for academic programs under JoSAA 2026 commenced. All eligible JEE Main & Advanced candidates must fill and lock choices before 5:00 PM, Oct 18.'
  },
  {
    id: 'upd-2',
    authority: 'JoSAA',
    title: 'Display of Mock Seat Allocation 1 Based on Choices Filled',
    category: 'Allotment',
    publishDate: 'Oct 14, 2026 • 02:00 PM IST',
    lastVerified: 'Oct 14, 2026 • 03:00 PM IST',
    deadlineDate: '2026-10-15T23:59:59',
    importance: 'Important',
    officialSourceUrl: 'https://josaa.nic.in',
    verified: true,
    summary: 'Mock seat allocation Round 1 has been released. Candidates can verify tentative seat trends and reorder or add choices before the mandatory choice locking deadline.'
  },
  {
    id: 'upd-3',
    authority: 'CSAB',
    title: 'CSAB Special Rounds Schedule & Eligibility Criteria Notified',
    category: 'Schedule',
    publishDate: 'Oct 10, 2026 • 04:30 PM IST',
    lastVerified: 'Oct 13, 2026 • 11:00 AM IST',
    deadlineDate: '2026-10-28T17:00:00',
    importance: 'Important',
    officialSourceUrl: 'https://csab.nic.in',
    verified: true,
    summary: 'Central Seat Allocation Board published the schedule for two Special Rounds for vacant seats in NITs, IIEST, IIITs and other GFTIs post completion of JoSAA rounds.'
  },
  {
    id: 'upd-4',
    authority: 'JAC Delhi',
    title: 'JAC Delhi Round 3 Seat Allotment Results Declared',
    category: 'Allotment',
    publishDate: 'Oct 13, 2026 • 06:00 PM IST',
    lastVerified: 'Oct 14, 2026 • 08:00 AM IST',
    deadlineDate: '2026-10-16T16:00:00',
    importance: 'Critical',
    officialSourceUrl: 'https://jacdelhi.admissions.nic.in',
    verified: true,
    summary: 'Round 3 seat allotment for DTU, NSUT, IGDTUW, and DSEU announced. Provisionally allocated candidates must submit ₹95,000 seat acceptance fee and complete document verification before Oct 16.'
  },
  {
    id: 'upd-5',
    authority: 'NEET UG',
    title: 'MCC NEET UG 2026 Round 2 Provisional Allotment Notice',
    category: 'Allotment',
    publishDate: 'Oct 11, 2026 • 11:15 AM IST',
    lastVerified: 'Oct 13, 2026 • 05:00 PM IST',
    deadlineDate: '2026-10-17T18:00:00',
    importance: 'Critical',
    officialSourceUrl: 'https://mcc.nic.in',
    verified: true,
    summary: 'Medical Counselling Committee (MCC) released Round 2 allotment results for 15% AIQ MBBS/BDS seats. Physical reporting at designated medical institutes is required by Oct 17.'
  },
  {
    id: 'upd-6',
    authority: 'KEA KCET',
    title: 'Karnataka Examinations Authority Extends Option Entry for Engineering',
    category: 'Schedule',
    publishDate: 'Oct 09, 2026 • 08:45 PM IST',
    lastVerified: 'Oct 12, 2026 • 10:00 AM IST',
    deadlineDate: '2026-10-15T18:00:00',
    importance: 'Informational',
    officialSourceUrl: 'https://cetonline.karnataka.gov.in',
    verified: true,
    summary: 'KEA has granted a two-day extension for KCET eligible rank holders to modify preferences following the inclusion of newly sanctioned AI & Data Science seats in private universities.'
  }
];

export const CALENDAR_DEADLINES_DATA: CalendarDeadline[] = [
  { id: 'cd-1', date: '2026-10-15', title: 'JoSAA Mock Seat Allotment 2 Display', authority: 'JoSAA', type: 'Mock Allotment', priority: 'Medium' },
  { id: 'cd-2', date: '2026-10-16', title: 'JAC Delhi Round 3 Fee Payment Deadline', authority: 'JAC Delhi', type: 'Fee Payment', priority: 'High' },
  { id: 'cd-3', date: '2026-10-17', title: 'MCC NEET UG Round 2 Institute Reporting', authority: 'MCC NEET', type: 'Reporting', priority: 'High' },
  { id: 'cd-4', date: '2026-10-18', title: 'JoSAA Choice Locking Cutoff (Strict 5 PM)', authority: 'JoSAA', type: 'Choice Filling', priority: 'High' },
  { id: 'cd-5', date: '2026-10-20', title: 'JoSAA Round 1 Seat Allocation Result', authority: 'JoSAA', type: 'Seat Acceptance', priority: 'High' },
  { id: 'cd-6', date: '2026-10-24', title: 'JoSAA Round 1 Online Reporting & Fee', authority: 'JoSAA', type: 'Fee Payment', priority: 'High' },
  { id: 'cd-7', date: '2026-10-25', title: 'JoSAA Round 2 Seat Allocation Result', authority: 'JoSAA', type: 'Seat Acceptance', priority: 'Medium' },
  { id: 'cd-8', date: '2026-10-29', title: 'CSAB Special Round Registration Begins', authority: 'CSAB', type: 'Registration', priority: 'High' },
];

export const CHECKLIST_TASKS_DATA: ChecklistTask[] = [
  {
    id: 'chk-1',
    title: 'Verify Category Certificate Crucial Date (Issued on or after April 1)',
    deadline: 'Before Choice Locking',
    authority: 'JoSAA / CSAB',
    category: 'Documents',
    completed: true,
    officialLink: 'https://josaa.nic.in/document-formats/',
    reminderActive: false
  },
  {
    id: 'chk-2',
    title: 'Download and review JoSAA Mock Allotment 1 result',
    deadline: 'Oct 14, 2026',
    authority: 'JoSAA',
    category: 'Choice Verification',
    completed: true,
    officialLink: 'https://josaa.nic.in',
    reminderActive: false
  },
  {
    id: 'chk-3',
    title: 'Complete and lock final preference list before 5:00 PM',
    deadline: 'Oct 18, 2026',
    authority: 'JoSAA',
    category: 'Choice Locking',
    completed: false,
    officialLink: 'https://josaa.nic.in',
    reminderActive: true
  },
  {
    id: 'chk-4',
    title: 'Prepare Medical Fitness Certificate (Annexure 7 signed by Registered Medical Practitioner)',
    deadline: 'Oct 19, 2026',
    authority: 'JoSAA / IIT / NIT',
    category: 'Documents',
    completed: false,
    officialLink: 'https://josaa.nic.in/document-formats/',
    reminderActive: true
  },
  {
    id: 'chk-5',
    title: 'Arrange Seat Acceptance Fee (SAF: ₹35,000 for GEN/OBC, ₹17,500 for SC/ST)',
    deadline: 'Oct 20, 2026',
    authority: 'JoSAA',
    category: 'Finance',
    completed: false,
    officialLink: 'https://josaa.nic.in',
    reminderActive: true
  },
  {
    id: 'chk-6',
    title: 'Download Class 10 & 12 Digilocker certified Marksheets with DOB proof',
    deadline: 'Oct 21, 2026',
    authority: 'All Boards',
    category: 'Documents',
    completed: true,
    officialLink: 'https://digilocker.gov.in',
    reminderActive: false
  }
];

export const COLLEGE_REVIEWS_DATA: CollegeReview[] = [
  {
    id: 'cr-1',
    collegeId: 'iit-bombay',
    collegeName: 'IIT Bombay',
    branch: 'Computer Science and Engineering',
    graduationYear: 'Class of 2025',
    studentName: 'Riddhiman Ghosh',
    verifiedStudent: true,
    date: 'September 2026',
    title: 'An unmatched peer group, but be prepared for genuine pressure',
    ratings: {
      teaching: 4.8,
      faculty: 4.6,
      attendance: 4.2,
      campus: 5.0,
      hostel: 3.8,
      clubs: 5.0,
      internships: 5.0,
      placements: 5.0,
      workload: 4.2
    },
    pros: 'The caliber of minds you interact with daily will permanently transform your ambition. Tech clubs (Web & Coding Club, Mars Rover, IITB Racing) operate like professional research labs. Placements and international internships are world-class.',
    cons: 'Hostels 12, 13, and 14 are good, but first-year hostels (H2/H3) can be old and cramped during monsoons. Relative grading means you are competing against the top 60 ranks in the country.',
    helpfulVotes: 64
  },
  {
    id: 'cr-2',
    collegeId: 'bits-pilani',
    collegeName: 'BITS Pilani',
    branch: 'Electrical and Electronics Engineering',
    graduationYear: 'Class of 2024',
    studentName: 'Shreya Narang',
    verifiedStudent: true,
    date: 'August 2026',
    title: 'Zero attendance is real freedom — requires serious self-discipline',
    ratings: {
      teaching: 4.6,
      faculty: 4.5,
      attendance: 5.0,
      campus: 4.6,
      hostel: 4.0,
      clubs: 5.0,
      internships: 4.9,
      placements: 4.8,
      workload: 3.8
    },
    pros: 'The zero attendance policy gives you room to build startups, contribute to open source, or study for quant finance. Practice School 2 is practically an assured PPO pipeline if you perform well.',
    cons: 'Annual fees are on the higher side compared to government colleges, although MCN (Merit-cum-Need) scholarships cover up to 80% tuition for qualifying families. Pilani summers can get very hot.',
    helpfulVotes: 48
  },
  {
    id: 'cr-3',
    collegeId: 'iiit-hyderabad',
    collegeName: 'IIIT Hyderabad',
    branch: 'Computer Science and Engineering',
    graduationYear: 'Class of 2025',
    studentName: 'Varun Teja',
    verifiedStudent: true,
    date: 'July 2026',
    title: 'The Harvard of coding in India. Hardest curriculum, biggest rewards',
    ratings: {
      teaching: 5.0,
      faculty: 4.9,
      attendance: 4.7,
      campus: 4.3,
      hostel: 4.2,
      clubs: 4.4,
      internships: 5.0,
      placements: 5.0,
      workload: 4.9
    },
    pros: 'No chemistry or mechanical workshops in 1st year; pure CS from Day 1. You code in C, write OS kernels, build neural nets from scratch. Placements exceed even older IIT averages for software profiles.',
    cons: 'Campus is relatively compact (66 acres). Strict assignment deadlines with automated plagiarism checkers (MOSS) mean late night sleep is a luxury during exam weeks.',
    helpfulVotes: 52
  },
  {
    id: 'cr-4',
    collegeId: 'nit-trichy',
    collegeName: 'NIT Trichy',
    branch: 'Electronics and Communication Engineering',
    graduationYear: 'Class of 2025',
    studentName: 'Karthik Raja',
    verifiedStudent: true,
    date: 'August 2026',
    title: 'Sprawling campus, vibrant culturals (Festember), excellent core recruitments',
    ratings: {
      teaching: 4.3,
      faculty: 4.2,
      attendance: 4.0,
      campus: 4.7,
      hostel: 3.9,
      clubs: 4.8,
      internships: 4.6,
      placements: 4.7,
      workload: 3.9
    },
    pros: 'Uncontested #1 NIT reputation. Texas Instruments, Qualcomm, and Nvidia hire heavily for silicon engineering alongside standard FAANG companies. Festember and Pragyan are south India’s premier fests.',
    cons: 'Tiruchirappalli weather is intensely hot from March to June. Cycles are essential to navigate the 800-acre campus between hostels and lecture hall complexes.',
    helpfulVotes: 37
  }
];
