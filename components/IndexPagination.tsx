"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndexPaginationProps {
  currentPage: number;
  totalPages: number;
  totalIndexes: number;
  allPages: number;
  onPageChange: (page: number) => void;
}

export function IndexPagination({
  currentPage,
  totalPages,
  totalIndexes,
  allPages,
  onPageChange
}: IndexPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="text-sm text-muted-foreground w-full text-center sm:text-left">
        Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span> {totalIndexes > 0 && `(${totalIndexes} total messages)`}
      </div>
      <div className="flex items-center gap-2 sm:w-auto w-full justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2"
        >
          <ChevronLeft size={16} />
          <span className="sr-only">Previous</span>
        </Button>
        <div className="flex items-center justify-center min-w-20 text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || currentPage === allPages}
          className="px-2"
        >
          <ChevronRight size={16} />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
}
