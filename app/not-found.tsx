import { Button } from "@/components/ui/button";
import { FileSearch, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center overflow-hidden relative">
      <div className="max-w-md w-full space-y-8 relative z-10 pb-20">
        <div className="flex justify-center flex-col items-center">
          <div className="text-[140px] font-black leading-none text-muted-foreground/10 select-none drop-shadow-sm">
            404
          </div>
          <div className="rounded-full bg-primary/10 p-5 -mt-12 relative z-10 border border-primary/20 shadow-xl shadow-primary/5 backdrop-blur-xl">
            <FileSearch className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <div className="space-y-4 px-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Page Not Found
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            We couldn&apos;t locate the exact page you&apos;re searching for. It might have been relocated, deleted, or perhaps the URL is simply incorrect.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button className="w-full min-w-[160px] h-11">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full min-w-[160px] h-11 hover:bg-muted/50 transition-colors">
              <Home className="mr-2 h-4 w-4" /> Homepage
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </div>
  );
}
