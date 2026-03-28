"use client";

import Image from "next/image";
import { useState } from "react";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "../theme-provider";
import { forgotPassword } from "@/services/apiAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  const isValid = email.trim().length > 3 && email.includes("@");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!isValid) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword({ email });
      Cookies.set("resetToken", res.data, { expires: 1 });
      router.push("/verify-code");
    } catch (err: any) {
      console.log(err);
      setError(err?.response?.data?.message || "Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto w-full max-w-lg py-8 px-4">
        <section className="rounded-2xl border border-border bg-background/60 p-6 shadow-sm backdrop-blur sm:p-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative size-12 overflow-hidden rounded-full border border-border bg-background/70">
              <Image
                src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"}
                alt="GMATE"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Forgot Password?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email address to receive a verification code.
            </p>
          </div>

          <form onSubmit={onSubmit} className="grid gap-6">
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
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-background/80 px-10 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={!isValid || loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending code...
                </span>
              ) : (
                "Send Verification Code"
              )}
            </Button>

            <div className="mt-4 text-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
