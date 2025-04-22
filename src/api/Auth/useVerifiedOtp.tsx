import { RefObject } from "react";
import { api, handleApiError } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";

const verifiedOtp = async (otp: string): Promise<void> => {
  const { data } = await api.post("auth/otp/verify", { otp, email: sessionStorage.getItem("emailOtp") });
  return data;
};

const useVerifiedOtp = (setLoader: React.Dispatch<React.SetStateAction<boolean>>, setChangeSectionLogin: React.Dispatch<React.SetStateAction<number>>, navigate: NavigateFunction, twoFa: boolean, isToastActive: RefObject<boolean>) => {
  return useMutation({
    mutationFn: ({ otp }: { otp: string; }) =>
        verifiedOtp(otp),
    onSuccess: (data) => {
      console.log(data);
      setLoader(false);
      setTimeout(() => {
        if (twoFa) {
          navigate('/placeholder');
        } else {
          setChangeSectionLogin(3);
        }
      }, 300)
    },
    onMutate: (variables) => {
      console.log("Mutation started with: ", variables);
      setLoader(true);
    },
    onError: (error) => {
      handleApiError(error, setLoader, isToastActive, 6);
    }
  });
};

export default useVerifiedOtp;