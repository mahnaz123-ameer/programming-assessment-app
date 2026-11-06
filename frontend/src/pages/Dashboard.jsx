import { useDispatch, useSelector } from 'react-redux';
import { setCode, setLanguage, evaluateCode } from '../features/assessmentSlice';
import FeedbackCard from '../components/FeedbackCard';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { code, language, loading, feedback, error } = useSelector((state) => state.assessment);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    dispatch(evaluateCode({ code, language }));
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-blue-400">
          Intelligent Programming Workspace
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Submit code to receive formative, explainable AI guidance without direct code synthesis.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
        <div className="mb-4 flex justify-between items-center">
          <label className="block text-sm font-medium text-slate-300">
            Source Code ({language.toUpperCase()})
          </label>
          <select 
            value={language} 
            onChange={(e) => dispatch(setLanguage(e.target.value))}
            className="bg-slate-900 border border-slate-700 text-sm rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="python">Python</option>
            <option value="c">C</option>
          </select>
        </div>

        <textarea
          rows="10"
          value={code}
          onChange={(e) => dispatch(setCode(e.target.value))}
          placeholder="Type or paste your algorithm implementation here..."
          className="w-full font-mono text-sm bg-slate-900 text-emerald-400 p-4 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 resize-y"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Analyzing Code Structure...' : 'Get Formative Guidance'}
        </button>
      </form>

      {error && <div className="mt-4 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg text-sm">{error}</div>}

      <FeedbackCard feedback={feedback} />
    </div>
  );
}