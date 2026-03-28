import * as Dialog from "@radix-ui/react-dialog";
import { X, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/services/api.mock";
import type { Task, TaskStatus } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTaskStore } from "@/store/useTaskStore";
import { useNavigate } from "react-router-dom";

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["to-do", "in-progress", "review", "completed", "important", "upcoming"] as const),
  tag: z.string().min(1, "Tag is required"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

type Props = {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditTaskDialog({ task, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { updateTask, deleteTask } = useTaskStore();

  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description || "",
      status: task.status as any,
      tag: task.tag || "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: TaskFormValues) => api.updateTaskStatus(task._id, data.status as TaskStatus),
    onSuccess: (_, data) => {
      updateTask(task._id, { status: data.status as any, title: data.title, description: data.description, tag: data.tag });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated");
      onOpenChange(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.deleteTask(task._id),
    onSuccess: () => {
      deleteTask(task._id);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted");
      onOpenChange(false);
      if (window.location.pathname.includes(`/tasks/${task._id}`)) {
        navigate("/dashboard/my-tasks");
      }
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-background/80 backdrop-blur-sm fixed inset-0 z-50 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-card border border-border p-8 shadow-2xl rounded-[2rem] animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-8">
            <Dialog.Title className="text-xl font-black tracking-tight">Edit Task</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-muted transition-all">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit((d) => updateMutation.mutate(d))} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Title</Label>
              <Input {...register("title")} className="bg-muted/30 border-none h-12 rounded-xl font-bold" />
              {errors.title && <p className="text-[10px] text-rose-500 font-bold uppercase">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</Label>
              <Textarea {...register("description")} className="min-h-[120px] bg-muted/30 border-none rounded-xl font-medium resize-none" />
              {errors.description && <p className="text-[10px] text-rose-500 font-bold uppercase">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</Label>
                <select {...register("status")} className="flex h-12 w-full rounded-xl border-none bg-muted/30 px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                  <option value="to-do">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="important">Important</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="review">Review</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tag</Label>
                <Input {...register("tag")} className="bg-muted/30 border-none h-12 rounded-xl font-bold uppercase tracking-widest text-[10px]" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-border/50">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => {
                  if(confirm("Permanently delete this task?")) deleteMutation.mutate();
                }} 
                className="text-rose-500 hover:bg-rose-500/10 h-12 rounded-xl font-black uppercase tracking-widest text-[10px]"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
              <div className="flex gap-3">
                <Dialog.Close asChild>
                  <Button type="button" variant="ghost" className="h-12 rounded-xl font-black uppercase tracking-widest text-[10px]">Cancel</Button>
                </Dialog.Close>
                <Button 
                  type="submit" 
                  disabled={updateMutation.isPending} 
                  className="h-12 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-[0.98] transition-all"
                >
                  {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
