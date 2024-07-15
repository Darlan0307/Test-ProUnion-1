import { toast } from "sonner";

export function sucessMessage(message: string) {
  toast.success(message, {
    style: {
      backgroundColor: "#2a9c49",
    },
  });
}
