
// import { useState } from 'react'

// export default function DiagnosisEditor({ activeItems, onAdd, onResolve }){
//   const [form, setForm] = useState({ name:'', code:'', severity:'', onset:'', notes:'' })

//   function submit(){
//     if(!form.name) { alert('Diagnosis is required'); return }
//     onAdd({ id: 'd'+Math.random().toString(36).slice(2), name: form.name, code: form.code || '—', severity: form.severity || '—', onset: form.onset || '—', notes: form.notes || '', date: form.onset || new Date().toISOString().slice(0,10), clinician: 'Dr. Patel', facility: 'City Hospital', type: 'Chronic' })
//     setForm({ name:'', code:'', severity:'', onset:'', notes:'' })
//   }

//   return (
//     <div className="card p-4">
//       <h3 className="card-title">Diagnosis Editor</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
//         <div>
//           <label className="label">Diagnosis*</label>
//           <input className="input" placeholder="Search ICD-10/ICD-11" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} />
//         </div>
//         <div>
//           <label className="label">ICD Code</label>
//           <input className="input" value={form.code} onChange={e=>setForm(f=>({...f, code:e.target.value}))} />
//         </div>
//         <div>
//           <label className="label">Severity</label>
//           <select className="select" value={form.severity} onChange={e=>setForm(f=>({...f, severity:e.target.value}))}>
//             <option value="">Select</option>
//             <option>Mild</option>
//             <option>Moderate</option>
//             <option>Severe</option>
//           </select>
//         </div>
//         <div>
//           <label className="label">Onset Date</label>
//           <input type="date" className="input" value={form.onset} onChange={e=>setForm(f=>({...f, onset:e.target.value}))} />
//         </div>
//         <div className="md:col-span-2">
//           <label className="label">Notes</label>
//           <textarea className="input" rows="3" value={form.notes} onChange={e=>setForm(f=>({...f, notes:e.target.value}))}></textarea>
//         </div>
//       </div>
//       <div className="mt-4 flex justify-end gap-2">
//         <button className="btn btn-primary" onClick={submit}>Add Diagnosis</button>
//       </div>

//       <div className="mt-4">
//         <div className="card-subtitle mb-2">Current Active Diagnoses</div>
//         <div className="flex flex-wrap gap-2">
//           {activeItems.map(d => (
//             <span key={d.id} className="badge badge-gray">
//               {d.name}
//               <button className="ml-2 text-red-700" onClick={()=>onResolve(d)}>Resolve</button>
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// import { useState } from 'react'

// export default function DiagnosisEditor({ activeItems, onAdd, onResolve }){
//   const [form, setForm] = useState({ name:'', code:'', severity:'', onset:'', notes:'' })

//   function submit(){
//     if(!form.name) { alert('Diagnosis is required'); return }
//     onAdd({ 
//       id: 'd'+Math.random().toString(36).slice(2), 
//       name: form.name, 
//       code: form.code || '—', 
//       severity: form.severity || '—', 
//       onset: form.onset || '—', 
//       notes: form.notes || '', 
//       date: form.onset || new Date().toISOString().slice(0,10), 
//       clinician: 'Dr. Patel', 
//       facility: 'City Hospital', 
//       type: 'Chronic' 
//     })
//     setForm({ name:'', code:'', severity:'', onset:'', notes:'' })
//   }

//   return (
//     <div className="bg-white border-2 border-blue-100 rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden">
//       {/* VIBRANT HEADER */}
//       <div className="px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
//             <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//           </div>
//           <h3 className="font-black text-white uppercase tracking-widest text-sm">New Diagnosis Entry</h3>
//         </div>
//         <span className="text-[10px] font-bold text-blue-100 bg-blue-500/30 px-3 py-1 rounded-full uppercase">Clinical Editor</span>
//       </div>

//       <div className="p-8">
//         {/* FORM GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
//                Diagnosis Name <span className="text-blue-600">*</span>
//             </label>
//             <input 
//               className="w-full bg-blue-50/30 border-2 border-blue-50 rounded-2xl px-5 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder-blue-300" 
//               placeholder="e.g. Type 2 Diabetes" 
//               value={form.name} 
//               onChange={e=>setForm(f=>({...f, name:e.target.value}))} 
//             />
//           </div>
          
