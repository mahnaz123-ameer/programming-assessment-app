export default function FeedbackCard({ feedback }) {
  if (!feedback) return null;

  return (
    <div className="mt-6 bg-slate-800 p-6 rounded-xl shadow-xl border-l-4 border-blue-500 border border-slate-700">
      <h3 className="text-lg font-semibold text-blue-400 mb-2">Diagnostic Feedback</h3>
      <p className="text-slate-300 text-sm mb-4">{feedback.analysis}</p>
      
      <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
          Pedagogical Hint (Non-Solution-Revealing)
        </span>
        <p className="text-slate-200 font-mono text-sm">{feedback.hint}</p>
      </div>
    </div>
  );
}