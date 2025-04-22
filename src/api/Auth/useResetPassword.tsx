import { RefObject } from "react";
import { api, handleApiError } from "../../utils";
import { useMutation } from "@tanstack/react-query";

const resetPassword = async (password: string): Promise<void> => {
  const { data } = await api.patch("auth/password/reset", { password, email: sessionStorage.getItem("emailOtp") });
  return data;
};

const useResetPassword = (setLoader: React.Dispatch<React.SetStateAction<boolean>>, setChangeSectionLogin: React.Dispatch<React.SetStateAction<number>>, isToastActive: RefObject<boolean>) => {
  return useMutation({
    mutationFn: ({ password }: { password: string }) => resetPassword(password),
    onSuccess: (data) => {
      console.log(data)
      setLoader(false);
      setTimeout(() => {
        setChangeSectionLogin(0);
      }, 300)
    },
    onMutate: (variables) => {
      console.log("Mutation started with: ", variables);
      setLoader(true);
    },
    onError: (error) => {
      handleApiError(error, setLoader, isToastActive, 2);
    }
  });
};

export default useResetPassword;