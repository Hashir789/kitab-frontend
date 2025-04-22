import axios from "axios";
import { RefObject } from "react";
import { debounce } from "lodash";
import { AxiosError } from "axios";
import { FormikProps } from "formik";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const debouncedValidate = debounce((form: FormikProps<any>, field: string) => {
  form.validateField(field);
}, 500);

export const handleChangeWithDebounce = (form: FormikProps<any>) => 
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    form.setTouched({ ...form.touched, [fieldName]: true });
    form.handleChange(e);
    debouncedValidate(form, fieldName);
};

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const showErrorToastForm = async <T extends object>(form: FormikProps<T>, isToastActive: React.RefObject<boolean>) => {
  if (!isToastActive.current) {
    const errors = await form.validateForm();
    if (Object.keys(errors).length > 0) {
      isToastActive.current = true;
      toast.error(`${capitalizeFirstLetter(Object.keys(errors)[0])}: ${Object.values(errors)[0]}!`, {
        onClose: () => {
          isToastActive.current = false;
        },
      });
      return true;
    }
  }
  return false;
};

const errorMessage = (statusCode: number, api: number): string => {
  console.log({ statusCode, api });
  if (statusCode >= 500) {
    return "Internal server error";
  }
  switch (api) {
    case 1:
      return "Invalid credentials";
    case 2:
      return "Unable to reset password. Try again";
    case 3:
      return "Unable to send otp. Try again";
    case 4:
    case 5:
      return "Unable to sign up. Try again";
    case 6:
      return "Unable to verify otp. Try again";
    default:
      return "Internal server error";
  }
};

export const handleApiError = (error: object, setLoader: React.Dispatch<React.SetStateAction<boolean>>, isToastActive: RefObject<boolean>, api: number) => {
  setLoader(false);
  const err = error as AxiosError<{ statusCode: number, message: string }>;
  const status = err.response?.data?.statusCode || 500;

  setTimeout(() => {
    toast.error(errorMessage(status, api), {
      onClose: () => {
        isToastActive.current = false;
      },
    });
  }, 300);
}