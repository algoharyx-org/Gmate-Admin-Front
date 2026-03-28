import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/40 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

export function TaskSkeleton() {
  return (
    <div className="border-border bg-card/40 space-y-3 rounded-xl border p-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

export function KanbanColumnSkeleton() {
  return (
    <div className="w-[300px] shrink-0 space-y-4 rounded-xl">
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>
      <div className="space-y-3">
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
      </div>
    </div>
  );
}
