
// import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
// import PatientList from './pages/PatientList'
// import PatientOverview from './pages/PatientOverview'
// import AccessAudit from './pages/AccessAudit'

// export default function App(){
//   return (
//     <div>
//       <header className="bg-white border-b border-slate-200">
//         <div className="container-narrow flex items-center justify-between py-4">
//           <div className="flex items-center gap-3">
//             {/* <div className="h-8 w-8 rounded bg-brand-600"></div> */}
//             <h1 className="text-xl font-semibold text-slate-800">MediConnect</h1>
//             <h1 className="text-xl font-semibold text-slate-800">EHR Management</h1>
//           </div>
//           <nav className="flex items-center gap-4">
//             <NavLink to="/patients" className={({isActive}) => (isActive? 'text-brand-700 font-medium' : 'text-slate-600 hover:text-slate-900')}>Patients</NavLink>
//                         <NavLink to="/patient/P-10293" className={({isActive}) => (isActive? 'text-brand-700 font-medium' : 'text-slate-600 hover:text-slate-900')}>Patient Overview</NavLink>
            
//             <NavLink to="/access/P-10293" className={({isActive}) => (isActive? 'text-brand-700 font-medium' : 'text-slate-600 hover:text-slate-900')}>Doctor Access & Audit</NavLink>
//           </nav>
//         </div>
//       </header>
//       <main className="container-narrow py-6">
//         <Routes>
//           <Route path="/" element={<Navigate to="/patients" replace />} />
//           <Route path="/patients" element={<PatientList/>} />
//           <Route path="/patient/:id" element={<PatientOverview/>} />
//           <Route path="/access/:id" element={<AccessAudit/>} />
//         </Routes>
//       </main>
//     </div>
//   )
// }


// import { useState, useEffect } from 'react'
// import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
// import PatientList from './pages/PatientList'
// import PatientOverview from './pages/PatientOverview'
// import AccessAudit from './pages/AccessAudit'

// export default function App() {
//   const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark')

//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add('dark')
//       localStorage.setItem('theme', 'dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//       localStorage.setItem('theme', 'light')
//     }
//   }, [isDark])

//   return (
//     <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
//       <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-slate-200'}`}>
//         <div className="container-narrow flex items-center justify-between py-4">
//           <div className="flex items-center gap-3">
//             <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white font-bold">M</div>
//             <h1 className="text-xl font-bold tracking-tight">MediConnect</h1>
//           </div>
          
//           <nav className="flex items-center gap-8">
//             <div className="hidden md:flex items-center gap-6">
//               <NavLink to="/patients" className={({isActive}) => isActive ? 'text-blue-500 font-semibold' : 'text-slate-500 hover:text-blue-400 transition-colors'}>Patients</NavLink>
//               <NavLink to="/patient/P-10293" className={({isActive}) => isActive ? 'text-blue-500 font-semibold' : 'text-slate-500 hover:text-blue-400 transition-colors'}>Overview</NavLink>
//             </div>

//             {/* STYLISH TOGGLE SWITCH */}
//             <button 
//               onClick={() => setIsDark(!isDark)}
//               className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none shadow-inner ${isDark ? 'bg-indigo-600' : 'bg-slate-300'}`}
//             >
//               <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-7' : 'translate-x-0'}`}>
//                 {isDark ? '🌙' : '☀️'}
//               </div>
//             </button>
//           </nav>
//         </div>
//       </header>

//       <main className="container-narrow py-8">
//         <Routes>
//           <Route path="/" element={<Navigate to="/patients" replace />} />
//           <Route path="/patients" element={<PatientList isDark={isDark}/>} />
//           <Route path="/patient/:id" element={<PatientOverview isDark={isDark}/>} />
//           <Route path="/access/:id" element={<AccessAudit isDark={isDark}/>} />
//         </Routes>
//       </main>
//     </div>
//   )
// }



// import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
// import PatientList from './pages/PatientList'
// import PatientOverview from './pages/PatientOverview'
// import AccessAudit from './pages/AccessAudit'

// export default function App(){
//   return (
//     // Body transition ensures dark mode switching looks smooth
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
//       <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
//         <div className="container-narrow flex items-center justify-between py-4">
//           <div className="flex items-center gap-3">
//             <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">MediConnect</h1>
//             <span className="text-slate-300 dark:text-slate-700">|</span>
//             <h1 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">EHR Management</h1>
//           </div>
//           <nav className="flex items-center gap-4">
//             <NavLink to="/patients" className={({isActive}) => (isActive? 'text-blue-600 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-blue-500')}>Patients</NavLink>
//             <NavLink to="/patient/P-10293" className={({isActive}) => (isActive? 'text-blue-600 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-blue-500')}>Overview</NavLink>
//             <NavLink to="/access/P-10293" className={({isActive}) => (isActive? 'text-blue-600 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-blue-500')}>Audit</NavLink>
//           </nav>
//         </div>
//       </header>

//       {/* WRAPPER START: 
//           We add the 'medical-theme' class here so that the CSS rules 
//           from your stylesheet only apply to the pages inside this main block.
//       */}
//       <main className="medical-theme container-narrow py-6">
//         <Routes>
//           <Route path="/" element={<Navigate to="/patients" replace />} />
//           <Route path="/patients" element={<PatientList/>} />
//           <Route path="/patient/:id" element={<PatientOverview/>} />
//           <Route path="/access/:id" element={<AccessAudit/>} />
//         </Routes>
//       </main>
//       {/* WRAPPER END */}
//     </div>
//   )
// }


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