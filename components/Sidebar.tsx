"use client"

import { useDarkMode } from "@/app/theme-provider";
import {
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  UserCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { isDarkMode } = useDarkMode();
  const pathname = usePathname();

  return (
    <>
      <aside
        className={`border-sidebar-border bg-sidebar fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col justify-between border-r transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="hover:bg-inline-background text-muted-foreground hover:text-foreground absolute top-4 right-4 rounded-lg p-2 lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>

        <div className="border-sidebar-border flex items-center gap-3 border-b p-4 sm:p-6">
          <div className="h-10 w-10 shrink-0 rounded-full sm:h-12 sm:w-12">
            <Image
              src={
                isDarkMode ? "/logo-dark.png" : "/logo-light.png"
              }
              width={40}
              height={40}
              alt="GMATE"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="min-w-0 space-y-0.5">
            <p className="text-primary truncate text-sm font-semibold sm:text-base lg:text-lg">
              GMATE
            </p>
            <p className="text-inline-primary truncate text-xs font-medium">
              Workspace
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-4 sm:p-6">
          <Link
            href="/dashboard"
            className={
              pathname === "/dashboard"
                ? "bg-inline-background text-inline-primary before:bg-inline-primary relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-semibold transition-colors before:absolute before:inset-0 before:top-0 before:left-0 before:block before:h-full before:w-1 before:rounded-l-md sm:px-4 sm:py-3 sm:before:w-2"
                : "text-muted-foreground hover:bg-inline-background relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-medium transition-colors sm:px-4 sm:py-3"
            }
          >
            <LayoutDashboard className="shrink-0" size={20} />
            <span className="truncate">Dashboard</span>
          </Link>
          <Link
            href="/dashboard/users"
            className={
              pathname === "/dashboard/users"
                ? "bg-inline-background text-inline-primary before:bg-inline-primary relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-semibold transition-colors before:absolute before:inset-0 before:top-0 before:left-0 before:block before:h-full before:w-1 before:rounded-l-md sm:px-4 sm:py-3 sm:before:w-2"
                : "text-muted-foreground hover:bg-inline-background relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-medium transition-colors sm:px-4 sm:py-3"
            }
          >
            <CheckSquare className="shrink-0" size={20} />
            <span className="truncate">Users</span>
          </Link>
          <Link
            href="/dashboard/index"
            className={
              pathname === "/dashboard/index"
                ? "bg-inline-background text-inline-primary before:bg-inline-primary relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-semibold transition-colors before:absolute before:inset-0 before:top-0 before:left-0 before:block before:h-full before:w-1 before:rounded-l-md sm:px-4 sm:py-3 sm:before:w-2"
                : "text-muted-foreground hover:bg-inline-background relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-medium transition-colors sm:px-4 sm:py-3"
            }
          >
            <FolderKanban className="shrink-0" size={20} />
            <span className="truncate">Index</span>
          </Link>
        </nav>
        <div className="p-4 sm:p-6">
          <Link
            href="/dashboard/profile"
            className={
              pathname === "/dashboard/profile"
                ? "bg-inline-background text-inline-primary before:bg-inline-primary relative inline-flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-semibold transition-colors before:absolute before:inset-0 before:top-0 before:left-0 before:block before:h-full before:w-1 before:rounded-l-md sm:px-4 sm:py-3 sm:before:w-2"
                : "text-muted-foreground hover:bg-inline-background relative inline-flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-medium transition-colors sm:px-4 sm:py-3"
            }
          >
            <UserCircle className="shrink-0" size={20} />
            <span className="truncate">Profile</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
