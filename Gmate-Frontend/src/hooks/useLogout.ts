import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "@/services/apiUser";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import cookie from "react-cookies";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      cookie.remove("accessToken", { path: "/" });
      cookie.remove("refreshToken", { path: "/" });
      queryClient.removeQueries();
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Logout failed");
    },
  });

  return { logout, isPending };
}
