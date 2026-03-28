"use client"

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { getActiveUsers, getAllUsers, getAllProjects, getCompletedProjects } from "@/services/apiUser";
import { getIndex, getUnreadContacts } from "@/services/apiContact";
import { Users, UserCheck, MessageSquare, MailWarning, LayoutDashboard, CopyPlus, ArrowRight, FolderKanban, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalProjects: 0,
    completedProjects: 0
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchDashboardMetrics() {
      try {
        setLoading(true);

        const [
          totalUsersRes,
          activeUsersRes,
          totalMessagesRes,
          unreadMessagesRes,
          totalProjectsRes,
          completedProjectsRes
        ] = await Promise.all([
          getAllUsers({ limit: 1 }),
          getActiveUsers(),
          getIndex({ limit: 1 }),
          getUnreadContacts(),
          getAllProjects(),
          getCompletedProjects()
        ]);

        if (isMounted) {
          setMetrics({
            totalUsers: totalUsersRes?.length || 0,
            activeUsers: activeUsersRes?.length || 0,
            totalMessages: totalMessagesRes?.length || 0,
            unreadMessages: unreadMessagesRes?.length || 0,
            totalProjects: totalProjectsRes?.length || 0,
            completedProjects: completedProjectsRes?.length || 0,
          });
        }
      } catch (error) {
        console.error("Dashboard metrics failed to load:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDashboardMetrics();
    return () => { isMounted = false; };
  }, []);

  const metricCards = [
    {
      title: "Total Users",
      value: metrics.totalUsers,
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-500/10",
      textColor: "text-blue-500"
    },
    {
      title: "Active Users",
      value: metrics.activeUsers,
      icon: UserCheck,
      color: "bg-green-500",
      lightColor: "bg-green-500/10",
      textColor: "text-green-500"
    },
    {
      title: "Total Contacts",
      value: metrics.totalMessages,
      icon: MessageSquare,
      color: "bg-purple-500",
      lightColor: "bg-purple-500/10",
      textColor: "text-purple-500"
    },
    {
      title: "Unread Messages",
      value: metrics.unreadMessages,
      icon: MailWarning,
      color: "bg-orange-500",
      lightColor: "bg-orange-500/10",
      textColor: "text-orange-500"
    },
    {
      title: "Total Projects",
      value: metrics.totalProjects,
      icon: FolderKanban,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-500/10",
      textColor: "text-indigo-500"
    },
    {
      title: "Completed Projects",
      value: metrics.completedProjects,
      icon: CheckCircle,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-500/10",
      textColor: "text-emerald-500"
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <LayoutDashboard className="w-64 h-64 text-primary transform rotate-12" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Welcome back, {user?.name?.split(" ")[0] || "Admin"}!
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
            Here&apos;s an overview of your platform&apos;s statistics and recent engagement metrics today.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard/users">
              <Button>
                <CopyPlus className="mr-2 h-4 w-4" /> Manage Users
              </Button>
            </Link>
            <Link href="/dashboard/index">
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" /> View Messages
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Metrics Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground mt-4 mb-4">
          Platform Overview
        </h2>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Skeleton Loaders
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <div className="h-4 w-24 rounded bg-muted"></div>
                    <div className="h-8 w-16 rounded bg-muted/80"></div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-muted/50"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual Metric Cards
            metricCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                  <div className="absolute right-0 top-0 h-full w-1 bg-transparent group-hover:bg-primary transition-colors"></div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                      <p className="text-3xl font-bold text-foreground tracking-tight">
                        {card.value.toLocaleString()}
                      </p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${card.lightColor} ${card.textColor}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {/* Quick Actions / Getting Started */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
           <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
           <div className="space-y-4">
              <Link href="/dashboard/users" className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Add New User</h4>
                    <p className="text-xs text-muted-foreground">Provision a new account role</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors translate-x-0 group-hover:translate-x-1" />
              </Link>
              <Link href="/dashboard/index" className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-orange-500/10 text-orange-500">
                    <MailWarning size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Review Unread</h4>
                    <p className="text-xs text-muted-foreground">Check pending contact requests</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-orange-500 transition-colors translate-x-0 group-hover:translate-x-1" />
              </Link>
           </div>
        </div>
        
        {/* Placeholder / Secondary Info */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="p-4 rounded-full bg-muted/30 border border-border mb-4">
               <LayoutDashboard size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold">More features coming soon</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
              We&apos;re currently preparing advanced charting and analytics tools to sit right here on your tailored dashboard overview.
            </p>
        </div>
      </div>

    </div>
  );
}
