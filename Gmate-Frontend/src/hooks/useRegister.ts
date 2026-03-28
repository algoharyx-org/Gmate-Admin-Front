import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as registerApi } from "@/services/apiAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      cookie.save("accessToken", data.data.token.accessToken, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60),
      });
      cookie.save("refreshToken", data.data.token.refreshToken, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      queryClient.setQueryData(["user"], data.data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { register, isPending };
}
