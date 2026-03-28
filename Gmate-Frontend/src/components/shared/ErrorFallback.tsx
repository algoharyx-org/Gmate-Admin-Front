import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  isNetworkError?: boolean;
  onRetry?: () => void;
}

export function ErrorFallback({
  title = "Something went wrong",
  message = "We encountered an unexpected error.",
  isNetworkError = false,
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className={`rounded-full p-4 mb-6 ${isNetworkError ? "bg-amber-500/10" : "bg-red-500/10"}`}>
        {isNetworkError ? (
          <WifiOff className={`h-12 w-12 text-amber-500`} />
        ) : (
          <AlertTriangle className={`h-12 w-12 text-red-500`} />
        )}
      </div>
      <h2 className="text-2xl font-black tracking-tight text-foreground mb-2">
        {isNetworkError ? "Server Offline" : title}
      </h2>
      <p className="text-muted-foreground max-w-md mb-6">
        {isNetworkError
          ? "Unable to connect to the server. Please ensure the backend is running on port 3000."
          : message}
      </p>
      {isNetworkError && (
        <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-4 mb-6 text-left max-w-md">
          <p className="text-sm font-mono text-muted-foreground">
            <span className="text-primary">$</span> cd Gmate-Backend && npm run dev
          </p>
        </div>
      )}
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2 rounded-full">
          <RefreshCw size={16} />
          Try Again
        </Button>
      )}
    </div>
  );
}

interface LoadingFallbackProps {
  count?: number;
}

export function LoadingFallback({ count = 3 }: LoadingFallbackProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-64 animate-pulse rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
        />
      ))}
    </div>
  );
}
