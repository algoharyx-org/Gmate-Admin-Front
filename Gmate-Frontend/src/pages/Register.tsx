import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDarkMode } from "@/context/ThemeContext";
import { useRegister } from "@/hooks/useRegister";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters")
    .regex(/[a-z]/, "Confirm password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Confirm password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Confirm password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Confirm password must contain at least one special character"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const { isDarkMode } = useDarkMode();
  const [showPassword, setShowPassword] = useState(false);

  const { register: registerFn, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(data: RegisterFormValues) {
    registerFn(
      data,
      { onSettled: () => reset() },
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
            Start shipping faster
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-medium">
            Join thousands of engineering teams who use Gmate to manage their
            most ambitious projects.
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
              Create Account
            </h1>
          </div>

          <div className="hidden lg:block">
            <h1 className="text-foreground text-3xl font-black tracking-tight">
              Sign up
            </h1>
            <p className="text-muted-foreground mt-2 text-sm font-medium tracking-widest uppercase opacity-60">
              Get started for free
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-[10px] font-black tracking-widest uppercase opacity-50"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-50" />
                <Input
                  id="name"
                  type="text"
                  disabled={isPending}
                  {...register("name", {
                    required: "This field is required",
                  })}
                  placeholder="Full Name"
                  className="h-12 rounded-xl pl-11"
                />
              </div>
              <span className="text-destructive text-sm">
                {errors.name?.message}
              </span>
            </div>
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
                  disabled={isPending}
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide a valid email address",
                    },
                  })}
                  placeholder="you@company.com"
                  className="h-12 rounded-xl pl-11"
                />
              </div>
              <span className="text-destructive text-sm">
                {errors.email?.message}
              </span>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-[10px] font-black tracking-widest uppercase opacity-50"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-50" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  disabled={isPending}
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Password needs a minimum of 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
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
              <span className="text-destructive text-sm">
                {errors.password?.message}
              </span>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-[10px] font-black tracking-widest uppercase opacity-50"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-50" />
                <Input
                  id="confirmPassword"
                  type="password"
                  disabled={isPending}
                  {...register("confirmPassword", {
                    required: "This field is required",
                    validate: (value) =>
                      value === getValues()?.password ||
                      "Passwords need to match",
                  })}
                  placeholder="••••••••"
                  className="h-12 rounded-xl pr-11 pl-11"
                />
              </div>
              <span className="text-destructive text-sm">
                {errors.confirmPassword?.message}
              </span>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 shadow-primary/20 h-12 w-full rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98]"
              size="lg"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Workspace"
              )}
            </Button>
          </form>

          <p className="text-muted-foreground text-center text-sm font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold transition-opacity hover:opacity-80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
