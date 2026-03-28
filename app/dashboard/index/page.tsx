"use client"

import { getIndex, markContactRead, markAllContactRead, deleteContact } from "@/services/apiContact";
import { useEffect, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket";

import { Index as IndexType } from "@/lib/types";
import { IndexFilters } from "@/components/IndexFilters";
import { IndexGrid } from "@/components/IndexGrid";
import { IndexPagination } from "@/components/IndexPagination";
import toast from "react-hot-toast";

export default function Index() {
  const [indexes, setIndexes] = useState<IndexType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); 

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allPages, setAllPages] = useState(1);
  const [totalIndexes, setTotalIndexes] = useState(0);
  const indexesPerPage = 6;

  const socket = getSocket();

  const fetchIndexes = useCallback(() => {
    setIsLoading(true);
    
    const params: Record<string, string | number | boolean> = {
      page: currentPage,
      limit: indexesPerPage,
    };
    
    if (searchQuery) params.search = searchQuery;
    if (statusFilter !== "all") params.read = statusFilter === "read";

    getIndex(params)
      .then((res: {contacts: IndexType[], metadata: {totalPages: number}, totalPages: number, length: number}) => {
        const fetchedIndexes = res?.contacts || [];
        setIndexes(Array.isArray(fetchedIndexes) ? fetchedIndexes : []);
        
        if (typeof res?.metadata?.totalPages !== 'undefined') {
          setTotalPages(res.metadata.totalPages);
        } else {
          setTotalPages(1);
        }

        if (typeof res?.totalPages !== 'undefined') {
          setAllPages(res.totalPages);
        } else {
          setAllPages(1);
        }

        if (typeof res?.length !== 'undefined' && res?.length !== null) {
          setTotalIndexes(res.length);
        } else {
          setTotalIndexes(Array.isArray(fetchedIndexes) ? fetchedIndexes.length : 0);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch indexes:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, searchQuery, statusFilter, indexesPerPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchIndexes();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchIndexes]);

  useEffect(() => {
    socket.on("contact:new", () => {
      if (currentPage === 1) {
        fetchIndexes();
      }
    });
    return () => {
        socket.disconnect();
    };
  }, [socket, currentPage, fetchIndexes]);

  const handleToggleRead = async (id: string) => {
    try {
      setIndexes((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, read: true } : item
        )
      );
      await markContactRead(id);
      fetchIndexes();
    } catch (error) {
      console.error("Failed to update read status:", error);
      fetchIndexes();
    }
  };

  const handleMarkAllRead = async () => {
    try {
      setIndexes((prev) => prev.map((item) => ({ ...item, read: true })));
      await markAllContactRead();
      fetchIndexes();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      fetchIndexes();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id);
      if (indexes.length === 1 && currentPage > 1) {
        setCurrentPage(p => p - 1);
      } else {
        fetchIndexes();
      }
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
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

      <IndexFilters
        searchQuery={searchQuery}
        setSearchQuery={(val) => { setSearchQuery(val); setCurrentPage(1); }}
        statusFilter={statusFilter}
        setStatusFilter={(val) => { setStatusFilter(val); setCurrentPage(1); }}
        handleMarkAllRead={handleMarkAllRead}
        disabledMarkAll={indexes.length === 0 || indexes.every(i => i.read)}
      />

      <IndexGrid 
        isLoading={isLoading}
        indexes={indexes}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onClearFilters={clearFilters}
        onToggleRead={handleToggleRead}
        onDelete={handleDelete}
      />
      
      <IndexPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalIndexes={totalIndexes}
        allPages={allPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
