import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { projectService } from "@/services/project.service";
import { taskService } from "@/services/task.service";
import type { TaskStatus } from "@/types/project";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {
  onClose: () => void;
  projectId?: string;
};

export default function AddTaskDialog({ onClose, projectId }: Props) {
  const queryClient = useQueryClient();
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || "");

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
    enabled: !projectId,
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "to-do" as TaskStatus,
    tag: "GENERAL",
    dueDate: "",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
  });

  const mutation = useMutation({
    mutationFn: (data: any) => taskService.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      if (selectedProjectId) {
        queryClient.invalidateQueries({ queryKey: ["tasks", selectedProjectId] });
      }
      toast.success("Task created successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to create task");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (!selectedProjectId) {
      toast.error("Please select a project");
      return;
    }

    mutation.mutate({
      ...form,
      project: selectedProjectId,
    });
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription className="text-xs">
            Create a new task to track progress within your workspace.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {!projectId && (
            <div className="space-y-1.5">
              <Label htmlFor="project" className="text-xs font-medium">Project</Label>
              <select 
                id="project" 
                value={selectedProjectId} 
                onChange={e => setSelectedProjectId(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select a project</option>
                {projects?.map(p => (
                  <option key={p._id} value={p._id}>{p.title}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-medium">Title</Label>
            <Input id="title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="What needs to be done?" className="bg-background" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="desc" className="text-xs font-medium">Description</Label>
            <Textarea id="desc" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Add details..." className="min-h-[100px] bg-background resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="tag" className="text-xs font-medium">Tag</Label>
              <Input id="tag" value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} className="bg-background" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date" className="text-xs font-medium">Due Date</Label>
              <Input id="date" type="date" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} className="bg-background" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <Label htmlFor="status" className="text-xs font-medium">Status</Label>
                <select 
                  id="status" 
                  value={form.status} 
                  onChange={e => setForm({...form, status: e.target.value as TaskStatus})}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="to-do">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                  <option value="important">Important</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="priority" className="text-xs font-medium">Priority</Label>
                <select 
                  id="priority" 
                  value={form.priority} 
                  onChange={e => setForm({...form, priority: e.target.value as any})}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="h-9 rounded-md">Cancel</Button>
            <Button type="submit" disabled={mutation.isPending} className="h-9 px-4 rounded-md">
              {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
