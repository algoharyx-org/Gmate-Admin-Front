"use client"

import { User, Calendar, Check, X, Edit, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User as UserType } from "@/lib/types";

interface UserGridProps {
  isLoading: boolean;
  users: UserType[];
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  onClearFilters: () => void;
  onToggleActive: (id: string) => void;
  onEdit: (user: UserType) => void;
  onDelete: (id: string) => void;
}

export function UserGrid({
  isLoading,
  users,
  searchQuery,
  roleFilter,
  statusFilter,
  onClearFilters,
  onToggleActive,
  onEdit,
  onDelete,
}: UserGridProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((sk) => (
          <div key={sk} className="rounded-xl border border-border bg-card p-5 shadow-sm animate-pulse">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
            </div>
            <div className="h-3 bg-muted rounded w-1/3 mt-4 pt-4 border-t border-border"></div>
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl min-h-[400px] gap-4 w-full bg-card border border-border shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">No Users Found</h2>
        <p className="text-muted-foreground text-center max-w-sm px-4">
          {searchQuery || roleFilter !== "all" || statusFilter !== "all" 
            ? "No users match your applied filters. Try adjusting your search criteria." 
            : "No users have been added yet."}
        </p>
        {(searchQuery || roleFilter !== "all" || statusFilter !== "all") && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {users.map((user) => (
        <div
          key={user._id}
          className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {user.name || "Unknown"}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground">
                    {user.role}
                  </span>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${user.active ? "border-green-500 bg-green-500/10 text-green-600" : "border-red-500 bg-red-500/10 text-red-600"}`}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar size={12} />
                Joined: {formatDate(user.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onToggleActive(user._id)}
              className="flex-1 min-w-[30%]"
            >
              {user.active ? <X size={14} className="mr-1 sm:mr-2 shrink-0" /> : <Check size={14} className="mr-1 sm:mr-2 shrink-0" />}
              <span className="truncate">{user.active ? "Deactivate" : "Activate"}</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(user)}
              className="flex-1 min-w-[20%]"
            >
              <Edit size={14} className="mr-1 sm:mr-2 shrink-0" />
              <span>Edit</span>
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete(user._id)}
              className="flex-1 min-w-[20%]"
            >
              <Trash2 size={14} className="mr-1 sm:mr-2 shrink-0" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
