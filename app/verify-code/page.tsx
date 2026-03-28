"use client";

import Image from "next/image";
import { useState } from "react";
import { Loader2, KeyRound, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "../theme-provider";
import { verifyResetPasswordCode } from "@/services/apiAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyCode() {
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  const isValid = resetCode.trim().length > 0;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!isValid) {
      setError("Please enter the verification code.");
      return;
    }

    setLoading(true);
    try {
      await verifyResetPasswordCode({ resetCode });
      router.push("/reset-password");
    } catch (err: any) {
      console.log(err);
      setError(err?.response?.data?.message || "Invalid verification code.");
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
            <h2 className="text-2xl font-bold">Check your email</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We have sent a verification code to your email.
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
              <label htmlFor="code" className="text-sm font-medium">
                Verification Code
              </label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-background/80 px-10 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 tracking-widest"
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
                  Verifying...
                </span>
              ) : (
                "Verify Code"
              )}
            </Button>

            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
