# Clario — Integrated Engineering College Counselling & Mentorship Platform

**Clario** is an India-focused, data-backed engineering college discovery, counselling guidance, and verified 1-on-1 student mentorship platform built specifically for Indian entrance examinations (**JEE Main, JEE Advanced, BITSAT, WBJEE, MHT-CET, KCET, UPTAC, JAC Delhi**).

The platform addresses the severe information asymmetry faced by Indian engineering aspirants by providing:
1. **Centralized Counselling Intelligence**: Real historical cutoff data, verified authority notifications (JoSAA, CSAB, WBJEEB, KEA, MHT-CET Cell, AKTU), and round-wise deadline tracking.
2. **Deterministic College Predictor**: Strict rank/percentile compatibility checks matching examination systems, category/quotas (Home State vs Other State, AI, GOVT), and seat pools without cross-exam pollution.
3. **Verified 1-on-1 Student Mentorship**: Connects aspirants with real current engineering undergraduates from premier colleges with verifiable student credentials.
4. **Peer Community Forum**: Admission Q&A, branch comparisons, round-by-round betterment advice, and community reporting.

---

## 🏗️ Technology Stack & Architecture

- **Frontend Framework**: React 18 + TypeScript + Vite
- **Styling Architecture**: Tailwind CSS with Editorial Bento Light design language (`#E5E7EB` canvas, `rounded-3xl` cards, Cormorant Garamond serif headings, Plus Jakarta Sans text, `#172F91` brand palette)
- **Database & Backend**: Supabase (PostgreSQL 15+, Supabase Auth, Row Level Security, Supabase Storage)
- **Icons**: Lucide React
- **Client Resilience**: Hybrid database architecture with automatic local caching, seed data fallback, and zero crash states if offline.

```text

## 🎯 Key Capabilities

### 1. India-Specific College Predictor
- Filters specifically by entrance exam (**JEE Main, JEE Advanced, BITSAT, WBJEE, MHT-CET, KCET, UPTAC, JAC Delhi**).
- Applies Indian category reservation rules: **General (OPEN), GEN-EWS, OBC-NCL, SC, ST, PwD**.
- Enforces Home State (HS) vs Other State (OS) / All India (AI) quotas and Gender-Neutral vs Female-Only supernumerary pools.
- Categorizes results into **Reach**, **Target**, and **Safer** tiers using realistic cutoff rank bands.
- Clearly states cutoff year, counselling round (e.g. JoSAA Round 6), and provenance.

### 2. Multi-College Comparison Matrix
- Compare up to **4 colleges side-by-side**.
- Comprehensive metrics: Annual Tuition (₹), Median & Highest CTC (₹ LPA), NIRF Ranking, Student-to-Faculty Ratio, Campus Size, Hostel Fees, and accepted entrance tests.

### 3. Interactive Choice List Workspace
- Drag-and-drop preference ordering.
- Automated validation checks: quota conflicts, home state verification, and duplicate branch selections.
- Instant export to **CSV**, **JSON**, and **JoSAA Preference Format** for official portal locking.

### 4. Verified 1-on-1 Mentorship Ecosystem
- Discover mentors by college, engineering branch, academic year, and expertise areas.
- **Booking Flow**: Slot selection -> discussion topic selection -> coupon code -> simulated instant confirmation -> downloadable `.ics` calendar invite.
- **Live Video Consultation**: High-definition simulation with audio/video toggles, screen share, interactive shared notepad, and in-call messaging.
- **Post-Session Reviews**: Aspirants rate 1–5 stars and submit detailed feedback which dynamically recalibrates mentor reputation.

### 5. Secure Credential Verification (Supabase Storage)
- Mentors upload institute ID cards or semester marksheets to the private `mentor-verification-docs` storage bucket.
- Protected by RLS: documents are private and strictly accessible only to the mentor who uploaded them and platform administrators.
- Admin dashboard allows viewing/inspecting documents with 1-click **Approve** (bestowing the Verified Badge) or **Reject** with audit notes.

### 6. Peer Community Discussion Forum
- Indian engineering admission threads tagged by topic (JoSAA Round 1, Branch vs College, Domicile Quota, Fee Waivers).
- Upvoting, nested multi-author replies, user bookmarking.
- Moderation reporting tool with automated dispatch to Admin review queue.

### 7. Dedicated Admin Data Management Module
- **Zero Source Code Edits**: Full administrative CRUD operations for Colleges, Engineering Branches, and Counselling Authorities directly through the UI.
- **Bulk CSV Data Importers**: Client-side schema validation, duplicate detection, and live table preview before persisting.
- **Mandatory Audit & Verification Guardrails**: Imported records are never automatically marked as verified (defaulting to `Unverified`), tracking provenance and last audited timestamp.
- **System Audit Trail**: Cryptographic chronological logging of all administrative mutations (`CREATE_COLLEGE`, `IMPORT_CSV`, `UPDATE_VERIFICATION`, `MANAGE_BRANCH`, etc.) protected by Supabase RLS.

---

## ⚖️ Data Provenance & Synthetic Disclaimer

> **IMPORTANT NOTICE FOR USERS & EVALUATORS**:
> - All cutoff ranks, fee figures, and placement statistics in this platform are historical reference data or realistic synthetic models curated for demonstration purposes.
> - Previous year cutoffs **do not guarantee admission**. Actual seat allotment depends on current-year exam difficulty, applicant pool size, seat matrix revisions, and official counselling rounds.
> - Mentors and community threads tagged with the **Demo / Simulated** badge represent synthetic sample profiles created to test the ecosystem workflows.
> - Official choice locking must always be completed directly on authorized portals (**josaa.nic.in**, **csab.nic.in**, **mahacet.org**, **cetonline.karnataka.gov.in**, **wbjeeb.nic.in**).

---
