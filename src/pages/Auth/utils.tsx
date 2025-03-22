import * as Yup from "yup";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

interface LoginValues {
  email: string;
  password: string;
}

interface SignupValues_1 {
  fullname: string;
  email: string;
}

interface SignupValues_2 {
  password: string;
  confirmPassword: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid format").required("Required"),
  password: Yup.string().required("Required")
});
  
const SignupSchema_1 = Yup.object().shape({
  fullname: Yup.string().required("Required").min(3, "Must be at least 3 characters"),
  email: Yup.string().email("Invalid format").required("Required")
});
  
const SignupSchema_2 = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(8, "Must be atleast 8 characters")
    .matches(/[a-z]/, "Must include a lowercase letter")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/[0-9]/, "Must include a number")
    .matches(/[^A-Za-z0-9]/, "Must include a special character"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Not Same")
});

const LoginSubmit = (values: LoginValues, navigate: NavigateFunction) => {
  console.log("Login Submitted", values);
  toast.dismiss();
  navigate("/placeholder");
}

export const getLoginConfig = (navigate: NavigateFunction) => {
  return {
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: LoginValues) => LoginSubmit(values, navigate)
  };
}

const signupSubmit_1 = (values: SignupValues_1, setChangeSectionSignup: React.Dispatch<React.SetStateAction<boolean>>) => {
  setChangeSectionSignup(true);
  console.log("Signup Submitted", values);
  toast.dismiss();
}

export const getSignupConfig_1 = (setChangeSectionSignup: React.Dispatch<React.SetStateAction<boolean>>) => {
  return {
    initialValues: { fullname: "", email: "" },
    validationSchema: SignupSchema_1,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: SignupValues_1) => signupSubmit_1(values, setChangeSectionSignup)
  };
}

const signupSubmit_2 = (values: SignupValues_2, navigate: NavigateFunction) => {
    console.log("Signup Submitted", values);
    toast.dismiss();
    navigate("/placeholder");
}

export const getSignupConfig_2 = (navigate: NavigateFunction) => {
  return {
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: SignupSchema_2,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: SignupValues_2) => signupSubmit_2(values, navigate)
  };
}