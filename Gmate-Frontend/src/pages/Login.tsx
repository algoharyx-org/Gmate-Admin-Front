import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDarkMode } from "@/context/ThemeContext";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {
  const { isDarkMode } = useDarkMode();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <div className="bg-background relative flex min-h-screen">
      {/* Premium Back to Home Button */}
      <Link
        to="/"
        className="text-muted-foreground hover:text-foreground group absolute top-8 left-8 z-50 flex items-center gap-2 text-sm font-bold transition-all"
      >
        <div className="border-border bg-card flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-transform group-hover:-translate-x-1">
          <ArrowLeft size={14} />
        </div>
        <span>Home</span>
      </Link>

      <div className="bg-muted/30 border-border relative hidden items-center justify-center border-r lg:flex lg:w-1/2">
        <div className="max-w-md p-12">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-2xl transition-transform hover:scale-105 dark:border-slate-800">
              <img
                src={
                  isDarkMode
                    ? "/assets/logo-dark.png"
                    : "/assets/logo-light.png"
                }
                alt="GMATE Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-foreground text-3xl font-black tracking-tighter uppercase">
              GMATE
            </span>
          </div>
          <h2 className="text-foreground mb-4 text-4xl font-black tracking-tight">
            Welcome back
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-medium">
            Sign in to access your projects, manage tasks, and collaborate with
            your team.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex flex-col items-center text-center lg:hidden">
            <div className="mb-6 h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-xl dark:border-slate-800">
              <img
                src={
                  isDarkMode
                    ? "/assets/logo-dark.png"
                    : "/assets/logo-light.png"
                }
                alt="GMATE Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-foreground text-2xl font-black tracking-tight">
              Sign in
            </h1>
          </div>

          <div className="hidden lg:block">
            <h1 className="text-foreground text-3xl font-black tracking-tight">
              Sign in
            </h1>
            <p className="text-muted-foreground mt-2 text-sm font-medium tracking-widest uppercase opacity-60">
              Enter your credentials
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[10px] font-black tracking-widest uppercase opacity-50"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-50" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  placeholder="you@company.com"
                  className="h-12 rounded-xl pl-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-[10px] font-black tracking-widest uppercase opacity-50"
                >
                  Password
                </Label>
                <Link
                  to="/forget-password"
                  className="text-primary text-[10px] font-black tracking-widest uppercase transition-opacity hover:opacity-80"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-50" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  placeholder="••••••••"
                  className="h-12 rounded-xl pr-11 pl-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 shadow-primary/20 h-12 w-full rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98]"
              size="lg"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Sign in to Dashboard"
              )}
            </Button>
          </form>

          <p className="text-muted-foreground text-center text-sm font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-bold transition-opacity hover:opacity-80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
