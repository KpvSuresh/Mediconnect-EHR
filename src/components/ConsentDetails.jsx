
export default function ConsentDetails({ consentHistory, activeConsent }){
  return (
    <div className="space-y-4">
      <div>
        <div className="card-title">Active Consent</div>
        {activeConsent ? (
          <div className="mt-2">
            <div className="text-sm"><span className="label">Granted To:</span> {activeConsent.grantedTo}</div>
            <div className="text-sm"><span className="label">Scope:</span> {activeConsent.scope || '—'}</div>
            <div className="text-sm"><span className="label">Start:</span> {activeConsent.start}</div>
            <div className="text-sm"><span className="label">End:</span> {activeConsent.end}</div>
          </div>
        ) : (
          <div className="badge badge-yellow">No active consent</div>
        )}
      </div>

      <div>
        <div className="card-title">Consent History</div>
        <div className="mt-2">
          <table className="table">
            <thead>
              <tr>
                <th className="th">Granted To</th>
                <th className="th">Scope</th>
                <th className="th">Start</th>
                <th className="th">End</th>
              </tr>
            </thead>
            <tbody>
              {consentHistory.map((i) => (
                <tr key={i.id}>
                  <td className="td">{i.grantedTo}</td>
                  <td className="td">{i.scope}</td>
                  <td className="td">{i.start}</td>
                  <td className="td">{i.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
