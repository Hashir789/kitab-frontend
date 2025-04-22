import { RefObject } from "react";
import { api, handleApiError } from "../../utils";
import { useMutation } from "@tanstack/react-query";

const signupRequestOtp = async (name: string, email: string, password: string): Promise<any> => {
  const { data } = await api.post("auth/signup/otp/request", { name, email, password });
  return data;
};

const useSignupRequestOtp = (setLoader: React.Dispatch<React.SetStateAction<boolean>>, setChangeSectionSignup: React.Dispatch<React.SetStateAction<number>>, isToastActive: RefObject<boolean>) => {
  return useMutation({
    mutationFn: ({ name, email, password }: { name: string, email: string; password: string }) =>
        signupRequestOtp(name, email, password),
    onSuccess: (data) => {
      console.log(data)
      setLoader(false);
      setTimeout(() => {
        setChangeSectionSignup(2);
      }, 300)
    },
    onMutate: (variables) => {
      console.log("Mutation started with: ", variables);
      setLoader(true);
    },
    onError: (error) => {
      handleApiError(error, setLoader, isToastActive, 4);
    }
  });
};

export default useSignupRequestOtp;