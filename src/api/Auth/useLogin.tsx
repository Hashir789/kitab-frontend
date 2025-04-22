import { RefObject } from "react";
import { api, handleApiError } from "../../utils";
import { NavigateFunction } from "react-router-dom";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface SendOtpValues {
  email: string;
  twoFa?: boolean;
}

const login = async (email: string, password: string): Promise<any> => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

const useLogin = (setLoader: React.Dispatch<React.SetStateAction<boolean>>, setTwoFa: React.Dispatch<React.SetStateAction<boolean>>, navigate: NavigateFunction, sendOtp: (sendOtp: SendOtpValues, options?: UseMutationOptions<any, Error, SendOtpValues>) => void, isToastActive: RefObject<boolean>) => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data, variables) => {
      
      const { email } = variables;
      
      if (data.two_fa) {
        setTwoFa(true);
        sessionStorage.setItem("emailOtp", email);
        const twoFa = true;
        sendOtp({ email, twoFa });
      } else {
        setLoader(false);
      }
      setTimeout(() => {
        if (!data.two_fa) {
          navigate('/placeholder');
        }
      }, 300)
    },
    onMutate: (variables) => {
      console.log("Mutation started with: ", variables);
      setLoader(true);
    },
    onError: (error) => {
      handleApiError(error, setLoader, isToastActive, 1);
    }
  });
};

export default useLogin;