"use client"

import { Search, Filter, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndexFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  handleMarkAllRead: () => void;
  disabledMarkAll: boolean;
}

export function IndexFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  handleMarkAllRead,
  disabledMarkAll
}: IndexFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between rounded-xl bg-card p-4 border border-border shadow-sm">
      <div className="relative w-full lg:max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search by name, email, or message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 sm:flex-none">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 w-full sm:w-auto appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </select>
          <Filter className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-muted-foreground opacity-50" />
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleMarkAllRead}
          disabled={disabledMarkAll}
          className="shrink-0 h-10 px-4"
        >
          <CheckCheck size={16} className="mr-2" />
          <span className="hidden sm:inline">Mark All Read</span>
          <span className="sm:hidden">Mark All</span>
        </Button>
      </div>
    </div>
  );
}
