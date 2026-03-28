"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "./theme-provider";
import { login } from "@/services/apiAuth";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  const isValid = useMemo(() => {
    const trimmedEmail = email.trim();
    return trimmedEmail.length > 3 && trimmedEmail.includes("@") && password.length >= 6;
  }, [email, password]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!isValid) {
      setError("Please enter a valid email and password (min 8 characters).");
      return;
    }

    setLoading(true);
    try {
      const data = await login({ email, password });      
      Cookies.set("accessToken", data.data.token.accessToken, { expires: 1 });
      Cookies.set("refreshToken", data.data.token.refreshToken, { expires: 7 });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto w-full max-w-6xl py-8 sm:py-10 px-4">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <section className="relative hidden overflow-hidden rounded-2xl border border-border bg-muted/30 p-8 lg:flex lg:flex-col lg:justify-center">
            <div className="absolute inset-0 -z-10">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-ring/20 blur-3xl" />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative size-12 overflow-hidden rounded-full border border-border bg-background/70">
                <Image
                  src={
                isDarkMode ? "/logo-dark.png" : "/logo-light.png"
              }
                  alt="GMATE"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">GMATE</p>
                <p className="text-xs text-muted-foreground">Hire-ready dashboard</p>
              </div>
            </div>

            <h1 className="mt-8 text-3xl font-bold leading-tight">
              Sign in to manage
              <span className="text-primary"> your workspace</span>
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Access your users, activity, and profile in one place. This login UI is fully responsive and
              ready to connect to your backend.
            </p>

            <div className="mt-8 grid gap-3">
              <div className="flex gap-3 rounded-xl border border-border bg-background/50 p-4">
                <div className="mt-0.5 size-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Email authentication</p>
                  <p className="text-xs text-muted-foreground">Fast and secure sign-in</p>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl border border-border bg-background/50 p-4">
                <div className="mt-0.5 size-9 rounded-lg bg-ring/15 text-primary flex items-center justify-center">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Password visibility</p>
                  <p className="text-xs text-muted-foreground">Better usability on mobile</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-background/60 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Welcome back</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enter your details to continue.
                </p>
              </div>
              <div className="block lg:hidden">
                <div className="relative size-11 overflow-hidden rounded-full border border-border bg-background/70">
                  <Image
                    src={
                isDarkMode ? "/logo-dark.png" : "/logo-light.png"
              }
                    alt="GMATE"
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 grid gap-8">
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background/80 px-10 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background/80 px-10 pr-11 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                    required
                    minLength={6}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="ms-auto">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="mt-2 w-full"
                disabled={!isValid || loading}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
