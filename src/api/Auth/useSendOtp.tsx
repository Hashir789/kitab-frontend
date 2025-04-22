import { RefObject } from "react";
import { api, handleApiError } from "../../utils";
import { useMutation } from "@tanstack/react-query";

const sendOtp = async (email: string, twoFa: boolean): Promise<boolean> => {
  await api.post("/auth/email/otp", { email });
  return twoFa;
};

const useSendOtp = (setLoader: React.Dispatch<React.SetStateAction<boolean>>, setChangeSectionLogin: React.Dispatch<React.SetStateAction<number>>, isToastActive: RefObject<boolean>) => {
  return useMutation({
    mutationFn: ({ email, twoFa = false }: { email: string; twoFa?: boolean }) =>  
      sendOtp(email, twoFa),
    onSuccess: (twoFa) => {
      setLoader(false);
      setTimeout(() => {
        if (twoFa) {
          setChangeSectionLogin(1);
        } else {
          setChangeSectionLogin(2);
        }
      }, 300)
    },
    onMutate: (variables) => {
      console.log("Mutation started with: ", variables);
      setLoader(true);
    },
    onError: (error) => {
      handleApiError(error, setLoader, isToastActive, 3);
    }
  });
};

export default useSendOtp;