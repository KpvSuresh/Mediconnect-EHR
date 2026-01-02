// import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
// import PatientList from './pages/PatientList'
// import PatientOverview from './pages/PatientOverview'
// import AccessAudit from './pages/AccessAudit'

// export default function App() {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-[100]">
//         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
          
//           {/* LOGO AREA */}
//           <div className="flex flex-col">
//             <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
//               MediConnect
//             </h1>
//             <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-1">
//               EHR Management
//             </h2>
//           </div>

//           {/* NAVIGATION */}
//           <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
//             {[
//               { to: "/patients", label: "Directory" },
//               { to: "/patient/P-10293", label: "Overview" },
//               { to: "/access/P-10293", label: "Access & Audit" },
//             ].map((link) => (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 className={({ isActive }) =>
//                   `px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition-all ${
//                     isActive
//                       ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
//                       : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
//                   }`
//                 }
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//           </nav>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         <Routes>
//           <Route path="/" element={<Navigate to="/patients" replace />} />
//           <Route path="/patients" element={<PatientList />} />
//           <Route path="/patient/:id" element={<PatientOverview />} />
//           <Route path="/access/:id" element={<AccessAudit />} />
//         </Routes>
//       </main>
//     </div>
//   )
// }

import { NavLink, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom'
import PatientList from './pages/PatientList'
import PatientOverview from './pages/PatientOverview'
import AccessAudit from './pages/AccessAudit'

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* GLOBAL CLINICAL HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
          
          {/* BRANDING */}
          <div className="flex flex-col cursor-pointer" onClick={() => navigate('/dashboard')}>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
              MediConnect
            </h1>
            <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-1">
              EHR Management
            </h2>
          </div>

          {/* MAIN NAVIGATION */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shadow-inner">
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/patients", label: "Patient Directory" },
              { to: "/patient/P-10293", label: "Current File" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-5 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* DOCTOR EHR INTRO PAGE */}
          <Route path="/dashboard" element={
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* CLINICAL IDENTITY */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  Secure Provider Portal
                </div>
                <h1 className="text-5xl font-black text-slate-950 tracking-tighter">
                  Welcome, Dr. Patel
                </h1>
                <p className="text-lg text-slate-500 font-medium">
                  Surgery & Critical Care Department • St. Mary's Medical Center
                </p>
              </div>

              {/* CORE METRICS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Active Inpatients", val: "08", sub: "Requires Rounds", color: "text-blue-600" },
                  { label: "Pending Consents", val: "03", sub: "Action Required", color: "text-rose-600" },
                  { label: "Total Records", val: "142", sub: "Database Access", color: "text-slate-950" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center group hover:border-blue-300 transition-colors">
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">{stat.label}</div>
                    <div className={`text-4xl font-black ${stat.color} mb-1`}>{stat.val}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* PRIMARY ENTRY POINT */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-slate-950 rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-2xl font-black tracking-tight">Patient EHR Directory</h2>
                    <p className="text-slate-400 font-medium max-w-sm">
                      Access comprehensive longitudinal health records, diagnostic histories, and clinical audits.
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate('/patients')}
                    className="w-full md:w-auto bg-blue-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-900/20"
                  >
                    Enter Database
                  </button>
                </div>
              </div>

              {/* SYSTEM FOOTER INFO */}
              <div className="flex items-center justify-center gap-6 pt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  System Online
                </div>
                <span>•</span>
                <div>HIPAA Compliant</div>
                <span>•</span>
                <div>Last Sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>

            </div>
          } />

          {/* FUNCTIONAL ROUTES */}
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patient/:id" element={<PatientOverview />} />
          <Route path="/access/:id" element={<AccessAudit />} />
        </Routes>
      </main>
    </div>
  )
}