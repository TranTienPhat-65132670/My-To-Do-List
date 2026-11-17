import { Slide, toast, type ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "light",

  transition: Slide,
};

export const toastService = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  },
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options });
  },
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options });
  },
  warning: (message: string, options?: ToastOptions) => {
    toast.warn(message, { ...defaultOptions, ...options });
  },
  promise: <T>(
    promiseInstance: Promise<T>,
    messages: {
      pending: string;
      success: string | any;
      error: string | any;
    },
    options?: ToastOptions,
  ) => {
    return toast.promise(promiseInstance, messages, {
      ...defaultOptions,
      ...options,
    });
  },
};
