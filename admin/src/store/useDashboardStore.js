import { create } from 'zustand';
import { generateInsights } from '../lib/geminiAgent';

/**
 * Zustand Store for the AI-Driven Dashboard.
 * Includes a dynamic data engine with 'analyzeData' action.
 */
export const useDashboardStore = create((set, get) => ({
  data: [],
  analysis: null,
  viewMode: 'default', // 'default' | 'warning' | 'success'
  isLoading: false,
  error: null,

  // Action to update raw data
  setData: (newData) => set({ data: newData }),

  // Dynamic Data Engine: Analyze data using Gemini AI
  analyzeData: async () => {
    const { data } = get();
    if (!data || data.length === 0) return;

    set({ isLoading: true, error: null });

    try {
      // Call the "Agentic" Bridge
      const result = await generateInsights(data);

      set({
        analysis: result.summary,
        suggestions: result.suggestions,
        viewMode: result.recommendedView || 'default',
        isLoading: false,
      });
    } catch (err) {
      console.error('AI Analysis failed:', err);
      set({ 
        error: 'Failed to analyze project health.', 
        isLoading: false,
        viewMode: 'default' 
      });
    }
  },

  // Reset the dashboard state
  resetAnalysis: () => set({ analysis: null, viewMode: 'default', suggestions: [] }),
}));
