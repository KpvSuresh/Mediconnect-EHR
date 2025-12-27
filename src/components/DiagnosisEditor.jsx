

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