import * as Dialog from "@radix-ui/react-dialog";
import { X, Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectService } from "@/services/project.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const projectSchema = z.object({
  title: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["active", "on-hold", "completed", "planning"]),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { status: "active" },
  });

  const mutation = useMutation({
    mutationFn: (data: ProjectFormValues) => projectService.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created");
      setOpen(false);
      reset();
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="h-9 px-4 rounded-md text-sm font-medium">
          <Plus size={16} className="mr-2" /> New Project
        </Button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="bg-background/80 backdrop-blur-sm fixed inset-0 z-50 animate-in fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-card border border-border p-6 shadow-lg rounded-lg animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-semibold">New Project</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>
          
          <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-medium">Project Name</Label>
              <Input {...register("title")} placeholder="e.g. Next.js Migration" className="bg-background" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="desc" className="text-xs font-medium">Description</Label>
              <Textarea {...register("description")} placeholder="Describe the project..." className="min-h-[100px] bg-background resize-none" />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Dialog.Close asChild>
                <Button type="button" variant="outline" className="h-9 rounded-md">Cancel</Button>
              </Dialog.Close>
              <Button type="submit" disabled={mutation.isPending} className="h-9 px-4 rounded-md">
                {mutation.isPending ? <Loader2 size={16} className="animate-spin" /> : "Create Project"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
