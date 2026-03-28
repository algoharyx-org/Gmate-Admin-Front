import { updateProfile as updateProfileApi } from "@/services/apiUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const {mutate: updateProfile, isPending} = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (user) => {
      toast.success("User data successfully updated");
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => {
      toast.error(err.message);
    }
  })
  
  return { updateProfile, isPending };
}