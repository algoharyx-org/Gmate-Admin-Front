import { useResetPassword } from "@/hooks/useResetPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const { resetPassword, isPending } = useResetPassword();
  const { register, formState, getValues, handleSubmit, reset } = useForm<ResetPasswordForm>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetPassword({ password: data.password, confirmPassword: data.confirmPassword }, { onSettled: () => reset() });
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="bg-card m-4 w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground">Enter your new password</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              disabled={isPending}
              {...register("password", {
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
              placeholder="Enter new password"
              required
            />
            <span className="text-destructive text-sm">
              {String(errors.password?.message || "")}
            </span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              disabled={isPending}
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues()?.password || "Passwords need to match",
              })}
              placeholder="Confirm new password"
              required
            />
            <span className="text-destructive text-sm">
              {String(errors.confirmPassword?.message || "")}
            </span>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