//           <div className="space-y-2">
//             <label className="text-xs font-black uppercase text-slate-900 tracking-wider">ICD-10 Code</label>
//             <input 
//               className="w-full bg-blue-50/30 border-2 border-blue-50 rounded-2xl px-5 py-3 text-sm font-black text-blue-700 font-mono focus:outline-none focus:border-blue-500 focus:bg-white transition-all" 
//               placeholder="E11.9"
//               value={form.code} 
//               onChange={e=>setForm(f=>({...f, code:e.target.value}))} 
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs font-black uppercase text-slate-900 tracking-wider">Severity Status</label>
//             <div className="relative">
//               <select 
//                 className="w-full bg-blue-50/30 border-2 border-blue-50 rounded-2xl px-5 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none"
//                 value={form.severity} 
//                 onChange={e=>setForm(f=>({...f, severity:e.target.value}))}
//               >
//                 <option value="">Select Priority</option>
//                 <option>Mild</option>
//                 <option>Moderate</option>
//                 <option>Severe</option>
//               </select>
//               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs font-black uppercase text-slate-900 tracking-wider">Onset Date</label>
//             <input 
//               type="date" 
//               className="w-full bg-blue-50/30 border-2 border-blue-50 rounded-2xl px-5 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all" 
//               value={form.onset} 
//               onChange={e=>setForm(f=>({...f, onset:e.target.value}))} 
//             />
//           </div>

//           <div className="md:col-span-2 space-y-2">
//             <label className="text-xs font-black uppercase text-slate-900 tracking-wider">Physician Notes</label>
//             <textarea 
//               className="w-full bg-blue-50/30 border-2 border-blue-50 rounded-2xl px-5 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none" 
//               rows="3" 
//               placeholder="Document specific clinical observations..."
//               value={form.notes} 
//               onChange={e=>setForm(f=>({...f, notes:e.target.value}))}
//             ></textarea>
//           </div>
//         </div>

//         {/* SUBMIT BUTTON */}
//         <div className="mt-8">
//           <button 
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
//             onClick={submit}
//           >
//             Update Patient Records
//             <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </button>
//         </div>

//         {/* ACTIVE LIST SECTION */}
//         <div className="mt-10 pt-8 border-t-2 border-slate-50">
//           <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mb-4">Current Active Diagnoses</h4>
//           <div className="flex flex-wrap gap-3">
//             {activeItems.map(d => (
//               <div key={d.id} className="flex items-center gap-2 bg-white border-2 border-blue-50 pl-4 pr-2 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all group">
//                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
//                 <span className="text-sm font-black text-slate-800">{d.name}</span>
//                 <button 
//                   className="ml-2 bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-xl transition-all" 
//                   onClick={()=>onResolve(d)}
//                 >
//                   Resolve
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'

export default function DiagnosisEditor({ activeItems, onAdd, onResolve }){
  const [form, setForm] = useState({ name:'', code:'', severity:'', onset:'', notes:'' })

  function submit(){
    if(!form.name) return;
    onAdd({ 
      id: 'd'+Math.random().toString(36).slice(2), 
      name: form.name, 
      code: form.code || '—', 
      severity: form.severity || '—', 
      onset: form.onset || '—', 
      notes: form.notes || '', 
      date: form.onset || new Date().toISOString().slice(0,10), 
      clinician: 'Dr. Patel', 
      facility: 'City Hospital', 
      type: 'Chronic' 
    })
    setForm({ name:'', code:'', severity:'', onset:'', notes:'' })
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* CRISP HEADER */}
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-900">Diagnosis Management</h3>
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Record Entry</span>
      </div>

      <div className="p-6 space-y-6">
        {/* INPUT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">Diagnosis Name</label>
            <input 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none transition-colors" 
              placeholder="Search ICD-10..." 
              value={form.name} 
              onChange={e=>setForm(f=>({...f, name:e.target.value}))} 
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">ICD Code</label>
            <input 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:border-blue-500 outline-none transition-colors" 
              value={form.code} 
              onChange={e=>setForm(f=>({...f, code:e.target.value}))} 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">Severity</label>
            <select 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white"
              value={form.severity} 
              onChange={e=>setForm(f=>({...f, severity:e.target.value}))}
            >
              <option value="">Select Level</option>
              <option>Mild</option>
              <option>Moderate</option>
              <option>Severe</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">Onset Date</label>
            <input 
              type="date" 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" 
              value={form.onset} 
              onChange={e=>setForm(f=>({...f, onset:e.target.value}))} 
            />
          </div>
        </div>

        {/* FULL WIDTH NOTES */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900">Notes</label>
          <textarea 
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-colors" 
            rows="2" 
            value={form.notes} 
            onChange={e=>setForm(f=>({...f, notes:e.target.value}))}
          ></textarea>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex justify-end pt-2">
          <button 
            className="bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={submit}
          >
            Add Diagnosis
          </button>
        </div>

        {/* ACTIVE LIST */}
        <div className="pt-6 border-t border-slate-100">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Current Active</h4>
          <div className="flex flex-wrap gap-2">
            {activeItems.map(d => (
              <div key={d.id} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <span className="text-xs font-bold text-slate-700">{d.name}</span>
                <button 
                  className="text-[10px] text-rose-600 font-bold hover:underline" 
                  onClick={()=>onResolve(d)}
                >
                  Resolve
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}