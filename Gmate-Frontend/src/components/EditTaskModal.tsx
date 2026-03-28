import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTaskStore } from "@/store/useTaskStore";
import type { Task } from "@/types/project";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EditTaskModalProps = {
  task: Task;
  onClose: () => void;
};

export default function EditTaskModal({ task, onClose }: EditTaskModalProps) {
  const updateTask = useTaskStore((state) => state.updateTask);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
    tag: task.tag || "",
    dueDate: task.dueDate || "",
  });
  const [error, setError] = useState("");
  const [selectValue, setSelectValue] = useState<string>(form.status);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    updateTask(task._id, {
      title: form.title.trim(),
      description: form.description.trim(),
      status: selectValue as any,
      tag: form.tag.trim() || "GENERAL",
      dueDate: form.dueDate,
    });

    onClose();
  };

  return (
    <div
      className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="border-border bg-card shadow-card w-full max-w-lg rounded-xl border p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h1 className="text-foreground text-lg font-semibold sm:text-xl">
              Edit Task
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Update the details of this task.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onClose}
            aria-label="Close"
          >
            <ArrowLeft className="size-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="min-h-[80px] resize-none"
              placeholder="Describe what needs to be done"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                name="status"
                value={selectValue}
                onValueChange={setSelectValue}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="inProgress">In Progress</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-tag">Tag</Label>
              <Input
                id="edit-tag"
                name="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="e.g. BUG, TEAM, URGENT"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-date">Due date</Label>
            <Input
              id="edit-date"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
            />
            <p className="text-muted-foreground mt-1 text-[11px]">
              Leave empty to keep current date ({task.dueDate || "none"}).
            </p>
          </div>

          {error && (
            <p className="text-destructive text-xs font-medium">{error}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" size="default">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
