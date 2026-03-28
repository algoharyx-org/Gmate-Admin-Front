"use client"

import { X, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserFormData {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role: string;
}

interface UserModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function UserModal({
  isOpen,
  mode,
  formData,
  setFormData,
  isSubmitting,
  onClose,
  onSubmit
}: UserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {mode === "add" ? "Add New User" : "Edit User"}
          </h2>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="John Doe"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="john@example.com"
            />
          </div>
          
          {mode === "add" && (
            <>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Password</label>
              <input
                type="password"
                required={mode === "add"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Confirm Password</label>
              <input
                type="password"
                required={mode === "add"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="••••••••"
              />
            </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none"
            >
              <option value="user" className="bg-background text-foreground" >User</option>
              <option value="admin" className="bg-background text-foreground" >Admin</option>
            </select>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Button type="button" variant="outline" className="w-full sm:w-1/2" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-1/2 text-white" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {mode === "add" ? "Create User" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
