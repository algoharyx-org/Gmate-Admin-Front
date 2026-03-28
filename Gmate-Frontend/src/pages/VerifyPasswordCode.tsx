import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyPasswordCode } from "@/hooks/useVerifyPasswordCode";

export default function VerifyPasswordCode() {
  const navigate = useNavigate();
  const { verifyPasswordCode, isPending } = useVerifyPasswordCode();
  const [code, setCode] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      alert("Please enter a valid 6-digit code");
      return;
    }

    verifyPasswordCode({ resetCode: code });
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="m-4 bg-card w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify Password Code</h1>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              type="text"
              disabled={isPending}
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Only digits
                if (value.length <= 6) {
                  setCode(value);
                }
              }}
              maxLength={6}
              placeholder="123456"
              className="text-center text-lg tracking-widest"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
        <div className="text-center">
          <button
            onClick={() => navigate("/forget-password")}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Didn't receive the code? Resend
          </button>
        </div>
      </div>
    </div>
  );
}
