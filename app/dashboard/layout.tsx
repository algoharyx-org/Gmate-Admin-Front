"use client"

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { initSocketEvents } from "@/lib/socket-events";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fetchSession = useAuthStore((state) => state.fetchSession);

  useEffect(() => {
    fetchSession();
    initSocketEvents();
  }, [fetchSession]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="bg-background flex h-screen w-full overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="bg-muted-foreground/10 relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-background border-border hover:bg-accent absolute top-3 left-3 z-50 touch-manipulation rounded-lg border p-2.5 shadow-sm transition-colors lg:hidden"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
          >
            <svg
              className="text-foreground h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <Header />

        <div className="w-full flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </div>
      </main>
      <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              borderRadius: "var(--radius)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-card-foreground)",
            },
          }}
        />
    </div>
  );
}
