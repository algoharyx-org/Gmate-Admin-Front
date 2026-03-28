import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Settings, 
  Mail, 
  Globe, 
  Calendar, 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  MapPin,
  Link as LinkIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const profile = {
  name: "Mohamed Algoahry",
  role: "Lead Software Architect",
  email: "algoahry@gmate.io",
  bio: "Crafting digital experiences with a focus on high-performance architecture and visionOS aesthetics. Passionate about building tools that empower teams to achieve Flow State.",
  location: "Cairo, Egypt",
  website: "https://algoahry.dev",
  joined: "March 2024",
  stats: [
    { label: "Tasks Completed", value: "142", icon: <Zap className="text-amber-500" /> },
    { label: "Active Projects", value: "6", icon: <ShieldCheck className="text-emerald-500" /> },
    { label: "Velocity Score", value: "98%", icon: <TrendingUp className="text-indigo-500" /> },
  ]
};

const recentSuccess = [
  { name: "VisionOS Dashboard", tag: "CORE", date: "2 days ago", color: "bg-indigo-500" },
  { name: "Neural Sync Engine", tag: "API", date: "1 week ago", color: "bg-purple-500" },
  { name: "Gmate Rebranding", tag: "DESIGN", date: "2 weeks ago", color: "bg-cyan-500" },
];

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-10 space-y-10 animate-fade-in text-slate-900 dark:text-slate-100 pb-32">
      {/* --- Unified Cover & Profile Header --- */}
      <div className="relative group">
        {/* Cover Photo Area */}
        <div className="h-48 md:h-72 w-full rounded-[2.5rem] bg-linear-to-br from-indigo-600 via-purple-600 to-cyan-500 overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
          
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 z-10 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl text-white hover:bg-white/20 transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Profile Info Overlay Card */}
        <div className="relative px-6 md:px-12 -mt-16 md:-mt-24">
          <div className="bg-white/80 dark:bg-slate-950/60 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-10 items-start md:items-end">
            
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-32 w-32 md:h-44 md:w-44 rounded-full border-[6px] border-white dark:border-slate-900 shadow-2xl overflow-hidden">
                <img 
                  src="/assets/team/mohamed_algoahry.jpg" 
                  alt={profile.name} 
                  className="h-full w-full object-cover transform hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="absolute bottom-2 right-2 h-6 w-6 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900" />
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">{profile.name}</h1>
                  <Badge className="bg-indigo-500/10 text-indigo-600 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">PRO MEMBER</Badge>
                </div>
                <p className="text-indigo-600 dark:text-indigo-400 text-lg font-black uppercase tracking-[0.1em]">{profile.role}</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400 font-bold text-sm">
                <div className="flex items-center gap-1.5"><MapPin size={16} className="opacity-50" /> {profile.location}</div>
                <div className="flex items-center gap-1.5"><Calendar size={16} className="opacity-50" /> Joined {profile.joined}</div>
                <div className="flex items-center gap-1.5"><LinkIcon size={16} className="opacity-50" /> {profile.website.replace('https://', '')}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full md:w-auto pt-6 md:pt-0">
              <Button 
                onClick={() => navigate("/dashboard/profile/edit")}
                className="flex-1 md:flex-none h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                <Settings size={18} className="mr-3" /> Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Sidebar: Bio & Stats */}
        <div className="lg:col-span-4 space-y-10">
          <section className="bg-card/50 backdrop-blur-xl border border-border rounded-[2.5rem] p-10 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">About Me</h3>
            <p className="text-lg font-medium leading-relaxed italic text-slate-600 dark:text-slate-300">
              "{profile.bio}"
            </p>
            <div className="pt-6 border-t border-border/50 flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <Mail size={20} className="text-indigo-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Direct Contact</span>
                <span className="text-sm font-bold truncate">{profile.email}</span>
              </div>
            </div>
          </section>

          <div className="grid gap-4">
            {profile.stats.map((stat, i) => (
              <div key={i} className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-6 flex items-center justify-between group hover:border-primary/40 transition-all cursor-default">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                </div>
                <span className="text-2xl font-black tracking-tighter">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content: Portfolio & Activity */}
        <div className="lg:col-span-8 space-y-10">
          
          <section className="bg-card/50 backdrop-blur-xl border border-border rounded-[2.5rem] p-10 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Recent Milestones</h3>
              <Badge variant="outline" className="rounded-full border-slate-200 text-[9px] font-black px-3">Last 30 Days</Badge>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {recentSuccess.map((item, i) => (
                <div key={i} className="group flex flex-col gap-4 p-6 bg-slate-50 dark:bg-white/5 border border-transparent hover:border-border rounded-3xl transition-all cursor-pointer">
                  <div className={`h-2 w-12 rounded-full ${item.color}`} />
                  <h4 className="font-black tracking-tight text-base leading-tight group-hover:text-primary transition-colors">{item.name}</h4>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">{item.tag}</span>
                    <span className="text-[9px] font-bold text-slate-500">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
              <Globe size={200} />
            </div>
            <div className="relative z-10 space-y-6 max-w-lg">
              <h2 className="text-4xl font-black tracking-tighter leading-none">Your Workspace is 100% Secure.</h2>
              <p className="text-indigo-100/70 text-lg font-medium leading-relaxed">
                We've enhanced your architectural footprint with the latest Gmate Neural Core. All projects are now optimized for real-time collaboration.
              </p>
              <div className="flex gap-4">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-black uppercase tracking-widest rounded-2xl h-14 px-10 shadow-xl">
                  View Security Audit
                </Button>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
