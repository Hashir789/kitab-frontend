import * as Yup from "yup";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { UseMutationOptions } from "@tanstack/react-query";

interface LoginValues {
  email: string;
  password: string;
}

interface SignupValues1 {
  fullname: string;
  email: string;
}

interface SignupValues2 {
  password: string;
  confirmPassword: string;
}

interface PasswordRecoveryValues {
  password: string;
  confirmPassword: string;
}

interface PasswordResetValues {
  password: string;
}

interface SignupValues {
  name: string;
  email: string;
  password: string;
}

interface ConfirmEmailValues {
  email: string;
}

interface OtpValues {
  otp: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid format").required("Required"),
  password: Yup.string().required("Required")
});
  
const SignupSchema1 = Yup.object().shape({
  fullname: Yup.string()
    .required("Required")
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be less than 31 characters"),
    email: Yup.string()
    .required("Required").email("Must be a valid format")
    .test("Email availability", "Already taken", () => {
      return (sessionStorage.getItem("emailAvailable") === "1" || sessionStorage.getItem("emailAvailable") === null);
    })
});

const SignupSchema2 = Yup.object().shape({
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

const PasswordRecovery = Yup.object().shape({
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

const ConfirmEmailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required").email("Must be a valid format")
    .test("Email availability", "Not found", () => {
      return (sessionStorage.getItem("emailAvailable") === "1" || sessionStorage.getItem("emailAvailable") === null);
    })
});

const OtpSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{4}$/, 'OTP must be exactly 4 digits')
    .required('OTP is required'),
});

const LoginSubmit = (values: LoginValues, login: (login: LoginValues, options?: UseMutationOptions<any, Error, LoginValues>) => void
) => {
  login(
    { email: values.email, password: values.password },
  );
  console.log("Login Submitted", values);
  toast.dismiss();
}

export const getLoginConfig = (login: (login: LoginValues, options?: UseMutationOptions<any, Error, LoginValues>) => void) => {
  return {
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: LoginValues) => LoginSubmit(values, login)
  };
}

const signupSubmit1 = (values: SignupValues1, setChangeSectionSignup: React.Dispatch<React.SetStateAction<number>>) => {
  console.log("Signup Submitted", values);
  setChangeSectionSignup(1);
  sessionStorage.setItem("emailOtp", values.email);
  sessionStorage.setItem("fullname", values.fullname);
  sessionStorage.setItem("email", values.email);
  toast.dismiss();
}

export const getSignupConfig1 = (setChangeSectionSignup: React.Dispatch<React.SetStateAction<number>>) => {
  return {
    initialValues: { fullname: "", email: "" },
    validationSchema: SignupSchema1,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: SignupValues1) => signupSubmit1(values, setChangeSectionSignup)
  };
}

const signupSubmit2 = (values: SignupValues2, signupRequestOtp: (signupRequestOtp: SignupValues, options?: UseMutationOptions<any, Error, SignupValues>) => void) => {
  console.log("Signup Submitted", values);
  const name = sessionStorage.getItem("fullname") || "";
  const email = sessionStorage.getItem("email") || "";
  if (!name || !email) {
    return;
  }
  signupRequestOtp(
    { name, email, password: values.password }
  );
  toast.dismiss();
}

export const getSignupConfig2 = (signupRequestOtp: (signupRequestOtp: SignupValues, options?: UseMutationOptions<any, Error, SignupValues>) => void) => {
  return {
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: SignupSchema2,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: SignupValues2) => signupSubmit2(values, signupRequestOtp)
  };
}

const passwordRecoverySubmit = (values: PasswordRecoveryValues, resetPassword: (resetPassword: PasswordResetValues, options?: UseMutationOptions<any, Error, PasswordResetValues>) => void) => {
  console.log("Password Recovery Submitted", values);
  resetPassword({ password: values.password });
  toast.dismiss();
}

export const passwordRecoveryConfig = (resetPassword: (resetPassword: PasswordResetValues, options?: UseMutationOptions<any, Error, PasswordResetValues>) => void) => {
  return {
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: PasswordRecovery,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: PasswordRecoveryValues) => passwordRecoverySubmit(values, resetPassword)
  };
}

const confirmEmailSubmit = (values: ConfirmEmailValues, sendOtp: (sendOtp: ConfirmEmailValues, options?: UseMutationOptions<any, Error, ConfirmEmailValues>) => void) => {
  console.log("Confirm Email Submitted", values);
  sessionStorage.setItem("emailOtp", values.email);
  sendOtp({ email: values.email });
  toast.dismiss();
}

export const getConfirmEmailConfig = (sendOtp: (sendOtp: ConfirmEmailValues, options?: UseMutationOptions<any, Error, ConfirmEmailValues>) => void) => {
  return {
    initialValues: { email: "" },
    validationSchema: ConfirmEmailSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: ConfirmEmailValues) => confirmEmailSubmit(values, sendOtp)
  };
}

const OtpSubmit = (values: OtpValues, verifyOtp: (verifyOtp: OtpValues, options?: UseMutationOptions<any, Error, OtpValues>) => void) => {
  console.log("Otp Submitted: ", values);
  verifyOtp({ otp: values.otp });
  toast.dismiss();
}

export const getOtpConfig = (verifyOtp: (verifyOtp: OtpValues, options?: UseMutationOptions<any, Error, OtpValues>) => void) => {
  return {
    initialValues: { otp: "aaaa" },
    validationSchema: OtpSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: OtpValues) => OtpSubmit(values, verifyOtp)
  };
}

export const handleDebounceSignup1 = debounce((setUnique: React.Dispatch<React.SetStateAction<string>>, value: string, error: string) => {
  if (!setUnique) 
    return;
  if (error == "Already taken" || error == "Not found") {
    setUnique(value);
  }
  if (!error) {
    setUnique(value);
  }
}, 1000);