import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@/services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import cookie from "react-cookies";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
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
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}
