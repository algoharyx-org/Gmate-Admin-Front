import { useState } from "react";
import { 
  Bell, 
  Shield, 
  User, 
  Palette, 
  Globe, 
  Zap,
  CheckCircle2,
  ChevronRight,
  Moon,
  Sun,
  Mail,
  Lock,
  Eye,
  Activity,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDarkMode } from "@/context/ThemeContext";

const SETTINGS_SECTIONS = [
  { id: "profile", label: "Profile Info", icon: <User className="size-5" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="size-5" /> },
  { id: "security", label: "Security", icon: <Shield className="size-5" /> },
  { id: "appearance", label: "Appearance", icon: <Palette className="size-5" /> },
  { id: "language", label: "Language", icon: <Globe className="size-5" /> },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-10 space-y-10 animate-fade-in text-slate-900 dark:text-slate-100 pb-32">
      <header className="space-y-2">
        <h1 className="text-4xl font-black tracking-tighter leading-none">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your workspace preferences and system security.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Navigation Sidebar */}
        <nav className="w-full lg:w-72 flex flex-col gap-2 shrink-0">
          {SETTINGS_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-black tracking-tight transition-all duration-300 ${
                activeTab === section.id
                  ? "bg-primary text-white shadow-2xl shadow-primary/40 scale-[1.02]"
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <div className="flex items-center gap-4">
                {section.icon}
                {section.label}
              </div>
              <ChevronRight className={`size-4 opacity-50 ${activeTab === section.id ? "rotate-90" : ""}`} />
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <main className="flex-1 bg-white/50 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
          
          {activeTab === "appearance" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tighter">Theme Preference</h3>
                <p className="text-sm text-slate-500 font-medium">Customize how Gmate looks on your high-performance device.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button 
                  onClick={() => isDarkMode && toggleDarkMode()}
                  className={`relative p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-6 group ${
                    !isDarkMode ? "border-primary bg-primary/5 shadow-inner" : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className={`p-5 rounded-3xl transition-all duration-500 ${!isDarkMode ? "bg-white shadow-xl scale-110" : "bg-slate-100 dark:bg-slate-800"}`}>
                    <Sun className={`size-10 ${!isDarkMode ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`} />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-[0.2em] ${!isDarkMode ? "text-primary" : "text-slate-500"}`}>Light Mode</span>
                  {!isDarkMode && <CheckCircle2 className="absolute top-6 right-6 text-primary size-6" />}
                </button>

                <button 
                  onClick={() => !isDarkMode && toggleDarkMode()}
                  className={`relative p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-6 group ${
                    isDarkMode ? "border-primary bg-primary/5 shadow-inner" : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className={`p-5 rounded-3xl transition-all duration-500 ${isDarkMode ? "bg-slate-800 shadow-xl scale-110 border border-white/10" : "bg-slate-100 dark:bg-slate-800"}`}>
                    <Moon className={`size-10 ${isDarkMode ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`} />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-[0.2em] ${isDarkMode ? "text-primary" : "text-slate-500"}`}>Dark Mode</span>
                  {isDarkMode && <CheckCircle2 className="absolute top-6 right-6 text-primary size-6" />}
                </button>
              </div>

              <div className="pt-10 border-t border-slate-200 dark:border-white/10 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-primary" />
                      <Label className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Reduced Motion</Label>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Minimize animations across the dashboard to improve performance.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Palette size={16} className="text-primary" />
                      <Label className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Glassmorphism effects</Label>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Enable advanced transparency and backdrop blur layers.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tighter">Notification Center</h3>
                <p className="text-sm text-slate-500 font-medium">Control how and when you receive workspace updates.</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-border transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl">
                      <Mail size={20} className="text-indigo-500" />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-sm font-black uppercase tracking-widest">Email Digests</Label>
                      <p className="text-xs text-slate-500 font-medium">Weekly summary of your project velocity.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-border transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-2xl">
                      <Activity size={20} className="text-purple-500" />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-sm font-black uppercase tracking-widest">Push Notifications</Label>
                      <p className="text-xs text-slate-500 font-medium">Real-time alerts for task mentions and deadlines.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tighter">Security & Privacy</h3>
                <p className="text-sm text-slate-500 font-medium">Manage your architectural credentials and data access.</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-border transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-500/10 rounded-2xl">
                      <Lock size={20} className="text-rose-500" />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-sm font-black uppercase tracking-widest">Two-Factor Auth</Label>
                      <p className="text-xs text-slate-500 font-medium">Add an extra layer of protection to your account.</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-border transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl">
                      <Eye size={20} className="text-cyan-500" />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-sm font-black uppercase tracking-widest">Public Profile</Label>
                      <p className="text-xs text-slate-500 font-medium">Allow other Gmate users to view your velocity metrics.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-border transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl">
                      <UserCheck size={20} className="text-emerald-500" />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-sm font-black uppercase tracking-widest">Trusted Devices</Label>
                      <p className="text-xs text-slate-500 font-medium">Review and manage devices with active sessions.</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>
              </div>
            </div>
          )}

          {activeTab !== "appearance" && activeTab !== "notifications" && activeTab !== "security" && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-24 opacity-60">
              <div className="p-6 bg-primary/10 rounded-[2rem] animate-pulse">
                <Zap className="size-16 text-primary" />
              </div>
              <h3 className="text-3xl font-black tracking-tighter">Coming Soon</h3>
              <p className="text-base font-bold max-w-sm text-slate-500 dark:text-slate-400">
                This configuration module is part of the <span className="text-primary underline decoration-primary/30">Phase 2: MERN Integration</span> roadmap.
              </p>
            </div>
          )}

          <div className="mt-16 flex items-center justify-end gap-4 pt-8 border-t border-slate-200 dark:border-white/10">
            <Button variant="ghost" className="rounded-2xl px-10 font-black uppercase tracking-widest text-[11px] h-12">Discard Changes</Button>
            <Button onClick={handleSave} className="rounded-2xl px-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-[11px] h-14 shadow-2xl transition-all active:scale-95">
              {saved ? "Saved Securely!" : "Save Configuration"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
