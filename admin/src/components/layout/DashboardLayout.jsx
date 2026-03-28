import React, { use } from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { Layout, Shield, Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

/**
 * Dashboard Layout: Glassmorphic and Prompt-Responsive.
 * React 19 Pattern: Demonstrating the use of 'use()' hook for data fetching simulation.
 */
export const DashboardLayout = ({ children }) => {
  const { viewMode, analysis, isLoading, analyzeData } = useDashboardStore();

  // Prompt-Responsive Styling: Tailwind v4 Dynamic Classes
  const getLayoutClasses = () => {
    switch (viewMode) {
      case 'warning':
        return 'border-orange-500/30 bg-orange-950/20';
      case 'success':
        return 'border-emerald-500/30 bg-emerald-950/20';
      default:
        return 'border-white/20 bg-white/10';
    }
  };

  const Icon = viewMode === 'warning' ? AlertTriangle : 
               viewMode === 'success' ? CheckCircle : 
               Shield;

  return (
    <div className={`min-h-screen p-8 transition-colors duration-700 ease-in-out ${
      viewMode === 'warning' ? 'bg-orange-950/10' : 
      viewMode === 'success' ? 'bg-emerald-950/10' : 
      'bg-slate-950'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header - Glassmorphic */}
        <header className={`backdrop-blur-md border rounded-2xl p-6 flex justify-between items-center transition-all duration-500 ${getLayoutClasses()}`}>
          <div className="flex items-center gap-4">
            <Icon className={`w-10 h-10 ${
              viewMode === 'warning' ? 'text-orange-400' : 
              viewMode === 'success' ? 'text-emerald-400' : 
              'text-white/60'
            }`} />
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Gmate Admin</h1>
              <p className="text-sm text-white/50">AI-Driven System Health</p>
            </div>
          </div>
          
          <button 
            onClick={analyzeData}
            disabled={isLoading}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? 'Analyzing...' : 'Refresh Insights'}
          </button>
        </header>

        {/* AI Insight Bar - Glassmorphic */}
        {analysis && (
          <div className={`backdrop-blur-xl border-l-4 rounded-xl p-4 flex gap-4 animate-in slide-in-from-top-4 fade-in duration-500 ${
            viewMode === 'warning' ? 'bg-orange-400/10 border-orange-500' : 
            viewMode === 'success' ? 'bg-emerald-400/10 border-emerald-500' : 
            'bg-white/5 border-white/40'
          }`}>
            <Activity className="text-white w-6 h-6 flex-shrink-0" />
            <p className="text-white/90 text-sm italic">{analysis}</p>
          </div>
        )}

        {/* Main Content Area: Responsive Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {children}
        </main>
      </div>
    </div>
  );
};
