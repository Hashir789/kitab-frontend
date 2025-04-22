import { api } from "../../utils";
import { useEffect } from "react";
import { FormikProps } from "formik";
import { useQuery } from "@tanstack/react-query";

const isEmailAvailable = async (email: string): Promise<{ available: boolean }> => {
  const { data } = await api.get(`/auth/email/available?email=${email}`);
  return data;
};

const useIsEmailAvailable = (email: string, form: FormikProps<any>, emailAvailability = true) => {
  const query = useQuery({
    queryKey: ["isEmailAvailable", email],
    queryFn: () => isEmailAvailable(email),
    enabled: !!email,
    staleTime: 1000 * 60 * 5
  });

  useEffect(() => {
    if (Object.keys(form.errors).length === 0 || form.errors.email === "Already taken" || form.errors.email === "Not found") {
      if (query.isFetching) {
        sessionStorage.removeItem("emailAvailable");
        form.setFieldError("email", undefined);
      }
      else {
        if (query.isFetched) {
          if (emailAvailability) {
            if (!query.data?.available) {
              form.setFieldError("email", "Already taken");
              sessionStorage.setItem("emailAvailable", "0");
            } else {
              sessionStorage.setItem("emailAvailable", "1");
              form.setFieldError("email", undefined);
            }
          } else {
            if (query.data?.available) {
              form.setFieldError("email", "Not found");
              sessionStorage.setItem("emailAvailable", "0");
            } else {
              sessionStorage.setItem("emailAvailable", "1");
              form.setFieldError("email", undefined);
            }
          }
        }
      }
    }
  }, [query.isFetching, query.dataUpdatedAt]);

  return query;
};

export default useIsEmailAvailable;