import { z } from "zod";

export const TaskStatusSchema = z.enum([
  "to-do",
  "in-progress",
  "review",
  "completed",
  "important",
  "upcoming",
]);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskSchema = z.object({
  _id: z.string(),
  project: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  status: TaskStatusSchema,
  priority: z.enum(["low", "medium", "high", "urgent"]),
  tag: z.string().optional(),
  assignee: z.string().or(z.object({ _id: z.string(), name: z.string(), avatar: z.string().optional() })).optional(),
  createdBy: z.string().optional(),
  dueDate: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;

export const ProjectSchema = z.object({
  _id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["active", "on-hold", "completed", "planning"]),
  owner: z.string().or(z.object({ _id: z.string(), name: z.string() })).optional(),
  members: z.array(z.object({
    user: z.string().or(z.object({ _id: z.string(), name: z.string(), avatar: z.string().optional() })),
    role: z.enum(["manager", "developer", "viewer"])
  })).optional(),
  progress: z.number().min(0).max(100).optional().default(0),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["active", "on-hold", "completed", "planning"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof ProjectFormSchema>;

export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  department: z.string(),
  capacity: z.number(),
  projects: z.number(),
  status: z.string(),
  avatar: z.string(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;
