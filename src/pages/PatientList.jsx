
// import { useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { PATIENT_LIST } from '../data/db'

// export default function PatientList(){
//   const [q, setQ] = useState('')
//   const navigate = useNavigate()

//   const rows = useMemo(() => {
//     if(!q.trim()) return PATIENT_LIST
//     const needle = q.toLowerCase()
//     return PATIENT_LIST.filter(p => (
//       p.name.toLowerCase().includes(needle) || p.id.toLowerCase().includes(needle) || (p.primaryDiagnosis||'').toLowerCase().includes(needle)
//     ))
//   }, [q])

//   return (
//     <div className="space-y-4">
//       <div className="card p-4">
//         <div className="flex items-center justify-between">
//           <h2 className="card-title">Patients</h2>
//           <input className="input max-w-sm" placeholder="Search by name / ID / diagnosis" value={q} onChange={e=>setQ(e.target.value)} />
//         </div>
//       </div>

//       <div className="card p-4 overflow-x-auto">
//         <table className="table">
//           <thead>
//             <tr>
//               <th className="th">Patient</th>
//               <th className="th">DOB</th>
//               <th className="th">Sex</th>
//               <th className="th">Blood</th>
//               <th className="th">Status</th>
//               <th className="th">Primary Diagnosis</th>
//               <th className="th">Last Updated</th>
//               <th className="th">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map(r => (
//               <tr key={r.id}>
//                 <td className="td">{r.name} <span className="text-slate-500">({r.id})</span></td>
//                 <td className="td">{r.dob}</td>
//                 <td className="td">{r.sex}</td>
//                 <td className="td">{r.bloodGroup}</td>
//                 <td className="td"><span className="badge badge-yellow">{r.status}</span></td>
//                 <td className="td">{r.primaryDiagnosis}</td>
//                 <td className="td">{new Date(r.lastUpdated).toLocaleString()}</td>
//                 <td className="td">
//                   <button className="btn btn-primary" onClick={()=>navigate(`/patient/${r.id}`)}>Open Record</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }




// import { useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { DB } from '../data/db'

// export default function PatientList() {
//   const [q, setQ] = useState('')
//   const navigate = useNavigate()

//   // Convert DB object to array for listing
//   const PATIENT_LIST = useMemo(() => {
//     return Object.values(DB).map(entry => ({
//       ...entry.patient,
//       primaryDiagnosis: entry.summary.primaryDiagnosis,
//       lastUpdated: entry.summary.updatedAt
//     }))
//   }, [])

//   const rows = useMemo(() => {
//     if (!q.trim()) return PATIENT_LIST
//     const needle = q.toLowerCase()
//     return PATIENT_LIST.filter(p => (
//       p.name.toLowerCase().includes(needle) || 
//       p.id.toLowerCase().includes(needle) || 
//       (p.primaryDiagnosis || '').toLowerCase().includes(needle)
//     ))
//   }, [q, PATIENT_LIST])

//   // Helper for Status Badge styling
//   const getStatusClass = (status) => {
//     const base = "px-3 py-1 rounded-full text-xs font-bold transition-all "
//     switch (status) {
//       case 'Inpatient': return base + "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
//       case 'Active': return base + "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
//       case 'Outpatient': return base + "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
//       default: return base + "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
//     }
//   }

//   return (
//     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
//       {/* 1. Page Header & Stats */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
//             Patient Directory
//           </h1>
//           <p className="text-slate-500 dark:text-slate-400 mt-1">
//             Real-time management of {PATIENT_LIST.length} total records
//           </p>
//         </div>

//         {/* Quick Stats Bar */}
//         <div className="flex gap-4">
//           <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3">
//              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//              <span className="text-sm font-semibold">{PATIENT_LIST.filter(p => p.status === 'Active').length} Active</span>
//           </div>
//           <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3">
//              <div className="w-2 h-2 rounded-full bg-rose-500" />
//              <span className="text-sm font-semibold">{PATIENT_LIST.filter(p => p.status === 'Inpatient').length} Inpatients</span>
//           </div>
//         </div>
//       </div>

