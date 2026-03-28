import React from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { Sparkles, ArrowRight } from 'lucide-react';

/**
 * Modular AI Widget: Smart Suggestions.
 * Features: Glassmorphism and responsive transitions.
 */
export const SmartSuggestions = () => {
  const { suggestions, viewMode } = useDashboardStore();

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className={`col-span-full md:col-span-2 lg:col-span-1 p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 shadow-xl ${
      viewMode === 'warning' ? 'bg-orange-950/20 border-orange-500/30' : 
      viewMode === 'success' ? 'bg-emerald-950/20 border-emerald-500/30' : 
      'bg-white/5 border-white/20'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="text-white font-semibold">AI Recommendations</h3>
      </div>
      
      <ul className="space-y-4">
        {suggestions.map((suggestion, idx) => (
          <li key={idx} className="group cursor-pointer">
            <div className="flex gap-3 items-start">
              <div className="mt-1 flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
              </div>
              <p className="text-sm text-white/70 group-hover:text-white transition-colors leading-relaxed">
                {suggestion}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
