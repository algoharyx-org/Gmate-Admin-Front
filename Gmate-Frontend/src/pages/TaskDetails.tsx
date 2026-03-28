import { useMemo, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  MessageSquare,
  Send,
  UploadCloud,
  FileText,
  X,
} from "lucide-react";
import { useTaskStore } from "@/store/useTaskStore";
import EditTaskDialog from "@/components/EditTaskModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "important":
      return "border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/5 dark:bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.1)]";
    case "in-progress":
      return "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
    case "upcoming":
      return "border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]";
    case "completed":
      return "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
    default:
      return "border-slate-500/20 text-slate-600 dark:text-slate-400 bg-slate-500/5 dark:bg-slate-500/10";
  }
};

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tasks = useTaskStore((state) => state.tasks);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const task = useMemo(() => {
    return tasks.find((t) => t._id === id);
  }, [id, tasks]);

  const [isCompleted, setIsCompleted] = useState<boolean>(() => task?.status === "completed");
  const [editingTask, setEditingTask] = useState<any | null>(null);
  const [newComment, setNewComment] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [comments, setComments] = useState([
    { id: 1, author: "System", text: "Task created and assigned.", time: "2 hours ago" },
    { id: 2, author: "Admin", text: "Please review the attached guidelines.", time: "1 hour ago" },
  ]);

  if (!task) return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
      <h1 className="text-2xl font-bold">Task not found</h1>
      <Button onClick={() => navigate(-1)} variant="outline" className="rounded-full px-8">Go Back</Button>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 space-y-10 animate-fade-in text-foreground">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            <ArrowLeft size={14} /> Back to tasks
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className={`text-3xl sm:text-4xl font-black tracking-tight leading-none ${isCompleted ? "opacity-50 line-through" : ""}`}>
              {task.title}
            </h1>
            <Badge variant="outline" className={`px-3 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-500 ${getStatusStyles(task.status)}`}>
              {task.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={() => setEditingTask(task)} className="rounded-xl flex-1 sm:flex-none font-bold">Edit Task</Button>
          <Button 
            onClick={() => setIsCompleted(!isCompleted)}
            className={`rounded-xl flex-1 sm:flex-none font-bold shadow-lg transition-all ${isCompleted ? "bg-emerald-600 hover:bg-emerald-500" : "bg-primary hover:bg-indigo-500"}`}
          >
            {isCompleted ? <CheckCircle2 className="mr-2" size={18} /> : <Circle className="mr-2" size={18} />}
            {isCompleted ? "Completed" : "Complete"}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* Description */}
          <section className="bg-card border border-border p-8 rounded-[2rem] shadow-sm space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Description</h3>
            <p className="text-foreground/80 text-base font-medium leading-relaxed italic">
              "{task.description}"
            </p>
          </section>

          {/* Attachments */}
          <section className="bg-card border border-border p-8 rounded-[2rem] shadow-sm space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <UploadCloud size={14} /> Attachments
            </h3>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files) setFiles([...files, ...Array.from(e.dataTransfer.files)]); }}
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
            >
              <UploadCloud className="text-muted-foreground mb-2" size={32} />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Drag files or click to upload</p>
              <input type="file" ref={fileInputRef} className="hidden" multiple onChange={(e) => e.target.files && setFiles([...files, ...Array.from(e.target.files)])} />
            </div>

            {files.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border group hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText size={18} className="text-primary shrink-0" />
                      <span className="text-[11px] font-bold truncate">{f.name}</span>
                    </div>
                    <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="p-1 text-muted-foreground hover:text-rose-500"><X size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Comments */}
          <section className="bg-card border border-border p-8 rounded-[2rem] shadow-sm space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <MessageSquare size={14} /> Discussion ({comments.length})
            </h3>
            
            <div className="space-y-6">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-4">
                  <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary shrink-0">
                    {c.author[0]}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-widest">{c.author}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">{c.time}</span>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-2xl rounded-tl-sm text-sm font-medium leading-relaxed">
                      {c.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/50">
              <input 
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Button 
                onClick={() => { if(newComment.trim()) { setComments([...comments, {id: Date.now(), author: "You", text: newComment, time: "Just now"}]); setNewComment(""); }}}
                className="rounded-xl h-11 px-6 font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20"
              >
                <Send size={16} />
              </Button>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          <div className="bg-card border border-border p-8 rounded-[2rem] shadow-sm space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Properties</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Created</span>
                <span className="text-xs font-black">{task.dueDate || "No date"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tag</span>
                <Badge variant="secondary" className="rounded-md font-bold uppercase text-[9px] tracking-widest">{task.tag || "GENERAL"}</Badge>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Priority</span>
                <Badge variant="outline" className={`rounded-full font-bold uppercase text-[9px] tracking-widest ${getStatusStyles(task.status)}`}>{task.status}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editingTask && (
        <EditTaskDialog
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}