//       {/* 2. Search Box */}
//       <div className="relative group">
//         <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
//           <svg className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//         <input 
//           className="w-full pl-12 pr-4 py-4 rounded-2xl border-none ring-1 ring-slate-200 dark:ring-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl focus:ring-2 focus:ring-blue-500 shadow-xl shadow-slate-200/40 dark:shadow-none transition-all outline-none text-lg" 
//           placeholder="Search by name, ID, or diagnosis..." 
//           value={q} 
//           onChange={e => setQ(e.target.value)} 
//         />
//       </div>

//       {/* 3. Modern Table Card */}
//       <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-50 dark:bg-slate-900/50">
//                 <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Patient Info</th>
//                 <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Demographics</th>
//                 <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Care Status</th>
//                 <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Primary Diagnosis</th>
//                 <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Last Activity</th>
//                 <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
//               {rows.map(r => (
//                 <tr key={r.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors group">
//                   <td className="p-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
//                         {r.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-bold text-slate-800 dark:text-slate-100 leading-tight">{r.name}</div>
//                         <div className="text-xs font-mono text-slate-400 tracking-tighter uppercase">{r.id}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{r.sex} • {r.dob}</div>
//                     <div className="text-xs text-slate-400">Blood Group: <span className="font-bold text-slate-500">{r.bloodGroup}</span></div>
//                   </td>
//                   <td className="p-4">
//                     <span className={getStatusClass(r.status)}>{r.status}</span>
//                   </td>
//                   <td className="p-4">
//                     <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 truncate max-w-[150px]">
//                       {r.primaryDiagnosis}
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <div className="text-xs text-slate-500 dark:text-slate-400">
//                       {new Date(r.lastUpdated).toLocaleDateString()}
//                     </div>
//                     <div className="text-[10px] text-slate-400 uppercase">
//                       {new Date(r.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </div>
//                   </td>
//                   <td className="p-4 text-right">
//                     <button 
//                       className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all active:scale-95 shadow-md shadow-blue-600/20"
//                       onClick={() => navigate(`/patient/${r.id}`)}
//                     >
//                       <span>Open</span>
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           {rows.length === 0 && (
//             <div className="p-12 text-center">
//               <div className="inline-block p-4 rounded-full bg-slate-50 dark:bg-slate-900 mb-4">
//                 <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
//               </div>
//               <h3 className="text-lg font-bold text-slate-400">No patients found</h3>
//               <p className="text-slate-500 text-sm">Try adjusting your search terms</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
// import { useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { DB } from '../data/db'

// export default function PatientList() {
//   const [q, setQ] = useState('')
//   const navigate = useNavigate()

//   // 1. Transform DB object into a flat array for the table
//   const PATIENT_LIST = useMemo(() => {
//     return Object.values(DB).map(entry => ({
//       ...entry.patient,
//       primaryDiagnosis: entry.summary.primaryDiagnosis,
//       lastUpdated: entry.summary.updatedAt
//     }))
//   }, [])

//   // 2. Filter logic (Name, ID, or Diagnosis)
//   const rows = useMemo(() => {
//     if (!q.trim()) return PATIENT_LIST
//     const needle = q.toLowerCase()
//     return PATIENT_LIST.filter(p => (
//       p.name.toLowerCase().includes(needle) || 
//       p.id.toLowerCase().includes(needle) || 
//       (p.primaryDiagnosis || '').toLowerCase().includes(needle)
//     ))
//   }, [q, PATIENT_LIST])

//   // 3. Status Badge Color Logic
//   const getBadgeClass = (status) => {
//     switch (status) {
//       case 'Inpatient': return 'badge-yellow' // Amber in light, muted gold in dark
//       case 'Active': return 'badge-green'    // Emerald/Green
//       case 'Outpatient': return 'badge-gray'   // Slate/Blue-Gray
//       case 'Discharged': return 'badge-gray opacity-60' 
//       default: return 'badge-gray'
//     }
//   }

//   return (
//     <div className="space-y-6 animate-in fade-in duration-700">
      
//       {/* Search and Header Section */}
//       <div className="card p-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h2 className="card-title text-2xl">Patient Directory</h2>
//             <p className="card-subtitle">Real-time management of {rows.length} records</p>
//           </div>
          
//           <div className="relative w-full md:w-96 group">
//             <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//             <input 
//               className="input pl-10 h-11 shadow-sm" 
//               placeholder="Search name, ID, or diagnosis..." 
//               value={q} 
//               onChange={e => setQ(e.target.value)} 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th className="th px-6">Patient Details</th>
//                 <th className="th px-6">Demographics</th>
//                 <th className="th px-6">Status</th>
//                 <th className="th px-6">Primary Diagnosis</th>
//                 <th className="th px-6 text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//               {rows.map(r => (
//                 <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
//                   <td className="td px-6">
//                     <div className="flex items-center gap-3">
//                       {/* Avatar Circle */}
//                       <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
//                         {r.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
//                           {r.name}
//                         </div>
//                         <div className="text-xs font-mono text-slate-500 uppercase tracking-tighter">
//                           {r.id}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
                  
//                   <td className="td px-6">
//                     <div className="font-medium">{r.sex} • {r.dob}</div>
//                     <div className="text-xs text-slate-500">Blood Group: {r.bloodGroup}</div>
//                   </td>

//                   <td className="td px-6">
//                     <span className={getBadgeClass(r.status)}>
//                       {r.status}
//                     </span>
//                   </td>

//                   <td className="td px-6">
//                     <div className="max-w-[200px] truncate font-medium text-slate-700 dark:text-slate-300">
//                       {r.primaryDiagnosis}
//                     </div>
//                     <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
//                       Updated: {new Date(r.lastUpdated).toLocaleDateString()}
//                     </div>
//                   </td>

//                   <td className="td px-6 text-right">
//                     <button 
//                       className="btn-primary py-1.5 px-4 text-sm" 
//                       onClick={() => navigate(`/patient/${r.id}`)}
//                     >
//                       Open Record
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Empty State */}
//           {rows.length === 0 && (
//             <div className="py-20 text-center">
//               <p className="text-slate-400 dark:text-slate-600 font-medium">No patients found matching "{q}"</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// import { useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { DB } from '../data/db'

// export default function PatientList() {
//   const [q, setQ] = useState('')
//   const navigate = useNavigate()

//   // 1. Convert the DB object into a flat array for the table
//   const PATIENT_LIST = useMemo(() => {
//     return Object.values(DB).map(entry => ({
//       ...entry.patient,
//       primaryDiagnosis: entry.summary.primaryDiagnosis,
//       lastUpdated: entry.summary.updatedAt
//     }))
//   }, [])

//   // 2. Filter logic for Search (Name, ID, or Diagnosis)
//   const rows = useMemo(() => {
//     if (!q.trim()) return PATIENT_LIST
//     const needle = q.toLowerCase()
//     return PATIENT_LIST.filter(p => (
//       p.name.toLowerCase().includes(needle) || 
//       p.id.toLowerCase().includes(needle) || 
//       (p.primaryDiagnosis || '').toLowerCase().includes(needle)
//     ))
//   }, [q, PATIENT_LIST])

//   // 3. Status Badge Styling
//   const getBadgeClass = (status) => {
//     switch (status) {
//       case 'Inpatient': return 'badge-yellow' 
//       case 'Active': return 'badge-green'    
//       case 'Outpatient': return 'badge-gray'   
//       case 'Discharged': return 'badge-gray opacity-60' 
//       default: return 'badge-gray'
//     }
//   }

//   return (
//     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      
//       {/* SECTION 1: Header & Summary Stats */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-black">
//             Patient Directory
//           </h1>
//           {/* <p className="text-slate-500 dark:text-slate-400 mt-1">
//             MediConnect: Managing {PATIENT_LIST.length} total Indian patient records
//           </p> */}
//           <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
//     MediConnect: Managing {PATIENT_LIST.length} total Indian patient records
//   </p>
//         </div>

//         <div className="flex gap-4">
//           {/* Active Stats Card */}
//           <div className="bg-white dark:bg-slate-800 p-3 px-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3 transition-all hover:shadow-md">
//             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
//               {PATIENT_LIST.filter(p => p.status === 'Active').length} Active
//             </span>
//           </div>

//           {/* Inpatient Stats Card */}
//           <div className="bg-white dark:bg-slate-800 p-3 px-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3 transition-all hover:shadow-md">
//             <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
//             <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
//               {PATIENT_LIST.filter(p => p.status === 'Inpatient').length} Inpatients
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* SECTION 2: Search Bar Card */}
//       <div className="card p-4">
//         <div className="relative group">
//           <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//             <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           <input 
//             className="input pl-10 h-12 bg-slate-50/50 dark:bg-slate-900/50 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500" 
//             placeholder="      Search by name, patient ID, or primary diagnosis..." 
//             value={q} 
//             onChange={e => setQ(e.target.value)} 
//           />
//         </div>
//       </div>

