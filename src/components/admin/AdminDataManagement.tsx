import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  College, BranchCourse, CutoffEntry, CounsellingAuthorityItem, 
  RecordVerificationStatus, InstituteCategory, AuthorityType, ExamType, AdminAuditLog 
} from '../../types';
import { 
  Building2, Plus, Edit3, Trash2, CheckCircle2, AlertTriangle, 
  HelpCircle, Upload, FileText, Download, Check, X, Shield, 
  Globe, Search, Filter, History, ChevronRight, Layers, Database,
  ArrowUpDown, AlertCircle, RefreshCw
} from 'lucide-react';

export const AdminDataManagement: React.FC = () => {
  const { 
    colleges, addCollege, updateCollege, deleteCollege,
    addCollegeBranch, updateCollegeBranch, deleteCollegeBranch,
    addCutoffRecord, deleteCutoffRecord,
    importCollegesCSV, importCutoffsCSV,
    authorities, addAuthority, updateAuthority, deleteAuthority,
    updateRecordVerification,
    auditLogs, logAdminAction,
    showToast
  } = useApp();

  const [activeSection, setActiveSection] = useState<'colleges' | 'branches' | 'csv-import' | 'authorities' | 'audit'>('colleges');

  // College Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modals state
  const [showAddCollegeModal, setShowAddCollegeModal] = useState(false);
  const [editingCollege, setEditingCollege] = useState<College | null>(null);
  const [managingBranchesCollege, setManagingBranchesCollege] = useState<College | null>(null);
  const [managingCutoffsCollege, setManagingCutoffsCollege] = useState<College | null>(null);
  const [showAddAuthorityModal, setShowAddAuthorityModal] = useState(false);
  const [editingAuthority, setEditingAuthority] = useState<CounsellingAuthorityItem | null>(null);

  // New College Form State
  const [newColName, setNewColName] = useState('');
  const [newColShortName, setNewColShortName] = useState('');
  const [newColState, setNewColState] = useState('Maharashtra');
  const [newColLocation, setNewColLocation] = useState('');
  const [newColType, setNewColType] = useState<InstituteCategory>('IIT');
  const [newColAuthority, setNewColAuthority] = useState<AuthorityType>('JoSAA');
  const [newColEstablished, setNewColEstablished] = useState<number>(2000);
  const [newColCampusAcres, setNewColCampusAcres] = useState<number>(150);
  const [newColNirfRank, setNewColNirfRank] = useState<number>(25);
  const [newColTuition, setNewColTuition] = useState<number>(220000);
  const [newColWebsite, setNewColWebsite] = useState('https://');
  const [newColSource, setNewColSource] = useState('Official NIRF / Institute Portal');
  const [newColStatus, setNewColStatus] = useState<RecordVerificationStatus>('unverified');

  // New Branch Form State (inside branch manager)
  const [newBranchCode, setNewBranchCode] = useState('');
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchDegree, setNewBranchDegree] = useState('B.Tech');
  const [newBranchDuration, setNewBranchDuration] = useState(4);
  const [newBranchSeats, setNewBranchSeats] = useState(60);
  const [newBranchTuition, setNewBranchTuition] = useState(200000);
  const [newBranchHostel, setNewBranchHostel] = useState(45000);
  const [newBranchStatus, setNewBranchStatus] = useState<RecordVerificationStatus>('unverified');

  // New Cutoff Form State
  const [newCutoffBranch, setNewCutoffBranch] = useState('CSE');
  const [newCutoffYear, setNewCutoffYear] = useState(2025);
  const [newCutoffRound, setNewCutoffRound] = useState(6);
  const [newCutoffExam, setNewCutoffExam] = useState<ExamType>('JEE Main');
  const [newCutoffCategory, setNewCutoffCategory] = useState('General (OPEN)');
  const [newCutoffQuota, setNewCutoffQuota] = useState<'AI' | 'HS' | 'OS' | 'GOVT'>('AI');
  const [newCutoffSeatPool, setNewCutoffSeatPool] = useState<'Gender-Neutral' | 'Female-only'>('Gender-Neutral');
  const [newCutoffOpeningRank, setNewCutoffOpeningRank] = useState(100);
  const [newCutoffClosingRank, setNewCutoffClosingRank] = useState(500);
  const [newCutoffSource, setNewCutoffSource] = useState('JoSAA Official Round 6 Archive');
  const [newCutoffStatus, setNewCutoffStatus] = useState<RecordVerificationStatus>('unverified');

  // CSV Import State
  const [csvType, setCsvType] = useState<'colleges' | 'cutoffs'>('colleges');
  const [csvRawText, setCsvRawText] = useState('');
  const [parsedColleges, setParsedColleges] = useState<any[]>([]);
  const [parsedCutoffs, setParsedCutoffs] = useState<any[]>([]);
  const [csvMarkAs, setCsvMarkAs] = useState<RecordVerificationStatus>('unverified'); // NEVER automatically marked as verified
  const [csvSkipDuplicates, setCsvSkipDuplicates] = useState(true);
  const [csvStep, setCsvStep] = useState<'upload' | 'preview' | 'success'>('upload');
  const [csvStats, setCsvStats] = useState<{ importedCount: number; skippedCount: number; errorCount: number } | null>(null);

  // Authority Form State
  const [authId, setAuthId] = useState('');
  const [authName, setAuthName] = useState('');
  const [authShortName, setAuthShortName] = useState('');
  const [authConductingBody, setAuthConductingBody] = useState('');
  const [authWebsite, setAuthWebsite] = useState('https://');
  const [authExams, setAuthExams] = useState('JEE Main; JEE Advanced');
  const [authTypes, setAuthTypes] = useState('IIT; NIT; IIIT; GFTI');
  const [authDesc, setAuthDesc] = useState('');
  const [authStatus, setAuthStatus] = useState<RecordVerificationStatus>('verified');

  // Audit Logs Filter
  const [auditFilterAction, setAuditFilterAction] = useState('ALL');
  const [auditSearchQuery, setAuditSearchQuery] = useState('');

  // -------------------------------------------------------------
  // CSV Helper Functions
  // -------------------------------------------------------------
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const handleParseCollegesCSV = (text: string) => {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length < 2) {
      showToast('CSV must contain a header and at least one row', 'warning');
      return;
    }

    const headers = parseCSVLine(lines[0]).map(h => h.trim());
    const parsedRows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const vals = parseCSVLine(lines[i]);
      if (vals.length < 2) continue;
      const row: any = {};
      headers.forEach((h, idx) => {
        row[h] = vals[idx] || '';
      });

      // Duplicate check against current database
      const id = (row.id || row.shortName || row.name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const isDuplicate = colleges.some(c => c.id === id || c.name.toLowerCase() === (row.name || '').toLowerCase());
      const isValid = Boolean(row.name && row.name.length >= 3);

      parsedRows.push({
        ...row,
        _id: id,
        _isDuplicate: isDuplicate,
        _isValid: isValid,
        _error: !isValid ? 'Missing or invalid college name' : isDuplicate ? 'College ID/Name already exists in database' : null
      });
    }

    setParsedColleges(parsedRows);
    setCsvStep('preview');
  };

  const handleParseCutoffsCSV = (text: string) => {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length < 2) {
      showToast('CSV must contain a header and at least one cutoff row', 'warning');
      return;
    }

    const headers = parseCSVLine(lines[0]).map(h => h.trim());
    const parsedRows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const vals = parseCSVLine(lines[i]);
      if (vals.length < 2) continue;
      const row: any = {};
      headers.forEach((h, idx) => {
        row[h] = vals[idx] || '';
      });

      const collegeId = (row.collegeId || '').trim();
      const collegeExists = colleges.some(c => c.id === collegeId);
      const opening = Number(row.openingRank);
      const closing = Number(row.closingRank);
      const ranksValid = !isNaN(opening) && !isNaN(closing) && opening > 0 && closing >= opening;
      const branchValid = Boolean(row.branchCode && row.branchCode.length >= 2);

      let duplicate = false;
      const targetCol = colleges.find(c => c.id === collegeId);
      if (targetCol) {
        duplicate = targetCol.cutoffs.some(c => 
          c.branchCode === row.branchCode && 
          c.year === Number(row.year) && 
          c.round === Number(row.round) &&
          c.category === row.category
        );
      }

      const isValid = collegeExists && ranksValid && branchValid;
      let error = null;
      if (!collegeExists) error = `College ID "${collegeId}" not found in registry`;
      else if (!ranksValid) error = 'Invalid ranks (Opening must be <= Closing and > 0)';
      else if (!branchValid) error = 'Missing branch code';
      else if (duplicate) error = 'Cutoff entry already exists for this round';

      parsedRows.push({
        ...row,
        _collegeExists: collegeExists,
        _ranksValid: ranksValid,
        _isDuplicate: duplicate,
        _isValid: isValid,
        _error: error
      });
    }

    setParsedCutoffs(parsedRows);
    setCsvStep('preview');
  };

  const sampleCollegesCSV = `name,shortName,categoryType,counsellingAuthority,state,location,established,campusSizeAcres,nirfRank,annualTuitionINR,officialWebsite,sourceDocument
Indian Institute of Technology Roorkee,IIT Roorkee,IIT,JoSAA,Uttarakhand,Roorkee,1847,365,5,220000,https://iitr.ac.in,NIRF 2024 Institutional Report
National Institute of Technology Rourkela,NIT Rourkela,NIT,JoSAA,Odisha,Rourkela,1961,1200,16,145000,https://nitrkl.ac.in,Official JoSAA 2024 Portal
Indraprastha Institute of Information Technology Delhi,IIIT-Delhi,State Government,JAC Delhi,Delhi,Okhla New Delhi,2008,25,75,450000,https://iiitd.ac.in,JAC Delhi Gazette 2025`;

  const sampleCutoffsCSV = `collegeId,branchCode,year,round,exam,category,quota,seatPool,openingRank,closingRank,sourceDocument
iit-bombay,CSE,2025,6,JEE Advanced,General (OPEN),AI,Gender-Neutral,1,68,JoSAA Round 6 Official Closing Ranks
nit-trichy,CSE,2025,6,JEE Main,General (OPEN),OS,Gender-Neutral,1400,4800,CSAB Special Round 2 Gazette
dtu-delhi,CSE,2025,5,JEE Main,General (OPEN),OS,Gender-Neutral,1850,4900,JAC Delhi Round 5 Final Allotment`;

  // Filtered colleges for list
  const filteredColleges = colleges.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === 'ALL' || c.categoryType === filterType;
    const matchStatus = filterStatus === 'ALL' || (c.verificationStatus || 'verified') === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  // Filtered audit logs
  const filteredAuditLogs = auditLogs.filter(l => {
    const matchAction = auditFilterAction === 'ALL' || l.action === auditFilterAction;
    const matchSearch = !auditSearchQuery.trim() || 
      l.details.toLowerCase().includes(auditSearchQuery.toLowerCase()) || 
      l.entityId.toLowerCase().includes(auditSearchQuery.toLowerCase()) || 
      l.adminEmail.toLowerCase().includes(auditSearchQuery.toLowerCase());
    return matchAction && matchSearch;
  });

  // -------------------------------------------------------------
  // Handle Add College Submission
  // -------------------------------------------------------------
  const handleCreateCollegeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim() || !newColShortName.trim()) {
      showToast('College name and short name are mandatory', 'warning');
      return;
    }

    await addCollege({
      name: newColName,
      shortName: newColShortName,
      state: newColState,
      location: newColLocation || `${newColState}, India`,
      categoryType: newColType,
      counsellingAuthority: newColAuthority,
      established: Number(newColEstablished),
      campusSizeAcres: Number(newColCampusAcres),
      nirfRank: Number(newColNirfRank),
      officialWebsite: newColWebsite,
      sourceDocument: newColSource,
      verificationStatus: newColStatus,
      courses: [
        {
          branchCode: 'CSE',
          branchName: 'Computer Science & Engineering',
          degree: 'B.Tech',
          durationYears: 4,
          annualTuitionINR: Number(newColTuition),
          hostelFeeAnnualINR: 45000,
          oneTimeAdmissionFeeINR: 15000,
          verificationStatus: newColStatus
        }
      ]
    });

    setShowAddCollegeModal(false);
    setNewColName('');
    setNewColShortName('');
  };

  // -------------------------------------------------------------
  // Handle Edit College Submission
  // -------------------------------------------------------------
  const handleEditCollegeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollege) return;

    await updateCollege(editingCollege.id, {
      name: editingCollege.name,
      shortName: editingCollege.shortName,
      location: editingCollege.location,
      state: editingCollege.state,
      categoryType: editingCollege.categoryType,
      counsellingAuthority: editingCollege.counsellingAuthority,
      established: editingCollege.established,
      campusSizeAcres: editingCollege.campusSizeAcres,
      nirfRank: editingCollege.nirfRank,
      officialWebsite: editingCollege.officialWebsite,
      sourceDocument: editingCollege.sourceDocument,
      verificationStatus: editingCollege.verificationStatus
    });

    setEditingCollege(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-navigation Tabs for Admin Data Management */}
      <div className="bg-white rounded-3xl p-2 border border-slate-200/80 shadow-xs flex flex-wrap gap-1.5 text-xs font-semibold">
        <button
          onClick={() => setActiveSection('colleges')}
          className={`py-2.5 px-4 rounded-2xl flex items-center gap-2 transition-all ${
            activeSection === 'colleges' 
              ? 'bg-[#172F91] text-white shadow-xs' 
              : 'text-[#64748B] hover:text-[#111827] hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Colleges Registry ({colleges.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('csv-import')}
          className={`py-2.5 px-4 rounded-2xl flex items-center gap-2 transition-all ${
            activeSection === 'csv-import' 
              ? 'bg-[#172F91] text-white shadow-xs' 
              : 'text-[#64748B] hover:text-[#111827] hover:bg-slate-50'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Bulk CSV Importer & Preview</span>
        </button>

        <button
          onClick={() => setActiveSection('authorities')}
          className={`py-2.5 px-4 rounded-2xl flex items-center gap-2 transition-all ${
            activeSection === 'authorities' 
              ? 'bg-[#172F91] text-white shadow-xs' 
              : 'text-[#64748B] hover:text-[#111827] hover:bg-slate-50'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Authorities Registry ({authorities.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('audit')}
          className={`py-2.5 px-4 rounded-2xl flex items-center gap-2 transition-all ${
            activeSection === 'audit' 
              ? 'bg-[#172F91] text-white shadow-xs' 
              : 'text-[#64748B] hover:text-[#111827] hover:bg-slate-50'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Audit Trail ({auditLogs.length})</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: COLLEGES REGISTRY & EDITOR                     */}
      {/* ========================================================= */}
      {activeSection === 'colleges' && (
        <div className="space-y-4">
          
          {/* Controls Bar: Search, Filters, Add College Button */}
          <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search college by name, shortname, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#172F91]"
                />
              </div>

              {/* Category Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-[#F8F9FA] border border-slate-200 rounded-2xl px-3 py-2.5 text-xs font-semibold text-[#111827]"
              >
                <option value="ALL">All Categories</option>
                <option value="IIT">IITs</option>
                <option value="NIT">NITs</option>
                <option value="IIIT">IIITs</option>
                <option value="BITS">BITS</option>
                <option value="State Government">State Government</option>
                <option value="Autonomous Private">Autonomous Private</option>
              </select>

              {/* Verification Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#F8F9FA] border border-slate-200 rounded-2xl px-3 py-2.5 text-xs font-semibold text-[#111827]"
              >
                <option value="ALL">All Verification Statuses</option>
                <option value="verified">Verified Records</option>
                <option value="unverified">Unverified Records</option>
                <option value="demo">Synthetic Demo Records</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddCollegeModal(true)}
              className="py-2.5 px-4 rounded-2xl bg-[#172F91] hover:bg-[#0F1E60] text-white text-xs font-semibold flex items-center gap-2 shadow-xs shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add College Record</span>
            </button>
          </div>

          {/* Colleges Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#111827]">
                Showing {filteredColleges.length} of {colleges.length} Colleges
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                RLS: Admin Full Privileges
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#111827]">
                <thead className="bg-[#F8F9FA] text-[11px] uppercase tracking-wider text-[#64748B] border-b border-slate-200 font-bold">
                  <tr>
                    <th className="py-3 px-4">Institute</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">State / Location</th>
                    <th className="py-3 px-3">NIRF</th>
                    <th className="py-3 px-3">Branches</th>
                    <th className="py-3 px-3">Cutoffs</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Last Verified</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredColleges.map((col) => {
                    const status = col.verificationStatus || 'verified';
                    return (
                      <tr key={col.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#111827]">{col.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                            <span className="px-1.5 py-0.2 bg-slate-100 rounded text-slate-600">{col.shortName}</span>
                            <span>• ID: {col.id}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DEE5FC] text-[#172F91]">
                            {col.categoryType}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="font-medium">{col.state}</div>
                          <div className="text-[10px] text-slate-400">{col.location}</div>
                        </td>

                        <td className="py-3.5 px-3 font-mono font-bold">
                          #{col.nirfRank}
                        </td>

                        <td className="py-3.5 px-3">
                          <button
                            onClick={() => setManagingBranchesCollege(col)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                          >
                            <Layers className="w-3 h-3 text-[#172F91]" />
                            <span>{col.courses.length} Branches</span>
                          </button>
                        </td>

                        <td className="py-3.5 px-3">
                          <button
                            onClick={() => setManagingCutoffsCollege(col)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                          >
                            <Database className="w-3 h-3 text-emerald-700" />
                            <span>{col.cutoffs.length} Cutoffs</span>
                          </button>
                        </td>

                        <td className="py-3.5 px-3">
                          <select
                            value={status}
                            onChange={(e) => updateRecordVerification('college', col.id, e.target.value as RecordVerificationStatus)}
                            className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer ${
                              status === 'verified'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : status === 'unverified'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-purple-50 text-purple-800 border-purple-300'
                            }`}
                          >
                            <option value="verified">✓ Verified</option>
                            <option value="unverified">⚠ Unverified</option>
                            <option value="demo">✦ Demo / Mock</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-3 text-[11px] text-slate-500 font-mono">
                          {col.lastVerifiedAt ? new Date(col.lastVerifiedAt).toLocaleDateString('en-IN') : 'Nov 2026'}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingCollege(col)}
                              title="Edit College"
                              className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-[#111827]"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete ${col.name}? All branches and cutoffs will be removed.`)) {
                                  deleteCollege(col.id);
                                }
                              }}
                              title="Delete College"
                              className="p-1.5 rounded-xl border border-red-200 hover:bg-red-50 text-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: CSV IMPORTER WITH PREVIEW & DUPLICATE CHECKS   */}
      {/* ========================================================= */}
      {activeSection === 'csv-import' && (
        <div className="space-y-6">
          
          {/* Header Explanation */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#172F91]">
                DATA INGESTION PIPELINE
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#111827] mt-1">
                CSV Importer with Live Pre-Validation
              </h2>
              <p className="text-xs text-[#64748B] mt-1.5 max-w-2xl leading-relaxed">
                Import complete college registries or official cutoff archives. All rows are validated for schema conformity, 
                checked against existing database records to detect duplicates, and previewed before saving. 
                <strong className="text-amber-800 ml-1">Imported data is never marked verified automatically.</strong>
              </p>
            </div>

            {/* Switch Import Type */}
            <div className="flex items-center gap-2 bg-[#F8F9FA] p-1.5 rounded-2xl border border-slate-200 shrink-0">
              <button
                onClick={() => { setCsvType('colleges'); setCsvStep('upload'); }}
                className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
                  csvType === 'colleges' ? 'bg-[#172F91] text-white shadow-xs' : 'text-slate-600 hover:text-[#111827]'
                }`}
              >
                Colleges CSV
              </button>
              <button
                onClick={() => { setCsvType('cutoffs'); setCsvStep('upload'); }}
                className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
                  csvType === 'cutoffs' ? 'bg-[#172F91] text-white shadow-xs' : 'text-slate-600 hover:text-[#111827]'
                }`}
              >
                Cutoffs CSV
              </button>
            </div>
          </div>

          {/* STEP 1: Upload or Paste CSV */}
          {csvStep === 'upload' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Input Textarea */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold text-[#111827]">
                    Paste {csvType === 'colleges' ? 'Colleges' : 'Cutoffs'} CSV Content
                  </h3>
                  <button
                    onClick={() => {
                      const sample = csvType === 'colleges' ? sampleCollegesCSV : sampleCutoffsCSV;
                      setCsvRawText(sample);
                    }}
                    className="text-xs text-[#172F91] hover:underline font-semibold"
                  >
                    Load Sample Template
                  </button>
                </div>

                <textarea
                  rows={12}
                  value={csvRawText}
                  onChange={(e) => setCsvRawText(e.target.value)}
                  placeholder={csvType === 'colleges' ? sampleCollegesCSV : sampleCutoffsCSV}
                  className="w-full bg-[#F8F9FA] border border-slate-200 rounded-2xl p-4 text-xs font-mono text-[#111827] focus:outline-none focus:border-[#172F91]"
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    File format: UTF-8 Comma-Separated Values with header row
                  </span>
                  <button
                    disabled={!csvRawText.trim()}
                    onClick={() => {
                      if (csvType === 'colleges') handleParseCollegesCSV(csvRawText);
                      else handleParseCutoffsCSV(csvRawText);
                    }}
                    className="py-2.5 px-6 rounded-2xl bg-[#172F91] hover:bg-[#0F1E60] disabled:opacity-40 text-white text-xs font-semibold shadow-xs"
                  >
                    Parse & Preview Records →
                  </button>
                </div>
              </div>

              {/* Right: Ingestion Rules & Guidance */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#172F91]">
                    <Shield className="w-4 h-4" />
                    <span>Import Rules & Audit Protocol</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#475569] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#172F91] mt-1.5 shrink-0" />
                      <span><strong>Never Automatically Verified:</strong> All ingested rows default to <span className="font-semibold text-amber-800">Unverified</span> until an administrator inspects source documentation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#172F91] mt-1.5 shrink-0" />
                      <span><strong>Duplicate Detection:</strong> Identifies existing college IDs or cutoff combinations before persisting.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#172F91] mt-1.5 shrink-0" />
                      <span><strong>Audit Logging:</strong> Every batch import is permanently tracked in the Audit Trail with administrator email and timestamp.</span>
                    </li>
                  </ul>

                  <div className="pt-3 border-t border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Expected Headers for {csvType === 'colleges' ? 'Colleges' : 'Cutoffs'}:
                    </div>
                    <code className="text-[11px] block bg-slate-50 p-2.5 rounded-xl text-slate-700 font-mono break-all border border-slate-200">
                      {csvType === 'colleges' 
                        ? 'name, shortName, categoryType, counsellingAuthority, state, location, established, campusSizeAcres, nirfRank, annualTuitionINR, officialWebsite, sourceDocument'
                        : 'collegeId, branchCode, year, round, exam, category, quota, seatPool, openingRank, closingRank, sourceDocument'
                      }
                    </code>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Live Preview Grid Before Saving */}
          {csvStep === 'preview' && (
            <div className="space-y-4">
              
              {/* Preview Bar with Options */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    onClick={() => setCsvStep('upload')}
                    className="text-xs text-[#172F91] hover:underline font-semibold"
                  >
                    ← Edit CSV Input
                  </button>
                  <div className="h-4 w-[1px] bg-slate-300" />
                  <span className="text-xs font-bold text-[#111827]">
                    Parsed {csvType === 'colleges' ? parsedColleges.length : parsedCutoffs.length} Total Rows
                  </span>
                  
                  {/* Duplicates toggle */}
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer ml-2">
                    <input
                      type="checkbox"
                      checked={csvSkipDuplicates}
                      onChange={(e) => setCsvSkipDuplicates(e.target.checked)}
                      className="rounded border-slate-300 text-[#172F91] focus:ring-[#172F91]"
                    />
                    <span>Skip Duplicates (Do not overwrite)</span>
                  </label>

                  {/* Mark As Dropdown */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <span>Initial Status:</span>
                    <select
                      value={csvMarkAs}
                      onChange={(e) => setCsvMarkAs(e.target.value as RecordVerificationStatus)}
                      className="bg-[#F8F9FA] border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-semibold text-[#111827]"
                    >
                      <option value="unverified">⚠ Unverified (Recommended)</option>
                      <option value="demo">✦ Demo / Mock</option>
                      <option value="verified">✓ Verified (Pre-Audited)</option>
                    </select>
                  </div>
                </div>

                {/* Commit Action */}
                <button
                  onClick={async () => {
                    if (csvType === 'colleges') {
                      const res = await importCollegesCSV(parsedColleges, { markAs: csvMarkAs, skipDuplicates: csvSkipDuplicates });
                      setCsvStats(res);
                      setCsvStep('upload');
                      setCsvRawText('');
                    } else {
                      const res = await importCutoffsCSV(parsedCutoffs, { markAs: csvMarkAs, skipDuplicates: csvSkipDuplicates });
                      setCsvStats(res);
                      setCsvStep('upload');
                      setCsvRawText('');
                    }
                  }}
                  className="py-2.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 shrink-0"
                >
                  <Check className="w-4 h-4" />
                  <span>Commit Records to Database</span>
                </button>
              </div>

              {/* Preview Table */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto max-h-[480px]">
                  {csvType === 'colleges' ? (
                    <table className="w-full text-left text-xs text-[#111827]">
                      <thead className="bg-[#F8F9FA] text-[11px] uppercase tracking-wider text-[#64748B] border-b border-slate-200 font-bold sticky top-0">
                        <tr>
                          <th className="py-3 px-3">#</th>
                          <th className="py-3 px-3">Status / Audit</th>
                          <th className="py-3 px-4">College Name</th>
                          <th className="py-3 px-3">Short Name</th>
                          <th className="py-3 px-3">State</th>
                          <th className="py-3 px-3">Category</th>
                          <th className="py-3 px-3">Authority</th>
                          <th className="py-3 px-3">NIRF</th>
                          <th className="py-3 px-3">Tuition</th>
                          <th className="py-3 px-3">Website</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        {parsedColleges.map((row, idx) => (
                          <tr key={idx} className={row._isDuplicate ? 'bg-amber-50/50' : !row._isValid ? 'bg-red-50/50' : 'hover:bg-slate-50'}>
                            <td className="py-2.5 px-3 text-slate-400">{idx + 1}</td>
                            <td className="py-2.5 px-3">
                              {row._isValid ? (
                                row._isDuplicate ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                    Duplicate ID
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                    Valid New
                                  </span>
                                )
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                                  Invalid
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-4 font-sans font-semibold text-[#111827]">{row.name}</td>
                            <td className="py-2.5 px-3">{row.shortName}</td>
                            <td className="py-2.5 px-3 font-sans">{row.state}</td>
                            <td className="py-2.5 px-3 font-sans">{row.categoryType}</td>
                            <td className="py-2.5 px-3 font-sans">{row.counsellingAuthority}</td>
                            <td className="py-2.5 px-3">#{row.nirfRank || '-'}</td>
                            <td className="py-2.5 px-3">₹{Number(row.annualTuitionINR).toLocaleString('en-IN') || '-'}</td>
                            <td className="py-2.5 px-3 text-slate-400 truncate max-w-[150px]">{row.officialWebsite}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left text-xs text-[#111827]">
                      <thead className="bg-[#F8F9FA] text-[11px] uppercase tracking-wider text-[#64748B] border-b border-slate-200 font-bold sticky top-0">
                        <tr>
                          <th className="py-3 px-3">#</th>
                          <th className="py-3 px-3">Validity</th>
                          <th className="py-3 px-3">College ID</th>
                          <th className="py-3 px-3">Branch</th>
                          <th className="py-3 px-3">Exam</th>
                          <th className="py-3 px-2">Year</th>
                          <th className="py-3 px-2">Round</th>
                          <th className="py-3 px-3">Category</th>
                          <th className="py-3 px-2">Quota</th>
                          <th className="py-3 px-3">Opening</th>
                          <th className="py-3 px-3">Closing</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        {parsedCutoffs.map((row, idx) => (
                          <tr key={idx} className={row._isDuplicate ? 'bg-amber-50/50' : !row._isValid ? 'bg-red-50/50' : 'hover:bg-slate-50'}>
                            <td className="py-2.5 px-3 text-slate-400">{idx + 1}</td>
                            <td className="py-2.5 px-3">
                              {row._isValid ? (
                                row._isDuplicate ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                    Duplicate
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                    Valid
                                  </span>
                                )
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800" title={row._error}>
                                  {row._error?.substring(0, 20)}...
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-[#172F91]">{row.collegeId}</td>
                            <td className="py-2.5 px-3 font-bold">{row.branchCode}</td>
                            <td className="py-2.5 px-3 font-sans">{row.exam}</td>
                            <td className="py-2.5 px-2">{row.year}</td>
                            <td className="py-2.5 px-2">R{row.round}</td>
                            <td className="py-2.5 px-3 font-sans">{row.category}</td>
                            <td className="py-2.5 px-2">{row.quota}</td>
                            <td className="py-2.5 px-3">{Number(row.openingRank).toLocaleString('en-IN')}</td>
                            <td className="py-2.5 px-3 font-bold">{Number(row.closingRank).toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: AUTHORITIES REGISTRY                           */}
      {/* ========================================================= */}
      {activeSection === 'authorities' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#111827]">
                Entrance Examination & Counselling Authorities
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Official governing bodies responsible for admission allocation, gazettes, and schedule publications.
              </p>
            </div>

            <button
              onClick={() => {
                setAuthId('');
                setAuthName('');
                setAuthShortName('');
                setAuthConductingBody('');
                setAuthWebsite('https://');
                setAuthExams('JEE Main');
                setAuthTypes('State Government');
                setAuthDesc('');
                setAuthStatus('verified');
                setShowAddAuthorityModal(true);
              }}
              className="py-2.5 px-4 rounded-2xl bg-[#172F91] hover:bg-[#0F1E60] text-white text-xs font-semibold flex items-center gap-2 shadow-xs shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Register Authority</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {authorities.map((auth) => (
              <div key={auth.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DEE5FC] text-[#172F91]">
                      {auth.shortName}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      auth.verificationStatus === 'verified' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {auth.verificationStatus}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#111827] leading-snug">
                    {auth.name}
                  </h3>
                  
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    Conducting Body: <span className="text-slate-800 font-sans">{auth.conductingBody}</span>
                  </div>

                  <p className="text-xs text-[#475569] mt-2.5 line-clamp-3 leading-relaxed">
                    {auth.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {auth.applicableExams.map((ex, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-700">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <a
                    href={auth.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#172F91] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Official Portal</span>
                    <Globe className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingAuthority(auth);
                        setAuthId(auth.id);
                        setAuthName(auth.name);
                        setAuthShortName(auth.shortName);
                        setAuthConductingBody(auth.conductingBody);
                        setAuthWebsite(auth.websiteUrl);
                        setAuthExams(auth.applicableExams.join('; '));
                        setAuthTypes(auth.participatingInstituteTypes.join('; '));
                        setAuthDesc(auth.description);
                        setAuthStatus(auth.verificationStatus);
                      }}
                      className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete authority ${auth.shortName}?`)) {
                          deleteAuthority(auth.id);
                        }
                      }}
                      className="p-1.5 rounded-xl border border-red-200 hover:bg-red-50 text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 4: AUDIT TRAIL LOGS                               */}
      {/* ========================================================= */}
      {activeSection === 'audit' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#111827]">
                System Audit Trail & Modification Records
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Cryptographic immutable log tracking administrative writes, CSV bulk uploads, and status changes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search audit trail..."
                value={auditSearchQuery}
                onChange={(e) => setAuditSearchQuery(e.target.value)}
                className="bg-[#F8F9FA] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#172F91]"
              />

              <select
                value={auditFilterAction}
                onChange={(e) => setAuditFilterAction(e.target.value)}
                className="bg-[#F8F9FA] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#111827]"
              >
                <option value="ALL">All Actions</option>
                <option value="CREATE_COLLEGE">CREATE_COLLEGE</option>
                <option value="UPDATE_COLLEGE">UPDATE_COLLEGE</option>
                <option value="DELETE_COLLEGE">DELETE_COLLEGE</option>
                <option value="IMPORT_COLLEGES_CSV">IMPORT_COLLEGES_CSV</option>
                <option value="IMPORT_CUTOFFS_CSV">IMPORT_CUTOFFS_CSV</option>
                <option value="MANAGE_BRANCH">MANAGE_BRANCH</option>
                <option value="MANAGE_AUTHORITY">MANAGE_AUTHORITY</option>
                <option value="UPDATE_VERIFICATION">UPDATE_VERIFICATION</option>
                <option value="PUBLISH_NOTICE">PUBLISH_NOTICE</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#111827]">
                <thead className="bg-[#F8F9FA] text-[11px] uppercase tracking-wider text-[#64748B] border-b border-slate-200 font-bold">
                  <tr>
                    <th className="py-3 px-4">Timestamp (IST)</th>
                    <th className="py-3 px-3">Admin</th>
                    <th className="py-3 px-3">Action</th>
                    <th className="py-3 px-3">Entity Type</th>
                    <th className="py-3 px-3">Entity ID</th>
                    <th className="py-3 px-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {filteredAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                      <td className="py-3 px-3 font-sans font-semibold text-slate-800">{log.adminEmail}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DEE5FC] text-[#172F91]">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-3 uppercase text-slate-600">{log.entityType}</td>
                      <td className="py-3 px-3 text-[#172F91] font-bold">{log.entityId}</td>
                      <td className="py-3 px-4 font-sans text-slate-700 leading-relaxed max-w-lg">
                        {log.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: ADD COLLEGE RECORD                               */}
      {/* ========================================================= */}
      {showAddCollegeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-2xl max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#111827]">
                Add Engineering College Record
              </h3>
              <button onClick={() => setShowAddCollegeModal(false)} className="text-slate-400 hover:text-[#111827]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCollegeSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Institute Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Indian Institute of Technology Indore"
                    value={newColName}
                    onChange={(e) => setNewColName(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#172F91]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Short Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IIT Indore"
                    value={newColShortName}
                    onChange={(e) => setNewColShortName(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#172F91]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Category Type</label>
                  <select
                    value={newColType}
                    onChange={(e) => setNewColType(e.target.value as InstituteCategory)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-[#111827]"
                  >
                    <option value="IIT">IIT</option>
                    <option value="NIT">NIT</option>
                    <option value="IIIT">IIIT</option>
                    <option value="BITS">BITS</option>
                    <option value="State Government">State Government</option>
                    <option value="Autonomous Private">Autonomous Private</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Counselling Authority</label>
                  <select
                    value={newColAuthority}
                    onChange={(e) => setNewColAuthority(e.target.value as AuthorityType)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-[#111827]"
                  >
                    <option value="JoSAA">JoSAA</option>
                    <option value="CSAB">CSAB</option>
                    <option value="JAC Delhi">JAC Delhi</option>
                    <option value="WBJEEB">WBJEEB</option>
                    <option value="State CET Cell">State CET Cell (MHT-CET)</option>
                    <option value="KEA">KEA (KCET)</option>
                    <option value="UPTAC">UPTAC</option>
                    <option value="BITSAT Council">BITSAT Council</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">State</label>
                  <input
                    type="text"
                    value={newColState}
                    onChange={(e) => setNewColState(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Simrol, Indore"
                    value={newColLocation}
                    onChange={(e) => setNewColLocation(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Established Year</label>
                  <input
                    type="number"
                    value={newColEstablished}
                    onChange={(e) => setNewColEstablished(Number(e.target.value))}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">NIRF Engineering Rank</label>
                  <input
                    type="number"
                    value={newColNirfRank}
                    onChange={(e) => setNewColNirfRank(Number(e.target.value))}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Annual B.Tech Tuition (₹)</label>
                  <input
                    type="number"
                    value={newColTuition}
                    onChange={(e) => setNewColTuition(Number(e.target.value))}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Official Website</label>
                  <input
                    type="text"
                    value={newColWebsite}
                    onChange={(e) => setNewColWebsite(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Source & Provenance Document</label>
                  <input
                    type="text"
                    value={newColSource}
                    onChange={(e) => setNewColSource(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Verification Status</label>
                  <select
                    value={newColStatus}
                    onChange={(e) => setNewColStatus(e.target.value as RecordVerificationStatus)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#111827]"
                  >
                    <option value="unverified">⚠ Unverified (Pending Official Audit)</option>
                    <option value="verified">✓ Verified (Audited Document)</option>
                    <option value="demo">✦ Demo / Synthetic</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddCollegeModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-[#172F91] hover:bg-[#0F1E60] text-white font-semibold text-xs shadow-xs"
                >
                  Save College Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: EDIT COLLEGE RECORD                              */}
      {/* ========================================================= */}
      {editingCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-2xl max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#111827]">
                Edit College: {editingCollege.shortName}
              </h3>
              <button onClick={() => setEditingCollege(null)} className="text-slate-400 hover:text-[#111827]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditCollegeSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Institute Name</label>
                  <input
                    type="text"
                    value={editingCollege.name}
                    onChange={(e) => setEditingCollege({ ...editingCollege, name: e.target.value })}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Short Name</label>
                  <input
                    type="text"
                    value={editingCollege.shortName}
                    onChange={(e) => setEditingCollege({ ...editingCollege, shortName: e.target.value })}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">State</label>
                  <input
                    type="text"
                    value={editingCollege.state}
                    onChange={(e) => setEditingCollege({ ...editingCollege, state: e.target.value })}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">NIRF Rank</label>
                  <input
                    type="number"
                    value={editingCollege.nirfRank}
                    onChange={(e) => setEditingCollege({ ...editingCollege, nirfRank: Number(e.target.value) })}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Verification Status</label>
                  <select
                    value={editingCollege.verificationStatus || 'verified'}
                    onChange={(e) => setEditingCollege({ ...editingCollege, verificationStatus: e.target.value as RecordVerificationStatus })}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#111827]"
                  >
                    <option value="verified">✓ Verified (Audited Document)</option>
                    <option value="unverified">⚠ Unverified (Pending Review)</option>
                    <option value="demo">✦ Demo / Synthetic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Source Document</label>
                  <input
                    type="text"
                    value={editingCollege.sourceDocument || ''}
                    onChange={(e) => setEditingCollege({ ...editingCollege, sourceDocument: e.target.value })}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111827]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCollege(null)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-[#172F91] hover:bg-[#0F1E60] text-white font-semibold text-xs shadow-xs"
                >
                  Update College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: MANAGE BRANCHES FOR A COLLEGE                    */}
      {/* ========================================================= */}
      {managingBranchesCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-2xl max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#111827]">
                  Engineering Branches: {managingBranchesCollege.name} ({managingBranchesCollege.shortName})
                </h3>
                <p className="text-xs text-[#64748B]">
                  Manage offered disciplines, degree programs, approved annual intake, and branch tuition fees.
                </p>
              </div>
              <button onClick={() => setManagingBranchesCollege(null)} className="text-slate-400 hover:text-[#111827]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              
              {/* Add Branch Form */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-3">
                <div className="text-[11px] uppercase font-bold text-[#172F91] tracking-wider">
                  + Add New Branch to {managingBranchesCollege.shortName}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Branch Code *</label>
                    <input
                      type="text"
                      placeholder="e.g. AI-DS"
                      value={newBranchCode}
                      onChange={(e) => setNewBranchCode(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Branch Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Artificial Intelligence and Data Science"
                      value={newBranchName}
                      onChange={(e) => setNewBranchName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Seats Intake</label>
                    <input
                      type="number"
                      value={newBranchSeats}
                      onChange={(e) => setNewBranchSeats(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Annual Tuition (₹)</label>
                    <input
                      type="number"
                      value={newBranchTuition}
                      onChange={(e) => setNewBranchTuition(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Hostel Fee (₹)</label>
                    <input
                      type="number"
                      value={newBranchHostel}
                      onChange={(e) => setNewBranchHostel(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Status</label>
                    <select
                      value={newBranchStatus}
                      onChange={(e) => setNewBranchStatus(e.target.value as RecordVerificationStatus)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2 py-2 text-xs font-semibold"
                    >
                      <option value="unverified">Unverified</option>
                      <option value="verified">Verified</option>
                      <option value="demo">Demo</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!newBranchCode.trim() || !newBranchName.trim()) {
                          showToast('Branch code and name required', 'warning');
                          return;
                        }
                        await addCollegeBranch(managingBranchesCollege.id, {
                          branchCode: newBranchCode.trim().toUpperCase(),
                          branchName: newBranchName.trim(),
                          degree: newBranchDegree,
                          durationYears: newBranchDuration,
                          annualTuitionINR: newBranchTuition,
                          hostelFeeAnnualINR: newBranchHostel,
                          oneTimeAdmissionFeeINR: 15000,
                          seats: newBranchSeats,
                          verificationStatus: newBranchStatus
                        });
                        setNewBranchCode('');
                        setNewBranchName('');
                        // Update active modal college view
                        const updated = colleges.find(c => c.id === managingBranchesCollege.id);
                        if (updated) setManagingBranchesCollege(updated);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-[#172F91] hover:bg-[#0F1E60] text-white font-semibold text-xs shadow-xs"
                    >
                      + Add Branch
                    </button>
                  </div>
                </div>
              </div>

              {/* Existing Branches Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F9FA] text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Code</th>
                      <th className="py-2.5 px-3">Branch Name</th>
                      <th className="py-2.5 px-3">Degree</th>
                      <th className="py-2.5 px-3">Seats</th>
                      <th className="py-2.5 px-3">Tuition / Year</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {managingBranchesCollege.courses.map((b) => (
                      <tr key={b.branchCode} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-[#172F91]">{b.branchCode}</td>
                        <td className="py-2.5 px-3 font-sans font-medium text-[#111827]">{b.branchName}</td>
                        <td className="py-2.5 px-3 font-sans">{b.degree} ({b.durationYears}y)</td>
                        <td className="py-2.5 px-3">{b.seats || 60}</td>
                        <td className="py-2.5 px-3">₹{b.annualTuitionINR.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.verificationStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {b.verificationStatus || 'verified'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={async () => {
                              if (window.confirm(`Delete branch ${b.branchCode}?`)) {
                                await deleteCollegeBranch(managingBranchesCollege.id, b.branchCode);
                                const updated = colleges.find(c => c.id === managingBranchesCollege.id);
                                if (updated) setManagingBranchesCollege(updated);
                              }
                            }}
                            className="p-1 rounded-lg hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: MANAGE CUTOFFS FOR A COLLEGE                     */}
      {/* ========================================================= */}
      {managingCutoffsCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-2xl max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#111827]">
                  Cutoff Records: {managingCutoffsCollege.shortName}
                </h3>
                <p className="text-xs text-[#64748B]">
                  Manage entrance exam round-wise opening and closing ranks for this institution.
                </p>
              </div>
              <button onClick={() => setManagingCutoffsCollege(null)} className="text-slate-400 hover:text-[#111827]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              
              {/* Add Cutoff Form */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-3">
                <div className="text-[11px] uppercase font-bold text-emerald-800 tracking-wider">
                  + Add Cutoff Tuple to {managingCutoffsCollege.shortName}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Branch Code</label>
                    <input
                      type="text"
                      value={newCutoffBranch}
                      onChange={(e) => setNewCutoffBranch(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Exam</label>
                    <select
                      value={newCutoffExam}
                      onChange={(e) => setNewCutoffExam(e.target.value as ExamType)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs"
                    >
                      <option value="JEE Main">JEE Main</option>
                      <option value="JEE Advanced">JEE Advanced</option>
                      <option value="BITSAT">BITSAT</option>
                      <option value="MHT-CET">MHT-CET</option>
                      <option value="WBJEE">WBJEE</option>
                      <option value="KCET">KCET</option>
                      <option value="UPTAC">UPTAC</option>
                      <option value="JAC Delhi">JAC Delhi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Year</label>
                    <input
                      type="number"
                      value={newCutoffYear}
                      onChange={(e) => setNewCutoffYear(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Round</label>
                    <input
                      type="number"
                      value={newCutoffRound}
                      onChange={(e) => setNewCutoffRound(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Opening Rank</label>
                    <input
                      type="number"
                      value={newCutoffOpeningRank}
                      onChange={(e) => setNewCutoffOpeningRank(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Closing Rank</label>
                    <input
                      type="number"
                      value={newCutoffClosingRank}
                      onChange={(e) => setNewCutoffClosingRank(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Status</label>
                    <select
                      value={newCutoffStatus}
                      onChange={(e) => setNewCutoffStatus(e.target.value as RecordVerificationStatus)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold"
                    >
                      <option value="unverified">Unverified</option>
                      <option value="verified">Verified</option>
                      <option value="demo">Demo</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={async () => {
                        await addCutoffRecord(managingCutoffsCollege.id, {
                          branchCode: newCutoffBranch,
                          exam: newCutoffExam,
                          year: newCutoffYear,
                          round: newCutoffRound,
                          category: newCutoffCategory,
                          quota: newCutoffQuota,
                          seatPool: newCutoffSeatPool,
                          openingRank: newCutoffOpeningRank,
                          closingRank: newCutoffClosingRank,
                          source: newCutoffSource,
                          verificationStatus: newCutoffStatus
                        });
                        const updated = colleges.find(c => c.id === managingCutoffsCollege.id);
                        if (updated) setManagingCutoffsCollege(updated);
                      }}
                      className="w-full py-1.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs"
                    >
                      + Add Cutoff
                    </button>
                  </div>
                </div>
              </div>

              {/* Cutoffs Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-[350px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F9FA] text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200 sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Branch</th>
                      <th className="py-2.5 px-3">Exam</th>
                      <th className="py-2.5 px-2">Yr</th>
                      <th className="py-2.5 px-2">Rd</th>
                      <th className="py-2.5 px-3">Category / Quota</th>
                      <th className="py-2.5 px-3">Ranks</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {managingCutoffsCollege.cutoffs.map((cut, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-[#172F91]">{cut.branchCode}</td>
                        <td className="py-2.5 px-3 font-sans">{cut.exam || 'JEE Main'}</td>
                        <td className="py-2.5 px-2">{cut.year}</td>
                        <td className="py-2.5 px-2">R{cut.round}</td>
                        <td className="py-2.5 px-3 font-sans">{cut.category} ({cut.quota})</td>
                        <td className="py-2.5 px-3">{cut.openingRank.toLocaleString('en-IN')} - <strong className="text-[#111827]">{cut.closingRank.toLocaleString('en-IN')}</strong></td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            cut.verificationStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {cut.verificationStatus || 'verified'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={async () => {
                              await deleteCutoffRecord(managingCutoffsCollege.id, idx);
                              const updated = colleges.find(c => c.id === managingCutoffsCollege.id);
                              if (updated) setManagingCutoffsCollege(updated);
                            }}
                            className="p-1 rounded-lg hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: ADD / EDIT COUNSELLING AUTHORITY                 */}
      {/* ========================================================= */}
      {(showAddAuthorityModal || editingAuthority) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-2xl max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#111827]">
                {editingAuthority ? `Edit Authority: ${editingAuthority.shortName}` : 'Register Counselling Authority'}
              </h3>
              <button 
                onClick={() => { setShowAddAuthorityModal(false); setEditingAuthority(null); }}
                className="text-slate-400 hover:text-[#111827]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const item: CounsellingAuthorityItem = {
                  id: authId.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `auth-${Date.now()}`,
                  name: authName,
                  shortName: authShortName,
                  conductingBody: authConductingBody,
                  websiteUrl: authWebsite,
                  applicableExams: authExams.split(';').map(s => s.trim()).filter(Boolean),
                  participatingInstituteTypes: authTypes.split(';').map(s => s.trim()).filter(Boolean),
                  description: authDesc,
                  isActive: true,
                  verificationStatus: authStatus,
                  lastVerifiedAt: 'Just now'
                };

                if (editingAuthority) {
                  await updateAuthority(item);
                } else {
                  await addAuthority(item);
                }

                setShowAddAuthorityModal(false);
                setEditingAuthority(null);
              }}
              className="p-6 overflow-y-auto space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Authority ID / Slug *</label>
                  <input
                    type="text"
                    required
                    disabled={Boolean(editingAuthority)}
                    placeholder="e.g. josaa, csab, wbjeeb"
                    value={authId}
                    onChange={(e) => setAuthId(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Short Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. JoSAA"
                    value={authShortName}
                    onChange={(e) => setAuthShortName(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Governing Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Joint Seat Allocation Authority"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Conducting Body</label>
                  <input
                    type="text"
                    placeholder="e.g. Ministry of Education"
                    value={authConductingBody}
                    onChange={(e) => setAuthConductingBody(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Official Portal URL</label>
                  <input
                    type="text"
                    value={authWebsite}
                    onChange={(e) => setAuthWebsite(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Applicable Exams (Semicolon separated)</label>
                  <input
                    type="text"
                    placeholder="JEE Main; JEE Advanced"
                    value={authExams}
                    onChange={(e) => setAuthExams(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Description & Mandate</label>
                  <textarea
                    rows={3}
                    value={authDesc}
                    onChange={(e) => setAuthDesc(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowAddAuthorityModal(false); setEditingAuthority(null); }}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-[#172F91] hover:bg-[#0F1E60] text-white font-semibold text-xs shadow-xs"
                >
                  Save Authority
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
