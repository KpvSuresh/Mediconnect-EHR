import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import PatientList from './pages/PatientList'
import PatientOverview from './pages/PatientOverview'
import AccessAudit from './pages/AccessAudit'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
          
          {/* LOGO AREA */}
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
              MediConnect
            </h1>
            <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-1">
              EHR Management
            </h2>
          </div>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {[
              { to: "/patients", label: "Directory" },
              { to: "/patient/P-10293", label: "Overview" },
              { to: "/access/P-10293", label: "Access & Audit" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition-all ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/patients" replace />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patient/:id" element={<PatientOverview />} />
          <Route path="/access/:id" element={<AccessAudit />} />
        </Routes>
      </main>
    </div>
  )
}