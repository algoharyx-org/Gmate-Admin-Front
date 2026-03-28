"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Detected:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6 border border-destructive/20 relative">
            <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full"></div>
            <AlertTriangle className="h-16 w-16 text-destructive relative z-10" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            An unexpected error has occurred while processing your request. Please try again or return to the safety of your home screen.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Button onClick={() => reset()} className="w-full sm:w-auto min-w-[160px] h-11">
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full min-w-[160px] h-11">
              <Home className="mr-2 h-4 w-4" /> Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
