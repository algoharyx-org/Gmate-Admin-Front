"use client"

import { useAuthStore } from "@/store/authStore";
import { Mail, Shield, User as UserIcon, Calendar, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <UserIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold">Profile Not Found</h2>
        <p className="text-muted-foreground mt-2">Could not load your profile data.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            View your personal information and account settings.
          </p>
        </div>
        <Link href="/dashboard/profile/edit">
          <Button>
            Edit Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="h-32 w-full bg-linear-to-r from-primary/40 to-primary/10 sm:h-40"></div>
        <div className="px-6 pb-8 sm:px-8">
          <div className="-mt-16 sm:-mt-20 mb-6 flex flex-col sm:flex-row gap-6 sm:items-end">
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 shrink-0 overflow-hidden rounded-full border-4 border-card bg-muted shadow-lg">
              <Image 
                src={user.avatar?.url || "/avatar.jpg"} 
                alt={user.name} 
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-1 pb-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{user.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium text-primary">
                  <Shield size={16} />
                  {user.role}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={16} />
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mt-8">
            <div className="space-y-6 lg:border-r lg:border-border lg:pr-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  About Me
                </h3>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {user.bio || "No bio provided yet. Click Edit Profile to add some information about yourself!"}
                </p>
              </div>
            </div>

            <div className="space-y-6 content-start">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Account Details
              </h3>
              
              <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/20 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Member Since</p>
                  <p className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/20 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Account Status</p>
                  <p className="text-sm flex items-center gap-2">
                     <span className={`inline-flex h-2 w-2 rounded-full ${user.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                     <span className="text-muted-foreground">{user.active ? 'Active' : 'Inactive'}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