//       {/* SECTION 3: Main Data Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th className="th px-6">Patient Info</th>
//                 <th className="th px-6">Demographics</th>
//                 <th className="th px-6">Care Status</th>
//                 <th className="th px-6">Primary Diagnosis</th>
//                 <th className="th px-6 text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//               {rows.map(r => (
//                 <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
//                   <td className="td px-6">
//                     <div className="flex items-center gap-4">
//                       {/* Modern Avatar Initials */}
//                       <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
//                         {r.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
//                           {r.name}
//                         </div>
//                         <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
//                           ID: {r.id}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
                  
//                   <td className="td px-6">
//                     <div className="font-medium text-slate-700 dark:text-slate-200">{r.sex} • {r.dob}</div>
//                     <div className="text-xs text-slate-500">Blood: <span className="font-bold">{r.bloodGroup}</span></div>
//                   </td>

//                   <td className="td px-6">
//                     <span className={getBadgeClass(r.status)}>
//                       {r.status}
//                     </span>
//                   </td>

//                   <td className="td px-6">
//                     <div className="max-w-[180px] truncate font-semibold text-slate-600 dark:text-slate-300">
//                       {r.primaryDiagnosis}
//                     </div>
//                     <div className="text-[10px] text-slate-400 mt-1 uppercase font-medium">
//                       Last Updated: {new Date(r.lastUpdated).toLocaleDateString()}
//                     </div>
//                   </td>

