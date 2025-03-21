import * as Yup from "yup";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { useFormik, FormikProps } from "formik";
import Login from "../../components/Auth/Login/Login";
import Signup1 from "../../components/Auth/Signup/Signup1";
import Signup2 from "../../components/Auth/Signup/Signup2";
import React, { FC, useState, useCallback, useRef } from "react";
import ForgetPassword from "../../components/Auth/ForgetPassword/ForgetPassword";
import { FlipCard, FlipCardBackSide, FlipCardFrontSide, FlipCardSection } from "../../components/FlipCard/FlipCard";

const validationSchema1 = Yup.object({
  email: Yup.string().email("Invalid format").required("Required"),
  password: Yup.string().required("Required")
});

const validationSchema21 = Yup.object({
  fullname: Yup.string().required("Required").min(3, "Must be at least 3 characters"),
  email: Yup.string().email("Invalid format").required("Required")
});

const validationSchema22 = Yup.object({
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


const Auth: FC = () => {

  const navigate = useNavigate();

  const [next, setNext] = useState(false);
  const [changeSectionLogin, setChangeSectionLogin] = useState(false);
  const [changeSectionSignup, setChangeSectionSignup] = useState(false);

  const form1 = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema1,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log("Login Submitted", values);
      toast.dismiss();
      navigate("/placeholder");
    },
  });

  const form21 = useFormik({
    initialValues: { fullname: "", email: "" },
    validationSchema: validationSchema21,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      setChangeSectionSignup(true);
      console.log("Signup Submitted", values);
      toast.dismiss();
    },
  });

  const form22 = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: validationSchema22,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log("Signup Submitted", values);
      toast.dismiss();
      navigate("/placeholder");
    },
  });

  const debouncedValidate = useCallback(
    debounce((form: FormikProps<any>, field: string) => {
      form.validateField(field);
    }, 500),
    []
  );

  const handleChangeWithDebounce = (form: FormikProps<any>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    form.setTouched({ ...form.touched, [fieldName]: true });
    form.handleChange(e);
    debouncedValidate(form, fieldName);
  };

  const isToastActive = useRef(false);

  const showToast = async <T extends object>(form: FormikProps<T>) => {
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
  
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  
  return (
    <FlipCard width="90vw" maxWidth="350px">
      <FlipCardFrontSide changeSection={changeSectionLogin}>
        <FlipCardSection>
          <Login 
            form={form1} 
            handleChangeWithDebounce={handleChangeWithDebounce} 
            setChangeSectionLogin={setChangeSectionLogin} 
            showToast={() => showToast(form1)}
          />
        </FlipCardSection>
        <FlipCardSection>
          <ForgetPassword setChangeSectionLogin={setChangeSectionLogin}/>
        </FlipCardSection>
      </FlipCardFrontSide>
      <FlipCardBackSide changeSection={changeSectionSignup}>
        <FlipCardSection>
          <Signup1 
            form={form21} 
            handleChangeWithDebounce={handleChangeWithDebounce} 
            next={next} 
            setNext={setNext} 
            showToast={() => showToast(form21)}
          />
        </FlipCardSection>
        <FlipCardSection>
          <Signup2 
            form={form22} 
            handleChangeWithDebounce={handleChangeWithDebounce} 
            setChangeSectionSignup={setChangeSectionSignup} 
            showToast={() => showToast(form22)}
          />
        </FlipCardSection>
      </FlipCardBackSide>
    </FlipCard>
  );
};

export default Auth;