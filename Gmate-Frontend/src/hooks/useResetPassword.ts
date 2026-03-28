import { resetPassword as resetPasswordApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("Password reset successfully!");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { resetPassword, isPending };
}
