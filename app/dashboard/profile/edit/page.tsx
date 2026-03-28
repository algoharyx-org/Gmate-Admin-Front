"use client"

import { useAuthStore } from "@/store/authStore";
import { updateProfile, updateAvatar, changePassword } from "@/services/apiUser";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Loader2, ArrowLeft, Camera, User, FileText, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EditProfile() {
  const { user, fetchSession } = useAuthStore();
  
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingProfile(true);
    try {
      await updateProfile(profileData);
      toast.success("Profile updated successfully!");
      await fetchSession(); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      return toast.error("New passwords do not match");
    }
    
    setIsSubmittingPassword(true);
    try {
      await changePassword(passwordData);
      toast.success("Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to change password.");
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const handleAvatarSelect = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      await updateAvatar({ avatar: file });
      toast.success("Avatar updated successfully!");
      await fetchSession();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload avatar.");
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-10">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/profile">
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Edit Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update your account details, avatar, and security settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card shadow-sm p-6 text-center h-full">
            <h2 className="text-lg font-semibold mb-4 text-left border-b border-border pb-2">Profile Picture</h2>
            <div className="flex justify-center mb-6 mt-4">
              <div 
                className="relative group h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-card bg-muted shadow-lg cursor-pointer transition-transform hover:scale-105"
                onClick={handleAvatarSelect}
              >
                {isUploadingAvatar ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                ) : null}
                <Image 
                  src={user.avatar?.url || "/avatar.jpg"} 
                  alt="Avatar" 
                  fill
                  className="object-cover group-hover:opacity-75 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <div className="flex flex-col items-center text-white">
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">Change</span>
                  </div>
                </div>
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleAvatarUpload} 
              accept="image/*" 
            />
            <Button 
              variant="outline" 
              className="w-full mt-auto" 
              onClick={handleAvatarSelect}
              disabled={isUploadingAvatar}
            >
              <Camera className="w-4 h-4 mr-2"/> Upload New Avatar
            </Button>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          
          <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-6 border-b border-border pb-2">General Information</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <User size={16} className="text-primary"/> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText size={16} className="text-primary"/> Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="flex min-h-[120px] w-full rounded-lg border border-input bg-background/50 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow resize-y"
                  placeholder="Write a short biography about yourself..."
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  Brief description for your profile.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" className="w-full sm:w-auto px-8" disabled={isSubmittingProfile}>
                  {isSubmittingProfile ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                  ) : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-6 border-b border-border pb-2 text-foreground flex items-center gap-2">
              <Lock size={20} className="text-primary" /> Security & Password
            </h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-foreground">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                  className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow"
                  placeholder="Enter current password"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-foreground">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow"
                    placeholder="New password"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-foreground">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.confirmNewPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmNewPassword: e.target.value})}
                    className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-border/50 pt-4">
                <Button type="submit" variant="destructive" className="w-full sm:w-auto px-8" disabled={isSubmittingPassword}>
                  {isSubmittingPassword ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</>
                  ) : "Update Password"}
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
