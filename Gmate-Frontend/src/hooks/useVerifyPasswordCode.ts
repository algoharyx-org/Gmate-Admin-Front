import { verifyResetPasswordCode as verifyResetPasswordCodeApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useVerifyPasswordCode() {
  const navigate = useNavigate();
  const { mutate: verifyPasswordCode, isPending } = useMutation({
    mutationFn: verifyResetPasswordCodeApi,
    onSuccess: () => {
      toast.success("Code verified successfully!");
      navigate("/resetPassword", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { verifyPasswordCode, isPending };
}
