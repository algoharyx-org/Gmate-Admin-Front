"use client"

import { Calendar, Mail, MessageSquare, Search, User, Check, MailOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Index as IndexType } from "@/lib/types";

interface IndexGridProps {
  isLoading: boolean;
  indexes: IndexType[];
  searchQuery: string;
  statusFilter: string;
  onClearFilters: () => void;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function IndexGrid({
  isLoading,
  indexes,
  searchQuery,
  statusFilter,
  onClearFilters,
  onToggleRead,
  onDelete
}: IndexGridProps) {
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

  if (indexes.length === 0) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background/50 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            {!searchQuery && statusFilter === "all" ? (
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            ) : (
              <Search className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-lg font-semibold mb-1">
            {!searchQuery && statusFilter === "all" ? "No messages yet" : "No messages found"}
          </h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {!searchQuery && statusFilter === "all" 
              ? "When someone uses the contact form, their message will appear here."
              : "We couldn't find any messages matching your search query or filters."}
          </p>
          {(searchQuery || statusFilter !== "all") && (
            <Button variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {indexes.map((index) => (
        <div
          key={index._id}
          className={`group flex flex-col justify-between rounded-xl border ${index.read ? "border-border bg-card" : "border-primary/40 bg-primary/5"} p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/50 relative`}
        >
          {!index.read && (
            <div className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-primary" />
          )}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User size={18} />
              </div>
              <div className="min-w-0 pr-6 flex-1">
                <h3 className="font-semibold text-card-foreground truncate group-hover:text-primary transition-colors">
                  {index.name || "Unknown Sender"}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate mt-0.5">
                  <Mail size={12} className="shrink-0" />
                  <a href={`mailto:${index.email}`} className="truncate hover:underline">
                    {index.email}
                  </a>
                </div>
              </div>
            </div>
            
            <Link href={`/dashboard/index/${index._id}`}>
              <div className={`rounded-lg p-3 mb-4 text-sm text-foreground relative ${index.read ? "bg-muted/50" : "bg-background/80"}`}>
                <MessageSquare size={14} className="absolute text-muted-foreground/30 top-3 right-3" />
                <p className="line-clamp-2 whitespace-pre-wrap">
                  {index.message}
                </p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border mt-auto">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Calendar size={14} className="shrink-0" />
              <span className="truncate">{formatDate(index.createdAt)}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                disabled={index.read}
                className={`flex-1 sm:flex-none h-7 px-2 text-xs ${index.read ? "text-muted-foreground" : "text-primary hover:text-primary"}`}
                onClick={() => onToggleRead(index._id)}
              >
                {index.read ? (
                  <>
                    <MailOpen size={12} className="mr-1.5" />
                    <span className="hidden xl:inline">Mark Unread</span>
                    <span className="xl:hidden">Unread</span>
                  </>
                ) : (
                  <>
                    <Check size={12} className="mr-1.5" />
                    <span className="hidden xl:inline">Mark Read</span>
                    <span className="xl:hidden">Read</span>
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 sm:flex-none h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(index._id)}
              >
                <Trash2 size={12} className="mr-1.5" />
                <span className="hidden xl:inline">Delete</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
