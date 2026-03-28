import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Sparkles, X, Lightbulb, Zap, Rocket, Stars, BrainCircuit, ArrowRight } from "lucide-react";

const SUGGESTIONS = [
  {
    icon: <Zap className="text-amber-400" />,
    title: "Optimize Workflow",
    text: "You have 3 high-priority tasks due tomorrow. Consider starting with 'API Integration' to unblock the frontend team."
  },
  {
    icon: <Lightbulb className="text-blue-400" />,
    title: "Focus Time",
    text: "Based on your activity, your peak productivity is between 9 AM and 11 AM. I can block your calendar for deep work."
  },
  {
    icon: <Rocket className="text-emerald-400" />,
    title: "Capacity Alert",
    text: "Mohamed Teama is at 88% capacity. Consider delegating the 'UI Audit' to Eslam to maintain project velocity."
  }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {/* Floating VisionOS Action Button */}
      <Dialog.Trigger asChild>
        <button className="fixed bottom-8 right-8 z-[100] group">
          <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-lg border border-white/20 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95">
            <Sparkles size={28} className="text-white fill-white/10 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-slate-950 animate-bounce" />
          </div>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/20 backdrop-blur-sm fixed inset-0 z-[110] animate-in fade-in duration-200" />
        <Dialog.Content className="fixed bottom-28 right-8 z-[120] w-full max-w-[380px] bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-8 zoom-in-95 duration-300 text-slate-100 outline-none">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/20 p-2 rounded-xl border border-indigo-500/30">
                <BrainCircuit size={20} className="text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight leading-none">Gmate AI</h2>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 animate-pulse">Neural Engine Active</span>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full p-1.5">
                <X size={16} />
              </button>
            </Dialog.Close>
          </div>

          {/* Suggestions List */}
          <div className="space-y-4 mb-10">
            {SUGGESTIONS.map((s, i) => (
              <div key={i} className="group bg-white/5 border border-white/5 rounded-2xl p-4 transition-all hover:bg-white/10 hover:border-indigo-500/30 cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  {s.icon}
                  <h3 className="text-xs font-black uppercase tracking-widest text-white/90">{s.title}</h3>
                </div>
                <p className="text-[13px] text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          {/* Marketing Teaser */}
          <div className="relative bg-indigo-600/20 border border-indigo-500/30 rounded-3xl p-6 overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Stars size={60} />
            </div>
            <h4 className="text-indigo-300 text-sm font-black uppercase tracking-widest mb-2 flex items-center gap-2">
              <Zap size={14} className="fill-indigo-300" />
              Coming Soon
            </h4>
            <p className="text-white text-[15px] font-bold leading-tight mb-4">
              Unlock Advanced AI Insights & Predictive Task Management.
            </p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20">
              Get Early Access <ArrowRight size={14} />
            </button>
          </div>

          {/* Branding */}
          <div className="mt-8 text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Built for high-performance</p>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
