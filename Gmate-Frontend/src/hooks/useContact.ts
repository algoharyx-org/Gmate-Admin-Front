import { contactApi } from "@/services/apiUser";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useContact() {
  const { mutate: contact, isPending } = useMutation({
    mutationFn: ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => contactApi({ name, email, message }),
    onSuccess: () => {
      toast.success("Your message has been sent");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Something went wrong");
    },
  });

  return { contact, isPending };
}
