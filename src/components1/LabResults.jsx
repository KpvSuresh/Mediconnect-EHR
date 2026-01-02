


import { useMemo, useState } from 'react'
import Modal from './Modal'
import { LAB_TESTS, getDefaultsFor } from '../data/tests'

export default function LabResults({ items, onAdd, onFlag, doctors = [] }) {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  
  // PDF/Image Viewer State
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerFileUrl, setViewerFileUrl] = useState(null)

  // Standard form state
  const [form, setForm] = useState({ 
    name: '', value: '', units: '', refRange: '', date: '', 
    orderingDoctor: '', lab: 'Central Lab', notes: '' 
  })

  const filteredItems = useMemo(() => {
    if (filter === 'Flagged') return items.filter(i => i.flagged)
    if (filter === 'Unflagged') return items.filter(i => !i.flagged)
    return items
  }, [items, filter])

  // --- FILE HANDLING ---
  function handleFileUpload(e, item) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    item.files = [...(item.files || []), ...files]
    alert(`Attached ${files.length} report(s) to ${item.name}`)
  }

  function openFileViewer(file) {
    const url = URL.createObjectURL(file)
    setViewerFileUrl(url)
    setViewerOpen(true)
  }

  function closeFileViewer() {
    if (viewerFileUrl) URL.revokeObjectURL(viewerFileUrl)
    setViewerFileUrl(null)
    setViewerOpen(false)
  }

  // --- FORM SUBMISSION WITH STATUS LOGIC ---
  function submit() {
    if (!form.name || !form.value || !form.units || !form.date) { 
        alert('Please fill required fields'); return 
    }

    // Logic: Dangerous if > range, Cautious if within 5% of top of range
    let calculatedStatus = 'Normal';
    const val = parseFloat(form.value);
    
    // Extract the upper numerical limit from range string (e.g. "135-145" -> 145)
    const rangeNumbers = form.refRange.match(/(\d+(\.\d+)?)/g);
    const upperLimit = rangeNumbers ? parseFloat(rangeNumbers[rangeNumbers.length - 1]) : null;

    if (!isNaN(val) && upperLimit !== null) {
      if (val > upperLimit) {
        calculatedStatus = 'Dangerous';
      } else if (val >= upperLimit * 0.95) {
        calculatedStatus = 'Cautious';
      }
    }

    onAdd({
      id: 'l' + Math.random().toString(36).slice(2),
      ...form,
      orderingDoctor: form.orderingDoctor || '—',
      lab: form.lab || 'Central Lab',
      files: [],
      flagged: calculatedStatus === 'Dangerous', // Auto-flag dangerous items
      status: calculatedStatus 
    })
    
    setOpen(false)
    setForm({ name: '', value: '', units: '', refRange: '', date: '', orderingDoctor: '', lab: 'Central Lab', notes: '' })
  }

  function onTestChange(name) {
    const defs = getDefaultsFor(name)
    setForm(f => ({ ...f, name, units: defs.units, refRange: defs.refRange }))
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <h3 className="card-title">Lab Results</h3>
        <div className="flex items-center gap-2">
          {['All', 'Flagged', 'Unflagged'].map(t => (
            <button key={t} onClick={() => setFilter(t)} className={"badge " + (filter === t ? 'badge-green' : 'badge-gray')}>{t}</button>
          ))}
          <button className="btn btn-primary" onClick={() => setOpen(true)}>Add Lab Result</button>
        </div>
      </div>
      
      <div className="mt-3 overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Test Name</th>
              <th className="th">Value</th>
              <th className="th">Units</th>
              <th className="th">Reference Range</th>
              <th className="th">Date</th>
              <th className="th">Status</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id} className={item.status === 'Dangerous' ? 'bg-red-50' : ''}>
                <td className="td font-medium">{item.name}</td>
                <td className="td font-bold">{item.value}</td>
                <td className="td">{item.units}</td>
                <td className="td text-slate-500 text-xs">{item.refRange}</td>
                <td className="td">{item.date}</td>
                <td className="td">
                  {item.status === 'Dangerous' ? (
                    <span className="px-2 py-1 rounded text-xs font-bold bg-red-600 text-white animate-pulse">Dangerous</span>
                  ) : item.status === 'Cautious' ? (
                    <span className="px-2 py-1 rounded text-xs font-bold bg-amber-400 text-amber-950">Cautious</span>
                  ) : (
                    <span className="px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-600">Normal</span>
                  )}
                </td>
                <td className="td">
                  <div className="flex flex-wrap gap-2">
                    <label className="btn btn-secondary cursor-pointer">
                      <input 
                        type="file" 
                        accept="application/pdf,image/*" 
                        multiple 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(e, item)} 
                      />
                      Upload
                    </label>

                    {item.files?.map((file, idx) => (
                      <button 
                        key={idx} 
                        className="btn btn-primary" 
                        onClick={() => openFileViewer(file)}
                      >
                        View {file.type.includes('pdf') ? 'PDF' : 'Img'}
                      </button>
                    ))}

                    <button className={item.flagged ? 'btn btn-secondary' : 'btn btn-danger'} onClick={() => onFlag(item)}>
                      {item.flagged ? 'Unflag' : 'Flag'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Lab Modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Add Lab Result">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="label">Test Name*</label>
            <select className="select" value={form.name} onChange={e => onTestChange(e.target.value)}>
              <option value="">Select a test</option>
              {LAB_TESTS.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Value*</label>
            <input 
              type="number"
              step="any"
              className="input" 
              value={form.value} 
              onChange={e => setForm(f => ({ ...f, value: e.target.value }))} 
              placeholder="Enter numeric value" 
            />
          </div>
          <div>
            <label className="label">Units</label>
            <input className="input bg-slate-50" value={form.units} readOnly />
          </div>
          <div>
            <label className="label">Reference Range</label>
            <input className="input bg-slate-50" value={form.refRange} readOnly />
          </div>
          <div>
            <label className="label">Result Date*</label>
            <input type="date" className="input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div>
            <label className="label">Ordering Doctor</label>
            <select className="select" value={form.orderingDoctor} onChange={e => setForm(f => ({ ...f, orderingDoctor: e.target.value }))}>
              <option value="">Select</option>
              {doctors.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="label">Notes</label>
            <textarea className="input" rows="2" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}></textarea>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>Add Result</button>
        </div>
      </Modal>

      {/* PDF/Image Viewer Modal */}
      <Modal open={viewerOpen} onClose={closeFileViewer} title="Laboratory Report">
        {viewerFileUrl ? (
          <div className="w-full h-[75vh]">
            <iframe 
              src={viewerFileUrl} 
              className="w-full h-full border rounded shadow-sm bg-white" 
              title="Report Content" 
            />
          </div>
        ) : (
          <div className="p-10 text-center text-slate-500">Document unavailable.</div>
        )}
      </Modal>
    </div>
  )
}