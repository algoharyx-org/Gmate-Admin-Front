import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loading } from "@/components/ui/Loading";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useUpdateAvatar } from "@/hooks/useUpdateAvatar";
import { useChangePassword } from "@/hooks/useChangePassword";

export default function EditProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isPending, user } = useUser();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    setEmail(user.email ?? "");
    setFullName(user.name ?? "");
    setBio(user.bio ?? "");
  }, [user]);

  const { updateProfile, isPending: isUpdatingProfileData } =
    useUpdateProfile();

  function handleSubmitProfileData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateProfile({
      name: fullName,
      bio,
    });
  }

  const { updateAvatar, isPending: isUpdatingAvatar } = useUpdateAvatar();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatar(file.name);
    }
  };

  function handleSubmitAvatarData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!avatarFile) return;

    updateAvatar(
      { avatar: avatarFile },
      {
        onSuccess: () => {
          handleCancelAvatar();
        },
      },
    );
  }

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<{
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }>();

  const { changePassword, isPending: isChangingPassword } = useChangePassword();

  function onSubmitChangePassword(data: { oldPassword: string; newPassword: string; confirmNewPassword: string }) {
    changePassword(data, { onSettled: () => reset() });
  }

  function handleCancelData() {
    setFullName(user?.name);
    setBio(user?.bio);
  }

  function handleCancelAvatar() {
    setAvatar(null);
    setAvatarFile(null);
  }

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-10 pb-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-foreground text-2xl font-bold">
          Update your account
        </h1>
        <Button variant="outline" size="sm" asChild>
          <Link
            to="/dashboard/profile"
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to profile
          </Link>
        </Button>
      </div>

      {/* Update user data */}
      <section>
        <h2 className="text-foreground mb-6 text-lg font-semibold">
          Update user data
        </h2>
        <form
          onSubmit={handleSubmitProfileData}
          className="border-border bg-card shadow-card space-y-5 rounded-xl border px-10 py-6"
        >
          <div className="border-border space-y-2 border-b py-4 md:grid md:grid-cols-[24rem_1fr_1.2fr] md:gap-4 md:space-y-0">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="border-border space-y-2 border-b py-4 md:grid md:grid-cols-[24rem_1fr_1.2fr] md:gap-4 md:space-y-0">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isUpdatingProfileData}
              placeholder="Your name"
            />
          </div>
          <div className="border-border space-y-2 border-b py-4 md:grid md:grid-cols-[24rem_1fr_1.2fr] md:gap-4 md:space-y-0">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={isUpdatingProfileData}
              rows={3}
              placeholder="A short bio about you"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleCancelData}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdatingProfileData}>
              {isUpdatingProfileData ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update account"
              )}
            </Button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-foreground mb-6 text-lg font-semibold">
          Update user Image
        </h2>
        <form
          onSubmit={handleSubmitAvatarData}
          className="border-border bg-card shadow-card space-y-5 rounded-xl border px-10 py-6"
        >
          <div className="border-border space-y-2 border-b py-4 md:grid md:grid-cols-[24rem_1fr_1.2fr] md:gap-4 md:space-y-0">
            <Label htmlFor="avatar">Avatar image</Label>
            <div className="flex w-full max-w-md items-center gap-2">
              <Input
                ref={fileInputRef}
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={isUpdatingAvatar}
                className="hidden"
              />
              <Button
                type="button"
                variant="default"
                size="default"
                disabled={isUpdatingAvatar}
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
              <span className="text-muted-foreground max-w-50 truncate text-sm">
                {avatar ?? "No file chosen"}
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelAvatar}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdatingAvatar}>
              {isUpdatingAvatar ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update avatar"
              )}
            </Button>
          </div>
        </form>
      </section>

      {/* Update password */}
      <section>
        <h2 className="text-foreground mb-6 text-lg font-semibold">
          Update password
        </h2>
        <form onSubmit={handleSubmit(onSubmitChangePassword)} className="border-border bg-card shadow-card space-y-5 rounded-xl border px-10 py-6">
          <div className="border-border space-y-2 border-b py-4 md:grid md:grid-cols-[24rem_1fr_1.2fr] md:gap-4 md:space-y-0">
            <Label htmlFor="oldPassword">New password</Label>
            <Input
              id="oldPassword"
              type="password"
            disabled={isChangingPassword}
              {...register("oldPassword", {
                required: "This field is required",
              })}
              placeholder="••••••••"
              minLength={8}
            />
          </div>
          <div className="border-border space-y-2 border-b py-4 md:grid md:grid-cols-[24rem_1fr_1.2fr] md:items-center md:gap-4 md:space-y-0">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              type="password"
            disabled={isChangingPassword}
              {...register("newPassword", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              placeholder="••••••••"
              minLength={8}
            />
            {errors.newPassword && (
              <p className="text-xs text-destructive">
                {String(errors.newPassword.message || "")}
              </p>
            )}
          </div>
          <div className="border-border space-y-2 border-b py-4 md:grid md:grid-cols-[24rem_1fr_1.2fr] md:items-center md:gap-4 md:space-y-0">
            <Label htmlFor="confirmNewPassword">Confirm password</Label>
            <Input
              id="confirmNewPassword"
              type="password"
            disabled={isChangingPassword}
              {...register("confirmNewPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues()?.newPassword ||
                  "Passwords need to match",
              })}
              placeholder="••••••••"
            />
            {errors.confirmNewPassword && (
              <p className="text-xs text-destructive">
                {String(errors.confirmNewPassword.message || "")}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => reset()}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isChangingPassword}
            >
              {isChangingPassword ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update password"
              )}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
