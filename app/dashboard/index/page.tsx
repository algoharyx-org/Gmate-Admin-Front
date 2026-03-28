"use client"

import { getIndex, markContactRead, markAllContactRead, deleteContact } from "@/services/apiContact";
import { useEffect, useState } from "react";
import { Calendar, Mail, MessageSquare, Search, User, Check, MailOpen, Trash2, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSocket } from "@/lib/socket";

type Index = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function Index() {
  const [indexes, setIndexes] = useState<Index[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const socket = getSocket();

  useEffect(() => {
    socket.on("contact:new", (data) => {
      setIndexes((prev) => [data, ...prev]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    setIsLoading(true);
    getIndex()
      .then((res) => {
        setIndexes(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch indexes:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredIndexes = indexes.filter((index) => {
    const query = searchQuery.toLowerCase();
    return (
      index.name.toLowerCase().includes(query) ||
      index.email.toLowerCase().includes(query) ||
      index.message.toLowerCase().includes(query)
    );
  });

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

  const handleToggleRead = async (id: string) => {
    try {
      setIndexes((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, read: true } : item
        )
      );
      await markContactRead(id);
    } catch (error) {
      console.error("Failed to update read status:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      setIndexes((prev) => prev.map((item) => ({ ...item, read: true })));
      await markAllContactRead();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIndexes((prev) => prev.filter((item) => item._id !== id));
      await deleteContact(id);
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Contact Messages
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and manage inquiries from your contact form.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search by name, email, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredIndexes.length} message{filteredIndexes.length !== 1 ? 's' : ''}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleMarkAllRead}
            disabled={filteredIndexes.length === 0 || filteredIndexes.every(i => i.read)}
            className="shrink-0"
          >
            <CheckCheck size={16} className="mr-2" />
            <span className="hidden sm:inline">Mark All Read</span>
            <span className="sm:hidden">Mark All</span>
          </Button>
        </div>
      </div>

      {/* Grid Layout */}
      {isLoading ? (
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
      ) : filteredIndexes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filteredIndexes.map((index) => (
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
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar size={14} className="shrink-0" />
                  <span className="truncate">{formatDate(index.createdAt)}</span>
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={index.read}
                    className={`h-7 px-2 text-xs ${index.read ? "text-muted-foreground" : "text-primary hover:text-primary"}`}
                    onClick={() => handleToggleRead(index._id)}
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
                    className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(index._id)}
                  >
                    <Trash2 size={12} className="mr-1.5" />
                    <span className="hidden xl:inline">Delete</span>
                  </Button>
                </div>
              </div>
                </div>
                
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background/50 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            {indexes.length === 0 ? (
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            ) : (
              <Search className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-lg font-semibold mb-1">
            {indexes.length === 0 ? "No messages yet" : "No messages found"}
          </h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {indexes.length === 0 
              ? "When someone uses the contact form, their message will appear here."
              : "We couldn't find any messages matching your search query. Try adjusting your filters or search term."}
          </p>
          {indexes.length !== 0 && (
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
