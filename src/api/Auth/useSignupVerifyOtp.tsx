import { RefObject } from "react";
import { api, handleApiError } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";

const signupVerifyOtp = async (otp: string): Promise<void> => {
  const { data } = await api.post("auth/signup/otp/verify", { otp, email: sessionStorage.getItem("emailOtp") });
  return data;
};

const useSignupVerifyOtp = (setLoader: React.Dispatch<React.SetStateAction<boolean>>, navigate: NavigateFunction, isToastActive: RefObject<boolean>) => {
  return useMutation({
    mutationFn: ({ otp }: { otp: string; }) =>
        signupVerifyOtp(otp),
    onSuccess: (data) => {
      console.log(data)
      setLoader(false);
      setTimeout(() => {
        navigate('/placeholder');
      }, 300)
    },
    onMutate: (variables) => {
      console.log("Mutation started with: ", variables);
      setLoader(true);
    },
    onError: (error) => {
      handleApiError(error, setLoader, isToastActive, 5);
    }
  });
};

export default useSignupVerifyOtp;