import { useSelector } from 'react-redux';

export default function History() {
  const { history } = useSelector((state) => state.assessment);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-slate-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">Submission History</h1>
      {history.length === 0 ? (
        <p className="text-slate-400 text-sm">No evaluation history recorded yet in this session.</p>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div key={index} className="bg-slate-800 border border-slate-700 p-4 rounded-xl shadow">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Language: <strong className="text-slate-200">{item.language}</strong></span>
                <span>{item.timestamp}</span>
              </div>
              <pre className="bg-slate-900 p-3 rounded font-mono text-xs text-emerald-400 overflow-x-auto mb-3">
                {item.code}
              </pre>
              <div className="text-sm bg-slate-900/60 p-3 rounded border border-slate-700">
                <span className="text-amber-400 font-semibold block text-xs mb-1">Hint Given:</span>
                {item.result.hint}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}