//                   <td className="td px-6 text-right">
//                     <button 
//                       className="btn-primary py-1.5 px-4 text-xs tracking-wide uppercase" 
//                       onClick={() => navigate(`/patient/${r.id}`)}
//                     >
//                       Open Record
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Handle Empty Search Results */}
//           {rows.length === 0 && (
//             <div className="py-24 text-center">
//               <div className="bg-slate-100 dark:bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                  <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                  </svg>
//               </div>
//               <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">No results found for "{q}"</p>
//               <p className="text-slate-400 text-sm mt-1">Try searching by a different name or ID.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { DB } from '../data/db'

// export default function PatientList() {
//   const [q, setQ] = useState('')
//   const navigate = useNavigate()

//   // 1. Data Transformation
//   const PATIENT_LIST = useMemo(() => {
//     return Object.values(DB).map(entry => ({
//       ...entry.patient,
//       primaryDiagnosis: entry.summary.primaryDiagnosis,
//       lastUpdated: entry.summary.updatedAt
//     }))
//   }, [])

//   // 2. Filter Logic
//   const rows = useMemo(() => {
//     if (!q.trim()) return PATIENT_LIST
//     const needle = q.toLowerCase()
//     return PATIENT_LIST.filter(p => (
//       p.name.toLowerCase().includes(needle) || 
//       p.id.toLowerCase().includes(needle) || 
//       (p.primaryDiagnosis || '').toLowerCase().includes(needle)
//     ))
//   }, [q, PATIENT_LIST])

//   // 3. Status Badge Helper
//   const getStatusStyles = (status) => {
//     const base = "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider "
//     switch (status) {
//       case 'Active': return base + "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
//       case 'Inpatient': return base + "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
//       default: return base + "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      
//       {/* --- HEADER SECTION --- */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
//         <div>
//           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
//             Patient Directory
//           </h1>
//           <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
//             Currently managing <span className="text-blue-600 font-bold">{PATIENT_LIST.length}</span> active medical records
//           </p>
//         </div>

//         {/* Stats Chips */}
//         <div className="flex gap-2">
//           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
//             <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
//             <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
//               {PATIENT_LIST.filter(p => p.status === 'Active').length} Live
//             </span>
//           </div>
//           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
//             <span className="h-2 w-2 rounded-full bg-amber-500"></span>
//             <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
//               {PATIENT_LIST.filter(p => p.status === 'Inpatient').length} Admitted
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* --- SEARCH BOX --- */}
//       <div className="relative group max-w-2xl">
//         <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
//           <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//         <input 
//           className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-xl shadow-slate-200/50 dark:shadow-none" 
//           placeholder="Filter by name, UID, or clinical diagnosis..." 
//           value={q} 
//           onChange={e => setQ(e.target.value)} 
//         />
//       </div>

