import { Link } from 'react-router-dom';
import { Code2, History, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center text-slate-100">
      <div className="flex items-center space-x-2">
        <Code2 className="w-6 h-6 text-blue-400" />
        <span className="font-bold tracking-wide">DU CSE Adaptive Assessment</span>
      </div>
      <div className="flex space-x-6 text-sm font-medium">
        <Link to="/" className="flex items-center space-x-1 hover:text-blue-400 transition">
          <LayoutDashboard className="w-4 h-4" />
          <span>Editor</span>
        </Link>
        <Link to="/history" className="flex items-center space-x-1 hover:text-blue-400 transition">
          <History className="w-4 h-4" />
          <span>History</span>
        </Link>
      </div>
    </nav>
  );
}