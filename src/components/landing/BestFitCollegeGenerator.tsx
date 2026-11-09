import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { College, ExamType, CategoryType, BranchCourse, RecommendationCollege } from '../../types';
import { 
  Sparkles, CheckCircle2, AlertTriangle, AlertCircle, ArrowRight, ShieldCheck, 
  TableProperties, Plus, Check, MapPin, DollarSign, Award, 
  RotateCcw, Sliders, ChevronRight, HelpCircle, Bookmark, Info, GraduationCap, Building2
} from 'lucide-react';

export const BestFitCollegeGenerator: React.FC = () => {
  const { 
    colleges,
    choiceList, 
    addToChoiceList, 
    removeCollegeFromShortlist,
    setSelectedCollege, 
    setSelectedCutoffCollege,
    setCutoffModalBranch,
    setCurrentView, 
    showToast 
  } = useApp();

  // Wizard Step: 1 = Exam, 2 = Rank/Scores, 3 = Preferences, 4 = Results
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Form State
  const [selectedExam, setSelectedExam] = useState<ExamType>('JEE Main');
  const [rankInput, setRankInput] = useState<string>('3850');
  const [categoryRankInput, setCategoryRankInput] = useState<string>('');
  const [scoreInput, setScoreInput] = useState<string>('');
  const [boardPercentage, setBoardPercentage] = useState<string>('88');
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('General (OPEN)');
  const [homeState, setHomeState] = useState<string>('Maharashtra');
  const [selectedBranches, setSelectedBranches] = useState<string[]>(['CSE', 'AI', 'ECE', 'EE']);
  const [selectedRegion, setSelectedRegion] = useState<string>('All India');
  const [institutionType, setInstitutionType] = useState<'all' | 'govt' | 'private'>('all');
  const [budgetLimit, setBudgetLimit] = useState<number>(600000);
  const [seatPool, setSeatPool] = useState<'Gender-Neutral' | 'Female-only'>('Gender-Neutral');

  // Results Active Tab: 'all' | 'Reach' | 'Match' | 'Safer'
  const [resultsFilter, setResultsFilter] = useState<'all' | 'Reach' | 'Match' | 'Safer'>('all');

  const EXAM_OPTIONS: { id: ExamType; name: string; authority: string; desc: string; scoreType: 'rank' | 'score' }[] = [
    {
      id: 'JEE Advanced',
      name: 'JEE Advanced',
      authority: 'JoSAA / IIT Council',
      desc: 'For 23 Indian Institutes of Technology (IITs)',
      scoreType: 'rank'
    },
    {
      id: 'JEE Main',
      name: 'JEE Main',
      authority: 'JoSAA / CSAB',
      desc: 'For 31 NITs, 26 IIITs, and CFTIs across India',
      scoreType: 'rank'
    },
    {
      id: 'BITSAT',
      name: 'BITSAT',
      authority: 'BITS Admission Council',
      desc: 'For BITS Pilani, Goa, and Hyderabad campuses (Score out of 390)',
      scoreType: 'score'
    },
    {
      id: 'MHT-CET',
      name: 'MHT-CET',
      authority: 'State CET Cell Maharashtra',
      desc: 'For COEP Pune, VJTI Mumbai, SPIT, and Maharashtra Engineering',
      scoreType: 'rank'
    },
    {
      id: 'WBJEE',
      name: 'WBJEE',
      authority: 'WBJEEB West Bengal',
      desc: 'For Jadavpur University, Calcutta University, and West Bengal engineering',
      scoreType: 'rank'
    },
    {
      id: 'KCET',
      name: 'KCET',
      authority: 'Karnataka Examinations Authority (KEA)',
      desc: 'For RVCE Bangalore, BMSCE, and Karnataka state quota seats',
      scoreType: 'rank'
    },
    {
      id: 'COMEDK',
      name: 'COMEDK UGET',
      authority: 'COMEDK Consortium',
      desc: 'For Karnataka Private Engineering Colleges (All India Open Quota)',
      scoreType: 'rank'
    },
    {
      id: 'UPTAC',
      name: 'UPTAC (AKTU)',
      authority: 'Dr. APJ Abdul Kalam Tech Univ',
      desc: 'For IET Lucknow, KNIT Sultanpur, and UP State Engineering',
      scoreType: 'rank'
    },
    {
      id: 'TNEA',
      name: 'TNEA',
      authority: 'Directorate of Technical Education TN',
      desc: 'For Anna University (CEG Guindy), PSG Tech, and Tamil Nadu engineering (Score out of 200)',
      scoreType: 'score'
    },
    {
      id: 'JAC Delhi',
      name: 'JAC Delhi (JEE Main)',
      authority: 'JAC Delhi Admissions',
      desc: 'For Delhi Technological University (DTU), NSUT, and IIIT Delhi',
      scoreType: 'rank'
    },
    {
      id: 'NEET UG',
      name: 'NEET UG',
      authority: 'MCC / DGHS',
      desc: 'For AIIMS, Central Universities, and National Medical MBBS seats',
      scoreType: 'rank'
    }
  ];

  const BRANCH_LIST = [
    { code: 'CSE', name: 'Computer Science & Engineering' },
    { code: 'AI', name: 'Artificial Intelligence & Data' },
    { code: 'ECE', name: 'Electronics & Communication' },
    { code: 'EE', name: 'Electrical Engineering' },
    { code: 'ME', name: 'Mechanical Engineering' },
    { code: 'AE', name: 'Aerospace Engineering' },
    { code: 'IT', name: 'Information Technology' },
    { code: 'MBBS', name: 'MBBS (Medicine)' },
  ];

  const INDIAN_STATES = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 
    'Uttar Pradesh', 'Telangana', 'Rajasthan', 'Odisha', 'Gujarat', 
    'Kerala', 'Madhya Pradesh', 'Punjab', 'Haryana', 'Andhra Pradesh', 'Bihar'
  ];

  const toggleBranch = (code: string) => {
    setSelectedBranches((prev) => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  // Generate personalized ranked recommendations based on submitted student profile
  // CRITICAL RULE: NEVER MIX DIFFERENT EXAMINATION RANKING SYSTEMS!
  const recommendationResults = useMemo<RecommendationCollege[]>(() => {
    if (!hasGenerated) return [];

    const studentRankNum = parseInt(rankInput) || 5000;
    const studentScoreNum = parseInt(scoreInput) || 300;
    const currentExamConfig = EXAM_OPTIONS.find(e => e.id === selectedExam) || EXAM_OPTIONS[0];

    const results: RecommendationCollege[] = [];

    colleges.forEach((college) => {
      // 1. Strict Exam Compatibility Check: Never mix exams
      const acceptsExam = college.acceptedExams?.includes(selectedExam);
      if (!acceptsExam) return;

      // 2. Region / State filter (if specified by student)
      if (selectedRegion !== 'All India' && college.state !== selectedRegion) {
        return;
      }

      // 3. Institution Type filter
      if (institutionType === 'govt' && (college.categoryType === 'BITS' || college.categoryType === 'Autonomous Private')) {
        return;
      }
      if (institutionType === 'private' && (college.categoryType === 'IIT' || college.categoryType === 'NIT' || college.categoryType === 'State Government')) {
        return;
      }

      // 4. Match courses and cutoffs
      college.courses.forEach((course) => {
        // Branch preference check
        if (selectedBranches.length > 0 && !selectedBranches.includes(course.branchCode)) {
          return;
        }

        // Budget check
        if (course.annualTuitionINR > budgetLimit) {
          return;
        }

        // 5. Intelligent Indian Quota Resolution:
        // For colleges in the student's home state (e.g., NIT Trichy for TN resident, COEP for MH resident),
        // prioritize Home State 'HS' or 'GOVT' quota; otherwise fallback to 'OS' or 'AI'.
        const isHomeStateCandidate = homeState === college.state;
        const targetQuotas = isHomeStateCandidate 
          ? ['HS', 'GOVT', 'AI', 'OS'] 
          : ['OS', 'AI', 'GOVT', 'HS'];

        // Find applicable historical cutoff record strictly matching exam
        let cutoffEntry = college.cutoffs.find((c) => {
          const examMatches = c.exam === selectedExam;
          const branchMatches = c.branchCode === course.branchCode;
          const catMatches = c.category === selectedCategory;
          const quotaMatches = targetQuotas.slice(0, 2).includes(c.quota);
          const poolMatches = !c.seatPool || c.seatPool === seatPool;
          return examMatches && branchMatches && catMatches && quotaMatches && poolMatches;
        });

        // Fallback with General (OPEN) category
        if (!cutoffEntry) {
          cutoffEntry = college.cutoffs.find((c) => {
            const examMatches = c.exam === selectedExam;
            const branchMatches = c.branchCode === course.branchCode;
            return examMatches && branchMatches;
          });
        }

        if (!cutoffEntry) return;

        // Categorize into Reach, Match, Safer based on verified criteria
        let tier: 'Reach' | 'Match' | 'Safer' = 'Match';
        let explanation = '';

        if (currentExamConfig.scoreType === 'score') {
          // Score-based (e.g. BITSAT out of 390, TNEA out of 200)
          const cutoffScore = cutoffEntry.cutoffScore || cutoffEntry.closingRank;
          if (studentScoreNum < cutoffScore - 12) {
            tier = 'Reach';
            explanation = `Ambitious target. Previous closing score was ${cutoffScore}. Your score (${studentScoreNum}) is slightly below the historical cutoff threshold.`;
          } else if (studentScoreNum <= cutoffScore + 15) {
            tier = 'Match';
            explanation = `Strong target match. Previous closing cutoff was ${cutoffScore}. Your score (${studentScoreNum}) aligns comfortably with the historical cutoff.`;
          } else {
            tier = 'Safer';
            explanation = `Safer alternative. Previous cutoff was ${cutoffScore}. Your score (${studentScoreNum}) comfortably exceeds the admission threshold.`;
          }
        } else {
          // Rank-based (lower rank is better in India)
          const closing = cutoffEntry.closingRank;
          if (studentRankNum <= closing * 0.75) {
            tier = 'Safer';
            explanation = `Safer option. Previous Round ${cutoffEntry.round} closing rank was #${closing.toLocaleString()} (${cutoffEntry.quota} quota). Your rank (#${studentRankNum.toLocaleString()}) is more competitive than historical cutoffs.`;
          } else if (studentRankNum <= closing * 1.25) {
            tier = 'Match';
            explanation = `Target match. Previous Round ${cutoffEntry.round} closed at #${closing.toLocaleString()} (${cutoffEntry.quota} quota). Your rank (#${studentRankNum.toLocaleString()}) falls within the typical closing band.`;
          } else if (studentRankNum <= closing * 1.6) {
            tier = 'Reach';
            explanation = `Competitive reach. Previous Round ${cutoffEntry.round} closed at #${closing.toLocaleString()} (${cutoffEntry.quota} quota). Worth placing near the top of your preference order.`;
          } else {
            // Beyond reach threshold
            return;
          }
        }

        results.push({
          college,
          course,
          tier,
          exam: selectedExam,
          studentRank: currentExamConfig.scoreType === 'score' ? studentScoreNum : studentRankNum,
          cutoffRank: cutoffEntry.closingRank,
          round: cutoffEntry.round,
          year: cutoffEntry.year,
          category: cutoffEntry.category,
          quota: cutoffEntry.quota,
          seatPool: cutoffEntry.seatPool || 'Gender-Neutral',
          explanation,
          source: cutoffEntry.source || `${college.counsellingAuthority} Official Gazetted Archive`,
          provenance: cutoffEntry.provenance || 'Official Authority Allotment Archive',
          isSyntheticDemo: college.isSyntheticDemo,
          lastUpdated: cutoffEntry.lastUpdated || '2025 Cycle'
        });
      });
    });

    // Sort by Tier (Match -> Safer -> Reach) and NIRF Rank
    const tierPriority = { 'Match': 1, 'Safer': 2, 'Reach': 3 };
    return results.sort((a, b) => {
      if (tierPriority[a.tier] !== tierPriority[b.tier]) {
        return tierPriority[a.tier] - tierPriority[b.tier];
      }
      return a.college.nirfRank - b.college.nirfRank;
    });
  }, [hasGenerated, colleges, selectedExam, rankInput, scoreInput, selectedCategory, homeState, selectedBranches, selectedRegion, institutionType, budgetLimit, seatPool]);

  const handleGenerateShortlist = (e: React.FormEvent) => {
    e.preventDefault();

    const rankVal = parseInt(rankInput);
    const scoreVal = parseInt(scoreInput);

    if (selectedExam === 'BITSAT') {
      if (!scoreInput || isNaN(scoreVal) || scoreVal < 50 || scoreVal > 390) {
        showToast('Please enter a valid BITSAT score between 50 and 390', 'warning');
        return;
      }
    } else if (selectedExam === 'TNEA') {
      if (!scoreInput || isNaN(scoreVal) || scoreVal < 80 || scoreVal > 200) {
        showToast('Please enter a valid TNEA cutoff mark between 80 and 200', 'warning');
        return;
      }
    } else {
      if (!rankInput || isNaN(rankVal) || rankVal <= 0) {
        showToast('Please enter a valid Merit / All India Rank greater than 0', 'warning');
        return;
      }
    }

    if (selectedBranches.length === 0) {
      showToast('Please select at least one preferred branch/program', 'warning');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setActiveStep(4);
      showToast('Personalized India-focused college shortlist generated successfully!', 'success');
    }, 450);
  };

  const reachCount = recommendationResults.filter(r => r.tier === 'Reach').length;
  const matchCount = recommendationResults.filter(r => r.tier === 'Match').length;
  const saferCount = recommendationResults.filter(r => r.tier === 'Safer').length;

  const displayedResults = useMemo(() => {
    if (resultsFilter === 'all') return recommendationResults;
    return recommendationResults.filter(r => r.tier === resultsFilter);
  }, [recommendationResults, resultsFilter]);

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Hero Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#172F91] font-bold mb-3">
              <Sparkles className="w-4 h-4" />
              <span>CLARIO PREDICTOR ENGINE</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#111827] leading-tight">
              India Engineering College Predictor
            </h1>
            <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed">
              Predict your admission chances across IITs, NITs, IIITs, BITS, and Premier State Colleges. 
              Matches your actual exam score against gazetted cutoffs with strict ranking separation and quota awareness.
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-4 gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveStep(1)}
              className={`p-2.5 rounded-2xl flex items-center gap-2 transition-all text-left ${
                activeStep === 1 
                  ? 'bg-[#111827] text-white shadow-xs' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                activeStep === 1 ? 'bg-white text-black' : 'bg-slate-200 text-slate-700'
              }`}>1</span>
              <span className="hidden sm:inline">Exam Selection</span>
            </button>

            <button
              onClick={() => setActiveStep(2)}
              className={`p-2.5 rounded-2xl flex items-center gap-2 transition-all text-left ${
                activeStep === 2 
                  ? 'bg-[#111827] text-white shadow-xs' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                activeStep === 2 ? 'bg-white text-black' : 'bg-slate-200 text-slate-700'
              }`}>2</span>
              <span className="hidden sm:inline">Rank & Scores</span>
            </button>

            <button
              onClick={() => setActiveStep(3)}
              className={`p-2.5 rounded-2xl flex items-center gap-2 transition-all text-left ${
                activeStep === 3 
                  ? 'bg-[#111827] text-white shadow-xs' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                activeStep === 3 ? 'bg-white text-black' : 'bg-slate-200 text-slate-700'
              }`}>3</span>
              <span className="hidden sm:inline">Preferences & Quota</span>
            </button>

            <button
              onClick={() => {
                if (hasGenerated) setActiveStep(4);
              }}
              disabled={!hasGenerated}
              className={`p-2.5 rounded-2xl flex items-center gap-2 transition-all text-left ${
                activeStep === 4 
                  ? 'bg-[#111827] text-white shadow-xs' 
                  : hasGenerated
                  ? 'bg-[#DEE5FC] text-[#172F91] hover:bg-indigo-100'
                  : 'bg-slate-50 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                activeStep === 4 ? 'bg-white text-black' : 'bg-slate-200 text-slate-600'
              }`}>4</span>
              <span className="hidden sm:inline">Predictor Results</span>
            </button>
          </div>
        </div>

        {/* GUIDED INPUT FORM (Steps 1, 2, 3) */}
        {activeStep < 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
            
            {/* STEP 1: ENTRANCE EXAMINATION */}
            {activeStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#172F91]">
                    STEP 01 OF 03
                  </span>
                  <h3 className="font-serif text-2xl text-[#111827] font-semibold mt-1">
                    Select Your Entrance Examination
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Choose your entrance examination. Indian admissions strictly segregate ranking pools — our predictor never mixes different examination metrics.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {EXAM_OPTIONS.map((examOpt) => (
                    <div
                      key={examOpt.id}
                      onClick={() => {
                        setSelectedExam(examOpt.id);
                        if (examOpt.id === 'NEET UG' && !selectedBranches.includes('MBBS')) {
                          setSelectedBranches(['MBBS']);
                        } else if (examOpt.id !== 'NEET UG' && selectedBranches.includes('MBBS')) {
                          setSelectedBranches(['CSE', 'AI', 'ECE', 'EE']);
                        }
                      }}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        selectedExam === examOpt.id
                          ? 'border-[#172F91] bg-[#DEE5FC]/30 shadow-xs ring-2 ring-[#172F91]/10'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm text-[#111827]">{examOpt.name}</h4>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedExam === examOpt.id ? 'border-[#172F91] bg-[#172F91]' : 'border-slate-300'
                          }`}>
                            {selectedExam === examOpt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                        <div className="text-[10px] font-semibold text-[#172F91] mt-1 uppercase">
                          {examOpt.authority}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          {examOpt.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-3 rounded-2xl bg-[#111827] text-white hover:bg-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xs"
                  >
                    <span>Next: Rank & Scores</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: RANK AND ACADEMIC PERFORMANCE */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#172F91]">
                    STEP 02 OF 03
                  </span>
                  <h3 className="font-serif text-2xl text-[#111827] font-semibold mt-1">
                    Your {selectedExam} Performance & Rank
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Enter the exact score/rank as published on your official scorecard.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {selectedExam === 'BITSAT' ? (
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        BITSAT Score (out of 390) *
                      </label>
                      <input
                        type="number"
                        min="50"
                        max="390"
                        value={scoreInput}
                        onChange={(e) => setScoreInput(e.target.value)}
                        placeholder="e.g. 315"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#172F91]/20"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Official score achieved in BITSAT 2026 session.
                      </span>
                    </div>
                  ) : selectedExam === 'TNEA' ? (
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        TNEA Aggregate Mark (out of 200) *
                      </label>
                      <input
                        type="number"
                        min="80"
                        max="200"
                        step="0.5"
                        value={scoreInput}
                        onChange={(e) => setScoreInput(e.target.value)}
                        placeholder="e.g. 197.5"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#172F91]/20"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Scaled Class 12 PCM cut-off mark for Tamil Nadu Engineering Admissions.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Merit Rank / All India Rank (AIR / CRL) *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="500000"
                        value={rankInput}
                        onChange={(e) => setRankInput(e.target.value)}
                        placeholder="e.g. 3850"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#172F91]/20"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Common Rank List (CRL) or State Merit Rank published on scorecard.
                      </span>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Admission Category *
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
                    >
                      <option value="General (OPEN)">General (OPEN)</option>
                      <option value="GEN-EWS">GEN-EWS (Economically Weaker Section)</option>
                      <option value="OBC-NCL">OBC-NCL (Other Backward Class Non-Creamy Layer)</option>
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="ST">ST (Scheduled Tribe)</option>
                      <option value="PwD">PwD (Persons with Benchmark Disabilities)</option>
                    </select>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Matches applicable reservation seat matrix rules.
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Seat Pool Allocation *
                    </label>
                    <select
                      value={seatPool}
                      onChange={(e) => setSeatPool(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
                    >
                      <option value="Gender-Neutral">Gender-Neutral (Open to all candidates)</option>
                      <option value="Female-only">Female-Only (Supernumerary 20% seats in IITs/NITs)</option>
                    </select>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Accounts for official 20% female supernumerary seat quotas in JoSAA.
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Class 12th Board PCM / Aggregate (%)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={boardPercentage}
                      onChange={(e) => setBoardPercentage(e.target.value)}
                      placeholder="e.g. 88"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Required for JoSAA 75% rule / top 20 percentile verification.
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-5 py-2.5 rounded-2xl border border-slate-300 text-xs font-semibold hover:bg-slate-50"
                  >
                    ← Back to Exam
                  </button>

                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-3 rounded-2xl bg-[#111827] text-white hover:bg-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xs"
                  >
                    <span>Next: Preferences & Quota</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PREFERENCES & GENERATION */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#172F91]">
                    STEP 03 OF 03
                  </span>
                  <h3 className="font-serif text-2xl text-[#111827] font-semibold mt-1">
                    Home State Domicile & Preferences
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Home State determines 50% reservation in NITs and state government colleges. Fine-tune your branch choices and budget in INR (₹).
                  </p>
                </div>

                {/* Home State & Quota */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Your Home State Domicile (12th Board Passing State) *
                    </label>
                    <select
                      value={homeState}
                      onChange={(e) => setHomeState(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Crucial: Grants Home State (HS) quota benefits in your local NITs & State CET colleges.
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Geographic Region Filter
                    </label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none"
                    >
                      <option value="All India">All India (Across all states)</option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st} Only</option>
                      ))}
                    </select>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Filter institutions by campus location.
                    </span>
                  </div>
                </div>

                {/* Branches Multi-Select */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-2">
                    Preferred Engineering Branches (Select all that apply) *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BRANCH_LIST.map((b) => {
                      const selected = selectedBranches.includes(b.code);
                      return (
                        <button
                          key={b.code}
                          type="button"
                          onClick={() => toggleBranch(b.code)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            selected
                              ? 'bg-[#172F91] text-white border-[#172F91] shadow-2xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {b.name} ({b.code})
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Institution Type */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Institution Ownership
                    </label>
                    <select
                      value={institutionType}
                      onChange={(e) => setInstitutionType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none"
                    >
                      <option value="all">All Institutions (Govt + Premier Autonomous/Private)</option>
                      <option value="govt">Government Only (IITs, NITs, COEP, DTU, Jadavpur)</option>
                      <option value="private">Premier Private / Autonomous (BITS Pilani, RVCE)</option>
                    </select>
                  </div>

                  {/* Tuition Fee Limit */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Max Annual Tuition Budget (INR ₹)
                    </label>
                    <select
                      value={budgetLimit}
                      onChange={(e) => setBudgetLimit(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none"
                    >
                      <option value={150000}>Up to ₹1.5 Lakhs / year (NITs & Govt)</option>
                      <option value={250000}>Up to ₹2.5 Lakhs / year (IITs)</option>
                      <option value={450000}>Up to ₹4.5 Lakhs / year (IIITs)</option>
                      <option value={700000}>No Budget Limit (All Institutions)</option>
                    </select>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-2.5 rounded-2xl border border-slate-300 text-xs font-semibold hover:bg-slate-50"
                  >
                    ← Back to Scores
                  </button>

                  <button
                    onClick={handleGenerateShortlist}
                    disabled={isGenerating}
                    className="px-8 py-3.5 rounded-2xl bg-[#111827] text-white hover:bg-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#DDF587]" />
                    <span>{isGenerating ? 'Analyzing Cutoff Bounds...' : 'Generate College Predictions'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* RESULTS SECTION (STEP 4) */}
        {activeStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Provenance & Synthetic Disclaimer Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">
                  Authoritative Cutoff Provenance & Advisory Notice:
                </strong>
                <span>
                  The predicted chances below are generated against verified historical opening and closing rank archives 
                  (JoSAA, CSAB, JAC Delhi, MHT-CET, WBJEE, and KEA). Illustrative model predictions do NOT guarantee seat allocation. 
                  Always lock your final choice preference list on the official government counselling portal!
                </span>
              </div>
            </div>

            {/* Control Bar: Summary + Edit Preferences */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Predictions for {selectedExam} • Domicile: {homeState}
                </div>
                <div className="font-serif text-2xl text-[#111827] font-semibold mt-0.5">
                  {selectedExam === 'BITSAT' || selectedExam === 'TNEA'
                    ? `${scoreInput} Points` 
                    : `AIR / State Rank #${parseInt(rankInput).toLocaleString()}`} ({selectedCategory})
                </div>
                <div className="text-xs text-[#172F91] mt-0.5">
                  Found {recommendationResults.length} matching college-branch options strictly within {selectedExam} boundaries.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2.5 rounded-2xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-[#111827] flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Adjust Filters</span>
                </button>

                <button
                  onClick={() => setCurrentView('choice-workspace')}
                  className="px-5 py-2.5 rounded-2xl bg-[#111827] text-white hover:bg-black text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#DDF587]" />
                  <span>Open Choice Workspace ({choiceList.length})</span>
                </button>
              </div>
            </div>

            {/* Category Filter Tabs (Reach, Match, Safer) */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setResultsFilter('all')}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  resultsFilter === 'all'
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Options ({recommendationResults.length})
              </button>

              <button
                onClick={() => setResultsFilter('Reach')}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  resultsFilter === 'Reach'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>Reach / Ambitious</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${resultsFilter === 'Reach' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'}`}>
                  {reachCount}
                </span>
              </button>

              <button
                onClick={() => setResultsFilter('Match')}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  resultsFilter === 'Match'
                    ? 'bg-[#172F91] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>Target / Match</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${resultsFilter === 'Match' ? 'bg-blue-900 text-white' : 'bg-blue-100 text-[#172F91]'}`}>
                  {matchCount}
                </span>
              </button>

              <button
                onClick={() => setResultsFilter('Safer')}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  resultsFilter === 'Safer'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>Safer Options</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${resultsFilter === 'Safer' ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                  {saferCount}
                </span>
              </button>
            </div>

            {/* RESULTS LISTING */}
            {displayedResults.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-3">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="font-serif text-xl font-semibold text-[#111827]">
                  No Matching Options for Filter Criteria
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting your budget limit, selecting additional engineering branches, or exploring adjacent examinations.
                </p>
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-5 py-2.5 rounded-2xl bg-[#111827] text-white text-xs font-semibold"
                >
                  Adjust Preferences
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedResults.map((item, idx) => {
                  const isInChoiceList = choiceList.some(
                    (c) => c.collegeId === item.college.id && c.branchCode === item.course.branchCode
                  );

                  return (
                    <div
                      key={`${item.college.id}-${item.course.branchCode}-${idx}`}
                      className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Banner */}
                        <div className="relative h-40 overflow-hidden bg-slate-900">
                          <img
                            src={item.college.image}
                            alt={item.college.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          
                          {/* Tier Badge */}
                          <div className="absolute top-3 left-3">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                              item.tier === 'Reach'
                                ? 'bg-amber-500 text-white'
                                : item.tier === 'Match'
                                ? 'bg-[#172F91] text-white'
                                : 'bg-emerald-600 text-white'
                            }`}>
                              {item.tier} Choice
                            </span>
                          </div>

                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#111827] backdrop-blur-xs">
                              NIRF #{item.college.nirfRank}
                            </span>
                          </div>

                          {/* College Name on Image */}
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <h4 className="font-serif text-lg font-semibold leading-snug line-clamp-1">
                              {item.college.name}
                            </h4>
                            <div className="text-[11px] text-slate-200 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#8CB7FF]" />
                              <span>{item.college.location}, {item.college.state}</span>
                            </div>
                          </div>
                        </div>

                        {/* Course & Cutoff Metadata Body */}
                        <div className="p-5 space-y-4">
                          <div>
                            <div className="text-xs uppercase font-bold text-[#172F91] tracking-wider">
                              {item.course.degree} in {item.course.branchName}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-2">
                              <span>Quota: <strong className="text-slate-800">{item.quota}</strong></span>
                              <span>• Pool: <strong className="text-slate-800">{item.seatPool}</strong></span>
                              <span>• Category: <strong className="text-slate-800">{item.category}</strong></span>
                            </div>
                          </div>

                          {/* Key Statistics */}
                          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <div>
                              <span className="text-[10px] uppercase text-slate-400 font-bold block">Annual Tuition</span>
                              <span className="font-semibold text-slate-900">
                                ₹{(item.course.annualTuitionINR / 100000).toFixed(2)} Lakhs
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase text-slate-400 font-bold block">Median Placement</span>
                              <span className="font-semibold text-emerald-700">
                                ₹{item.college.placements.medianSalaryLPA} LPA
                              </span>
                            </div>
                          </div>

                          {/* Reasoning & Provenance */}
                          <div className="text-xs text-slate-600 bg-blue-50/60 p-3 rounded-2xl border border-blue-100 space-y-1">
                            <div className="font-semibold text-[#172F91] flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#172F91]" />
                              <span>Cutoff Analysis:</span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {item.explanation}
                            </p>
                            <div className="text-[10px] text-slate-400 pt-1 border-t border-blue-100 flex items-center justify-between">
                              <span>Source: {item.source}</span>
                              <span className="font-semibold text-[#172F91]">{item.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-100 pt-3">
                        <button
                          onClick={() => setSelectedCollege(item.college)}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                        >
                          College Profile
                        </button>

                        <button
                          onClick={() => {
                            if (isInChoiceList) {
                              removeCollegeFromShortlist(item.college.id, item.course.branchCode);
                            } else {
                              addToChoiceList(item.college, item.course.branchCode);
                            }
                          }}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            isInChoiceList
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              : 'bg-[#111827] text-white hover:bg-black shadow-xs'
                          }`}
                        >
                          {isInChoiceList ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Choice</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
