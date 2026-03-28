"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getContactById, deleteContact } from "@/services/apiContact";
import { ArrowLeft, Calendar, Mail, MessageSquare, Trash2, User, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Index = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function IndexDetails() {
  const { indexId } = useParams();
  const router = useRouter();
  const [index, setIndex] = useState<Index | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getContactById(indexId as string)
      .then((res) => {
        setIndex(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch index:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [indexId]);

  const handleDelete = async () => {
    if (!index) return;
    try {
      setIsDeleting(true);
      await deleteContact(index._id);
      router.push("/dashboard/index");
    } catch (error) {
      console.error("Failed to delete contact:", error);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
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
      <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-pulse">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-muted rounded-md shrink-0"></div>
          <div className="h-8 bg-muted rounded w-1/3 sm:w-48"></div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-8 border-b border-border">
            <div className="h-16 w-16 rounded-full bg-muted shrink-0"></div>
            <div className="space-y-4 flex-1 mt-2">
              <div className="h-6 bg-muted rounded w-3/4 sm:w-1/2"></div>
              <div className="h-4 bg-muted rounded w-1/2 sm:w-1/3"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-11/12"></div>
            <div className="h-4 bg-muted rounded w-4/5 pt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!index) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 w-full">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <MessageSquare className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">Message Not Found</h2>
        <p className="text-muted-foreground text-center max-w-sm">The message you&apos;re looking for doesn&apos;t exist or has been deleted.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/index">Back to Messages</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="shrink-0 bg-background hover:bg-muted/50 transition-colors">
            <Link href="/dashboard/index">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-foreground truncate">
            Message Details
          </h1>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 sm:flex-none" 
            asChild
          >
            <a href={`mailto:${index.email}?subject=Reply to your inquiry`}>
              <Reply className="mr-2 h-4 w-4" />
              <span>Reply</span>
            </a>
          </Button>
          <Button 
            variant="destructive" 
            className="flex-1 sm:flex-none" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-all hover:shadow-md">
        {/* Card Header Profile */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 p-6 md:p-8 bg-muted/20 border-b border-border">
          <div className="flex items-start gap-4 sm:gap-6 min-w-0">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform hover:scale-105">
              <User size={28} className="sm:hidden" />
              <User size={32} className="hidden sm:block" />
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <h2 className="text-xl sm:text-2xl font-bold text-card-foreground truncate">
                {index.name || "Unknown Sender"}
              </h2>
              <div className="flex items-center gap-2 text-sm text-primary mt-1 hover:underline truncate">
                <Mail size={14} className="shrink-0" />
                <a href={`mailto:${index.email}`} className="truncate">
                  {index.email}
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0 bg-background/50 py-1.5 px-3 rounded-full border border-border/50 self-start">
            <Calendar size={14} className="shrink-0" />
            <span>{formatDate(index.createdAt)}</span>
          </div>
        </div>

        {/* Message Body */}
        <div className="p-6 md:p-8 relative">
          <MessageSquare size={32} className="absolute text-muted-foreground/10 top-8 right-8 pointer-events-none hidden sm:block" />
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed text-foreground min-h-[150px] font-medium text-[15px] sm:text-base">
              {index.message}
            </p>
          </div>
          
          {!index.read && (
            <div className="mt-8 flex items-center justify-start">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                Unread message
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}