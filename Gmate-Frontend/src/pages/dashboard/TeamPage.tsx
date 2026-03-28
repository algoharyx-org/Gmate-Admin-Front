import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api.mock";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Loader2, UserPlus, Mail, Briefcase, Percent } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import InviteMemberModal from "@/components/team/InviteMemberModal";

const departments = ["All", "Design", "Development", "Operations", "Management"];

export default function TeamPage() {
  const queryClient = useQueryClient();
  const [selectedDept, setSelectedDept] = useState("All");
  const [inviteOpen, setInviteOpen] = useState(false);

  const { data: team = [], isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: () => api.getTeam(),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => api.removeMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast.success("Member removed");
    },
  });

  const filteredTeam = selectedDept === "All" ? team : team.filter((m) => m.department === selectedDept);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="h-10 w-48 animate-pulse rounded-xl bg-slate-200 dark:bg-white/5" />
          <div className="h-11 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-white/5" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-64 animate-pulse rounded-3xl bg-white/40 dark:bg-white/5" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">Team</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-tight">Manage organization members and workload.</p>
        </div>
        <Button 
          onClick={() => setInviteOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 rounded-full h-11 px-8 font-black uppercase tracking-widest text-white transition-all active:scale-95 shadow-lg shadow-indigo-500/20 w-full sm:w-auto"
        >
          <UserPlus size={18} className="mr-2" /> Invite
        </Button>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {departments.map((dept) => (
          <Button
            key={dept}
            size="sm"
            className={`rounded-full px-6 text-[10px] font-black uppercase tracking-widest transition-all ${
              selectedDept === dept 
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-transparent shadow-lg" 
                : "bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/10"
            }`}
            onClick={() => setSelectedDept(dept)}
          >
            {dept}
          </Button>
        ))}
      </div>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeam.map((member) => (
          <div
            key={member.id}
            className="group relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-white dark:hover:bg-slate-900/60 hover:border-indigo-500/40 hover:-translate-y-1 shadow-md hover:shadow-2xl"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="relative">
                <div className="h-16 w-16 overflow-hidden rounded-2xl border-2 border-white dark:border-slate-800 shadow-xl group-hover:scale-105 transition-transform">
                  <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                </div>
                <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500 shadow-sm" />
              </div>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl p-2 transition-all opacity-0 group-hover:opacity-100">
                    {removeMutation.isPending && removeMutation.variables === member.id ? <Loader2 size={16} className="animate-spin" /> : <MoreHorizontal size={18} />}
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="z-50 min-w-[160px] rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-1 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white" align="end">
                    <DropdownMenu.Item className="focus:bg-slate-100 dark:focus:bg-white/10 flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none transition-colors">Profile</DropdownMenu.Item>
                    <DropdownMenu.Separator className="bg-slate-200 dark:bg-white/5 my-1 h-px" />
                    <DropdownMenu.Item 
                      className="text-rose-600 dark:text-rose-400 focus:bg-rose-50 dark:focus:bg-rose-500/10 flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none transition-colors"
                      onSelect={() => confirm(`Remove ${member.name}?`) && removeMutation.mutate(member.id)}
                    >
                      <Trash2 size={14} /> Remove
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{member.name}</h3>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Mail size={12} className="opacity-50" />
                <span className="text-[10px] font-black uppercase tracking-widest">{member.email}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-slate-100/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 text-[9px] font-black tracking-widest uppercase rounded-full">{member.role}</Badge>
              <Badge variant="outline" className="bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black tracking-widest uppercase rounded-full">{member.department}</Badge>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200/50 dark:border-white/5 pt-6">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[9px] font-black">
                  <Briefcase size={10} /> <span>Projects</span>
                </div>
                <p className="text-base font-black leading-none">{member.projects}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[9px] font-black">
                  <Percent size={10} /> <span>Capacity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${member.capacity > 80 ? "bg-rose-500" : member.capacity > 50 ? "bg-amber-500" : "bg-emerald-500"}`} 
                      style={{ width: `${member.capacity}%` }} 
                    />
                  </div>
                  <span className="text-[10px] font-black">{member.capacity}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <InviteMemberModal open={inviteOpen} onOpenChange={setInviteOpen} />
    </div>
  );
}