//       {/* --- TABLE CARD --- */}
//       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
//                 <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Profile</th>
//                 <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Metadata</th>
//                 <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
//                 <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Diagnosis</th>
//                 <th className="px-6 py-4 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Registry</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//               {rows.map(r => (
//                 <tr key={r.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all cursor-default">
//                   <td className="px-6 py-5">
//                     <div className="flex items-center gap-4">
//                       <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm group-hover:scale-110 transition-transform">
//                         {r.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">{r.name}</div>
//                         <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">{r.id}</div>
//                       </div>
//                     </div>
//                   </td>
                  
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-bold text-slate-700 dark:text-slate-300">{r.sex} • {r.dob}</div>
//                     <div className="text-[11px] text-slate-500 font-medium">Group: <span className="text-rose-600">{r.bloodGroup}</span></div>
//                   </td>

//                   <td className="px-6 py-5">
//                     <span className={getStatusStyles(r.status)}>
//                       {r.status}
//                     </span>
//                   </td>

//                   <td className="px-6 py-5">
//                     <div className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
//                       {r.primaryDiagnosis}
//                     </div>
//                     <div className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-tighter">
//                       Sync: {new Date(r.lastUpdated).toLocaleDateString('en-IN')}
//                     </div>
//                   </td>

//                   <td className="px-6 py-5 text-right">
//                     <button 
//                       className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none" 
//                       onClick={() => navigate(`/patient/${r.id}`)}
//                     >
//                       Open Record
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Empty State */}
//           {rows.length === 0 && (
//             <div className="py-24 text-center">
//               <div className="text-slate-300 dark:text-slate-700 mb-4 flex justify-center">
//                 <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-slate-900 dark:text-white">No patients found</h3>
//               <p className="text-sm text-slate-500 mt-1">Refine your search parameters and try again.</p>
//               <button onClick={() => setQ('')} className="mt-6 text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700">Clear Search</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// import { useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { DB } from '../data/db'

// export default function PatientList() {
//   const [q, setQ] = useState('')
//   const navigate = useNavigate()

//   const PATIENT_LIST = useMemo(() => {
//     return Object.values(DB).map(entry => ({
//       ...entry.patient,
//       primaryDiagnosis: entry.summary.primaryDiagnosis,
//       lastUpdated: entry.summary.updatedAt
//     }))
//   }, [])

//   const rows = useMemo(() => {
//     if (!q.trim()) return PATIENT_LIST
//     const needle = q.toLowerCase()
//     return PATIENT_LIST.filter(p => (
//       p.name.toLowerCase().includes(needle) || 
//       p.id.toLowerCase().includes(needle) || 
//       (p.primaryDiagnosis || '').toLowerCase().includes(needle)
//     ))
//   }, [q, PATIENT_LIST])

//   // Medical-themed status colors
//   const getStatusStyles = (status) => {
//     const base = "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border "
//     switch (status) {
//       case 'Active': 
//         return base + "bg-emerald-50 text-emerald-700 border-emerald-200"
//       case 'Inpatient': 
//         return base + "bg-blue-50 text-blue-700 border-blue-200"
//       default: 
//         return base + "bg-slate-50 text-slate-600 border-slate-200"
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-8 space-y-6 bg-slate-50 min-h-screen">
      
//       {/* HEADER: HOSPITAL BRANDING FEEL */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
//             <h1 className="text-2xl font-bold text-slate-800">Patient Directory</h1>
//           </div>
//           <p className="text-slate-500 text-sm">
//             Centralized Electronic Health Records • <span className="font-semibold text-blue-600">{PATIENT_LIST.length} Total Records</span>
//           </p>
//         </div>

//         <div className="flex gap-3">
//           {/* <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
//             <div className="text-[10px] uppercase font-bold text- stroke-lime-500">Admitted</div>
//             <div className="text-lg font-bold text-blue-600">{PATIENT_LIST.filter(p => p.status === 'Inpatient').length}</div>
//           </div>
//           <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
//             <div className="text-[10px] uppercase font-bold text-slate-400">Outpatient</div>
//             <div className="text-lg font-bold text-emerald-600">{PATIENT_LIST.filter(p => p.status === 'Active').length}</div>
//           </div> */}
//           <div className="flex gap-3">
//   {/* ADMITTED STATS */}
//   <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-center shadow-sm flex flex-col items-center min-w-[100px]">
//     <div className="flex items-center gap-1.5 mb-1">
//       {/* Steady Blue Light for Inpatients */}
//       <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
//       <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Admitted</span>
//     </div>
//     <div className="text-xl font-black text-blue-600 leading-none">
//       {PATIENT_LIST.filter(p => p.status === 'Inpatient').length}
//     </div>
//   </div>

