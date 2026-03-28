import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-5 p-8 rounded-2xl bg-card border border-border/50 shadow-2xl">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full blur-xl bg-primary/30 animate-pulse"></div>
          <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
        </div>
        <div className="space-y-1 text-center">
          <p className="text-foreground font-semibold tracking-wide">Loading...</p>
          <p className="text-xs text-muted-foreground animate-pulse">Please wait while we serve your content.</p>
        </div>
      </div>
    </div>
  );
}
