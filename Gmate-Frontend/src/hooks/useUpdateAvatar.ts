import { updateAvatar as updateAvatarApi } from "@/services/apiUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  const { mutate: updateAvatar, isPending } = useMutation({
    mutationFn: updateAvatarApi,
    onSuccess: (user) => {
      toast.success("Avatar successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateAvatar, isPending };
}