//   {/* OUTPATIENT STATS */}
//   <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-center shadow-sm flex flex-col items-center min-w-[100px]">
//     <div className="flex items-center gap-1.5 mb-1">
//       {/* Pulsing Emerald Light for Active Outpatients */}
//       <span className="relative flex h-2 w-2">
//         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//         <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//       </span>
//       <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Outpatient</span>
//     </div>
//     <div className="text-xl font-black text-emerald-600 leading-none">
//       {PATIENT_LIST.filter(p => p.status === 'Active').length}
//     </div>
//   </div>
// </div>
//         </div>
//       </div>

//       {/* CLINICAL SEARCH BAR */}
//       <div className="relative group">
//         <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
//           <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//         <input 
//           className="w-full bg-white border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all shadow-sm" 
//           placeholder="Search patient name, UID, or primary diagnosis..." 
//           value={q} 
//           onChange={e => setQ(e.target.value)} 
//         />
//       </div>

//       {/* MEDICAL RECORD TABLE */}
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-50 border-b border-slate-200">
//                 <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Patient Details</th>
//                 <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Demographics</th>
//                 <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
//                 <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Primary Diagnosis</th>
//                 <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-500 uppercase tracking-widest">Management</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {rows.map(r => (
//                 <tr key={r.id} className="hover:bg-blue-50/30 transition-colors group">
//                   <td className="px-6 py-5">
//                     <div className="flex items-center gap-4">
//                       <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm border border-blue-200">
//                         {r.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-bold text-slate-800">{r.name}</div>
//                         <div className="text-[10px] font-mono font-semibold text-blue-500 bg-blue-50 px-1.5 rounded inline-block uppercase">
//                           {r.id}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
                  
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-semibold text-slate-700">{r.sex} • {r.dob}</div>
//                     <div className="text-[11px] text-slate-500">Blood Group: <span className="text-red-500 font-bold">{r.bloodGroup}</span></div>
//                   </td>

//                   <td className="px-6 py-5">
//                     <span className={getStatusStyles(r.status)}>
//                       {r.status}
//                     </span>
//                   </td>

//                   <td className="px-6 py-5">
//                     <div className="text-sm font-bold text-slate-700 truncate max-w-[200px]">
//                       {r.primaryDiagnosis}
//                     </div>
//                     <div className="text-[10px] text-slate-400 mt-1 uppercase font-medium">
//                       Last Updated: {new Date(r.lastUpdated).toLocaleDateString('en-IN')}
//                     </div>
//                   </td>

