import { 
  Zap, 
  Target, 
  Users, 
 
  ShieldCheck, 
  Cpu 
} from "lucide-react";

export default function About() {
  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-hidden selection:bg-indigo-500/30">
      {/* --- Atmospheric Background --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-indigo-600/5 dark:bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-cyan-500/5 dark:bg-cyan-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* --- Hero Section --- */}
          <header className="max-w-4xl mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-indigo-500 dark:text-indigo-400 uppercase shadow-sm mb-8">
              <Target size={14} />
              <span>Our Mission</span>
            </div>
            <h1 className="text-foreground text-5xl sm:text-7xl font-black tracking-tight leading-[1.1] mb-10">
              Built by engineers, for{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
                high-performance
              </span>{" "}
              teams.
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
              We started Gmate with a simple goal: remove the friction from technical project management. No bloat, no lag, just focus.
            </p>
          </header>

          {/* --- Bento Grid Values --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            {/* Speed Card */}
            <div className="md:col-span-2 bg-card/50 backdrop-blur-md border border-border rounded-3xl p-10 hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative">
              <div className="absolute -right-8 -top-8 bg-indigo-500/5 w-40 h-40 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
              <div className="bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/20">
                <Zap size={28} className="text-indigo-500 dark:text-indigo-400" />
              </div>
              <h3 className="text-foreground text-3xl font-black mb-4">Uncompromising Speed</h3>
              <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-lg">
                Performance is a feature. Every interaction in Gmate is optimized to be sub-100ms, ensuring your thoughts never outpace your tools.
              </p>
            </div>

            {/* Focus Card */}
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-3xl p-10 hover:-translate-y-1 transition-all duration-500 group">
              <div className="bg-cyan-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20">
                <Cpu size={28} className="text-cyan-500 dark:text-cyan-400" />
              </div>
              <h3 className="text-foreground text-2xl font-black mb-4">Radical Clarity</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                We believe in surfacing only what matters. Our UI is a canvas for your work, not a distraction.
              </p>
            </div>

            {/* Team Card */}
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-3xl p-10 hover:-translate-y-1 transition-all duration-500 group">
              <div className="bg-purple-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-purple-500/20">
                <Users size={28} className="text-purple-500 dark:text-purple-400" />
              </div>
              <h3 className="text-foreground text-2xl font-black mb-4">Human Sync</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Software should serve the team. Gmate fosters natural collaboration without the endless notification noise.
              </p>
            </div>

            {/* Security Card */}
            <div className="md:col-span-2 bg-card/50 backdrop-blur-md border border-border rounded-3xl p-10 hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative">
              <div className="absolute -left-8 -bottom-8 bg-emerald-500/5 w-40 h-40 rounded-full blur-3xl" />
              <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20">
                <ShieldCheck size={28} className="text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-foreground text-3xl font-black mb-4">Dependable Privacy</h3>
              <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-lg">
                Your data is your most valuable asset. Gmate employs end-to-end encryption and enterprise-grade security protocols by default.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
