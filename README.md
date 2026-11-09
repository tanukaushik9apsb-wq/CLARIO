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
clario/
├── public/                 # Static assets and icons
├── src/
│   ├── components/
│   │   ├── auth/           # Login / Signup modals with Student, Mentor, and Admin roles
│   │   ├── colleges/       # Predictor wizard, Cutoff viewer, College comparison, Choice workspace
│   │   ├── common/         # Navbar, Toast notifications, Badges, Category chips
│   │   ├── community/      # Community forum, threads, nested replies, bookmarks, reporting
│   │   ├── dashboard/      # Role-based dashboards (Student, Mentor, and Admin)
│   │   ├── landing/        # Bento hero, best-fit college generator, editorial stats
│   │   ├── mentors/        # Mentor marketplace, booking modal, mock video room, review modal
│   │   ├── reviews/        # Student reviews, institute ratings, submission modal
│   │   └── updates/        # Centralized authority notices, gazettes, calendar deadlines
│   ├── context/            # Global AppContext (auth, bookings, slots, reviews, moderation)
│   ├── data/               # Seed data for colleges, cutoffs, placements, mentors, threads
│   ├── lib/                # Supabase client, storage service, moderation service, query helpers
│   ├── types/              # Domain TypeScript interfaces and database types
│   ├── App.tsx             # Primary layout router, view switching, modal handlers
│   └── main.tsx            # Application entry point
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql                # Base DDL: colleges, cutoffs, profiles, bookings
│   │   └── 002_mentorship_community_storage.sql  # Mentorship lifecycle, reviews, storage bucket, moderation
│   ├── seed.sql                                  # Standalone SQL seed file
│   └── setup_and_seed.sql                        # Single-run master script for Supabase SQL Editor
├── scripts/
│   └── test-connection.cjs                       # CLI connection and health test script
├── index.html                                    # HTML shell with Cormorant & Plus Jakarta fonts
├── package.json                                  # Scripts and dependencies
└── tailwind.config.js                            # Tailwind styling configuration
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- A free **Supabase** account (if running your own cloud instance)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repo-url>
cd clario
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
```
> **Note**: An active live Supabase project is already configured by default in `.env.local`. You can test connectivity anytime with:
```bash
npm run test:supabase
```

### 4. Running the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 🗄️ Database Setup & Supabase Migrations

If setting up a fresh Supabase project:

1. Open your **Supabase Dashboard** -> **SQL Editor**.
2. Open `supabase/setup_and_seed.sql` in this repo, copy all contents, paste into the SQL Editor, and click **Run**.
3. This creates:
   - **Enums**: `user_role`, `exam_type`, `category_type`, `seat_pool_type`, `booking_status`.
   - **Tables**: `profiles`, `colleges`, `courses`, `cutoffs`, `placement_records`, `mentor_profiles`, `mentor_slots`, `consultation_bookings`, `community_threads`, `community_replies`, `counselling_updates`, `calendar_deadlines`, `moderation_reports`, `counselling_authorities`, `admin_audit_logs`.
   - **Storage Bucket**: `mentor-verification-docs` (private 10MB bucket for student ID cards).
   - **Row Level Security (RLS)**: Fine-grained policies ensuring mentors can only see/upload their own student ID documents while admins have full inspection, write, and moderation privileges.
   - **Admin Data Management**: Direct UI control over colleges, branches, cutoff imports, authorities registry, and immutable audit logs without editing source code.
   - **Initial Seed Records**: Premier Indian institutes (IIT Bombay, IIT Delhi, NIT Trichy, IIIT Hyderabad, BITS Pilani, COEP Pune, Jadavpur University, RVCE Bangalore, DTU Delhi), authentic cutoff samples, placement reports, and official notices.

---

## 👥 Personas & Demo Accounts

Clario includes ready-to-test personas accessible via the **Login Modal** or the **Role Switcher** in the top navigation:

| Role | Demo Email | Password | Key Features Accessible |
|---|---|---|---|
| **Aspirant / Student** | `student@clario.in` | `DemoPass123!` | Shortlist generator, Choice order workspace, 1-on-1 session booking, meeting room, session reviews, saved bookmarks |
| **College Mentor** | `mentor@clario.in` | `DemoPass123!` | Session requests (Accept / Decline), slot manager, student ID credential upload (Storage bucket), profile & INR fee editor |
| **Platform Admin** | `admin@clario.gov.in` | `DemoPass123!` | Mentor verification queue with ID preview, community moderation queue, official notice broadcaster |

*(You can also sign up with any new custom email address under any role).*

---

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

## 🚀 Deployment Guide

### Deploying to Vercel

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: Clario production release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/clario.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**.
3. Import your `clario` GitHub repository.
4. Under **Build and Output Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: `https://<your-project-ref>.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `<your-anon-public-key>`
6. Click **Deploy**.

### Deploying to Netlify

1. Connect your repository in [netlify.com](https://netlify.com).
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables in **Site configuration** -> **Environment variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy the site.

---

## 📄 License & Attribution
Designed and built for Indian engineering aspirants. MIT License.
