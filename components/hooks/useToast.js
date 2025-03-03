import { useToast } from "react-native-toast-notifications";

export default function useToastHook() {
  const toast = useToast();
  const successToast = (message) => {
    toast.show(message, {
      type: "success",
    });
  };
  const warningToast = (message) => {
    toast.show(message, {
      type: "warning",
    });
  };
  const errorToast = (message) => {
    toast.show(message, {
      type: "danger ",
    });
  };
  const normalToast = (message) => {
    toast.show(message, {
      type: "normal ",
    });
  };

  return {
    successToast,
    warningToast,
    errorToast,
    normalToast,
  };
}