//                   <td className="px-6 py-5 text-right">
//                     <button 
//                       className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-md shadow-blue-200" 
//                       onClick={() => navigate(`/patient/${r.id}`)}
//                     >
//                       View Record
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {rows.length === 0 && (
//             <div className="py-20 text-center bg-white">
//               <p className="text-slate-400 font-medium">No medical records found matching your criteria.</p>
//               <button onClick={() => setQ('')} className="mt-2 text-blue-600 text-sm font-bold underline">Clear Search</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// import { useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { DB } from '../data/db'

// export default function PatientList() {
//   const [q, setQ] = useState('')
//   const navigate = useNavigate()

//   const PATIENT_LIST = useMemo(() => {
//     return Object.values(DB).map(entry => ({
//       ...entry.patient,
//       primaryDiagnosis: entry.summary.primaryDiagnosis,
//       lastUpdated: entry.summary.updatedAt
//     }))
//   }, [])

//   const rows = useMemo(() => {
//     if (!q.trim()) return PATIENT_LIST
//     const needle = q.toLowerCase()
//     return PATIENT_LIST.filter(p => (
//       p.name.toLowerCase().includes(needle) || 
//       p.id.toLowerCase().includes(needle) || 
//       (p.primaryDiagnosis || '').toLowerCase().includes(needle)
//     ))
//   }, [q, PATIENT_LIST])

//   // Medical-themed status colors
//   const getStatusStyles = (status) => {
//     const base = "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border "
//     switch (status) {
//       case 'Active': 
//         return base + "bg-emerald-50 text-emerald-700 border-emerald-200"
//       case 'Inpatient': 
//         return base + "bg-blue-50 text-blue-700 border-blue-200"
//       default: 
//         return base + "bg-slate-50 text-slate-500 border-slate-200"
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-8 space-y-6 bg-slate-50 min-h-screen">
      
//       {/* HEADER & STATS */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
//             <h1 className="text-2xl font-bold text-slate-800">Patient Directory</h1>
//           </div>
//           <p className="text-slate-500 text-sm font-medium">
//             Centralized Electronic Health Records • <span className="text-blue-600">{PATIENT_LIST.length} Total Records</span>
//           </p>
//         </div>

//         <div className="flex gap-3">
//           {/* ADMITTED STATS */}
//           <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center min-w-[100px]">
//             <div className="flex items-center gap-1.5 mb-1">
//               <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
//               <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Admitted</span>
//             </div>
//             <div className="text-xl font-black text-blue-600 leading-none">
//               {PATIENT_LIST.filter(p => p.status === 'Inpatient').length}
//             </div>
//           </div>

//           {/* OUTPATIENT STATS */}
//           <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center min-w-[100px]">
//             <div className="flex items-center gap-1.5 mb-1">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//               </span>
//               <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Active</span>
//             </div>
//             <div className="text-xl font-black text-emerald-600 leading-none">
//               {PATIENT_LIST.filter(p => p.status === 'Active').length}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="relative group">
//         <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
//           <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//         <input 
//           className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" 
//           placeholder="Search patient name, UID, or primary diagnosis..." 
//           value={q} 
//           onChange={e => setQ(e.target.value)} 
//         />
//       </div>

//       {/* PATIENT TABLE */}
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-50/50 border-b border-slate-200">
//                 <th className="px-6 py-4 text-[10px] font-black text-black uppercase tracking-[0.15em]">Patient Info</th>
//                 <th className="px-6 py-4 text-[10px] font-black  text-black  uppercase tracking-[0.15em]">Demographics</th>
//                 <th className="px-6 py-4 text-[10px] font-black  text-black  uppercase tracking-[0.15em]">Status</th>
//                 <th className="px-6 py-4 text-[10px] font-black  text-black  uppercase tracking-[0.15em]">Clinical Primary</th>
//                 <th className="px-6 py-4 text-right text-[10px] font-black  text-black  uppercase tracking-[0.15em]">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {rows.map(r => (
//                 <tr key={r.id} className="hover:bg-slate-50/80 transition-colors group">
//                   {/* PATIENT INFO */}
//                   <td className="px-6 py-5">
//                     <div className="flex items-center gap-4">
//                       <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-md shadow-slate-200">
//                         {r.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-bold text-slate-900 leading-tight">{r.name}</div>
//                         <div className="text-[10px] font-mono font-bold text-blue-600 uppercase mt-0.5">
//                           ID: {r.id}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
                  
//                   {/* DEMOGRAPHICS (VERTICAL STACK) */}
//                   <td className="px-6 py-5">
//                     <div className="flex flex-col gap-1">
//                       <div className="flex items-center gap-2">
//                         <span className="text-[9px] font-black uppercase  text-black  w-8">Sex</span>
//                         <span className="text-xs font-bold text-slate-700 uppercase tracking-tighter">{r.sex}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[9px] font-black uppercase  text-black  w-8">DOB</span>
//                         <span className="text-xs font-bold text-slate-600 tracking-tighter">{r.dob}</span>
//                       </div>
//                       <div className="mt-1">
//                         <span className="text-[9px] font-black uppercase  text-black  text-red-600 px-2 py-0.5 rounded border border-red-100 inline-flex items-center gap-1">
//                           <span className="h-1 w-1 rounded-full bg-red-500"></span>
//                           Blood {r.bloodGroup}
//                         </span>
//                       </div>
//                     </div>
//                   </td>

//                   {/* STATUS */}
//                   <td className="px-6 py-5">
//                     <span className={getStatusStyles(r.status)}>
//                       {r.status}
//                     </span>
//                   </td>

//                   {/* DIAGNOSIS */}
//                   <td className="px-6 py-5">
//                     <div className="text-sm font-bold text-slate-800 truncate max-w-[200px]">
//                       {r.primaryDiagnosis}
//                     </div>
//                     <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">
//                       Updated: {new Date(r.lastUpdated).toLocaleDateString('en-IN')}
//                     </div>
//                   </td>

//                   {/* ACTIONS */}
//                   <td className="px-6 py-5 text-right">
//                     <button 
//                       className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-100" 
//                       onClick={() => navigate(`/patient/${r.id}`)}
//                     >
//                       Open File
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {rows.length === 0 && (
//             <div className="py-24 text-center bg-white">
//               <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
//                 <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//               <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No matching records found</p>
//               <button onClick={() => setQ('')} className="mt-3 text-blue-600 text-sm font-black uppercase tracking-tighter hover:underline">Clear Search Filter</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DB } from '../data/db'

export default function PatientList() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const PATIENT_LIST = useMemo(() => {
    return Object.values(DB).map(entry => ({
      ...entry.patient,
      primaryDiagnosis: entry.summary.primaryDiagnosis,
      lastUpdated: entry.summary.updatedAt
    }))
  }, [])

  const rows = useMemo(() => {
    if (!q.trim()) return PATIENT_LIST
    const needle = q.toLowerCase()
    return PATIENT_LIST.filter(p => (
      p.name.toLowerCase().includes(needle) || 
      p.id.toLowerCase().includes(needle) || 
      (p.primaryDiagnosis || '').toLowerCase().includes(needle)
    ))
  }, [q, PATIENT_LIST])

  const getStatusStyles = (status) => {
    const base = "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border "
    switch (status) {
      case 'Active': 
        return base + "bg-emerald-50 text-emerald-700 border-emerald-200"
      case 'Inpatient': 
        return base + "bg-blue-50 text-blue-700 border-blue-200"
      default: 
        return base + "bg-slate-50 text-slate-500 border-slate-200"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6 bg-slate-50 min-h-screen">
      
      {/* HEADER & STATS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <h1 className="text-2xl font-bold text-slate-800">Patient Directory</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            Centralized Electronic Health Records • <span className="text-blue-600">{PATIENT_LIST.length} Total Records</span>
          </p>
        </div>

        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center min-w-[110px]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Admitted</span>
            </div>
            <div className="text-xl font-black text-blue-600 leading-none">
              {PATIENT_LIST.filter(p => p.status === 'Inpatient').length}
            </div>
          </div>

          <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center min-w-[110px]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Active</span>
            </div>
            <div className="text-xl font-black text-emerald-600 leading-none">
              {PATIENT_LIST.filter(p => p.status === 'Active').length}
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" 
          placeholder="Search patient name, ID, or primary diagnosis..." 
          value={q} 
          onChange={e => setQ(e.target.value)} 
        />
      </div>

      {/* PATIENT TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-black">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Patient Info</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Demographics</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Clinical Primary</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.15em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* PATIENT INFO */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-md shadow-slate-200">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">{r.name}</div>
                        <div className="text-[10px] font-mono font-bold text-blue-600 uppercase mt-0.5">
                          ID: {r.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* DEMOGRAPHICS (ALIGNED VERTICAL STACK) */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center">
                        <span className="text-[9px] font-black uppercase text-blue-500 w-14">Gender</span>
                        <span className="text-xs font-black text-black uppercase tracking-tight">{r.sex}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[9px] font-black uppercase  text-blue-500 w-14">DOB</span>
                        <span className="text-xs font-black text-black tracking-tight">{r.dob}</span>
                      </div>
                      <div className="mt-0.5 flex items-center">
                        <span className="text-[9px] font-black uppercase  text-blue-500 w-14">Blood</span>
                        <span className="text-[9px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 inline-flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-red-500"></span>
                          {r.bloodGroup}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <span className={getStatusStyles(r.status)}>
                      {r.status}
                    </span>
                  </td>

                  {/* DIAGNOSIS */}
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-slate-800 truncate max-w-[200px]">
                      {r.primaryDiagnosis}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">
                      Updated: {new Date(r.lastUpdated).toLocaleDateString('en-IN')}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5 text-right">
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-100" 
                      onClick={() => navigate(`/patient/${r.id}`)}
                    >
                      Open File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="py-24 text-center bg-white">
              <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No matching records found</p>
              <button onClick={() => setQ('')} className="mt-3 text-blue-600 text-sm font-black uppercase tracking-tighter hover:underline">Clear Search Filter</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}