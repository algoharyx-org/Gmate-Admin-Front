import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loading({ size = "md", className }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
          sizeClasses[size],
        )}
      />
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
    </div>
  );
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center space-x-1", className)}
    >
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
    </div>
  );
}
