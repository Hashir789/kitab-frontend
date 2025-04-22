import "../Auth.css";
import { FC } from "react";
import { FormikProps } from "formik";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import OtpField from "../../../components/Input/OtpField/OtpField";

interface OtpValidationProps {
  form: FormikProps<{ otp: string; }>;
  setChangeSection: React.Dispatch<React.SetStateAction<number>>;
  twoFa?: boolean;
  sendOtp: (variables: { email: string; twoFa?: boolean }) => void;
}

const OtpValidation: FC<OtpValidationProps> = ({ setChangeSection, form, twoFa, sendOtp }) => {
  return (
    <>
      <h1 className="logo">Kitaab</h1>
      <div className="forget-password-icon-container">
        <div className="forget-password-envelope-wrapper">
          <FaEnvelope size={60} className="forget-password-envelope-icon" />
          <div className="forget-password-lock-wrapper">
            <FaLock size={15} className="forget-password-lock-icon" />
          </div>
        </div>
      </div>
      <p className="forget-your-password-text">
        To continue, enter the OTP sent to
        <br />
        <span className="font-600">{ sessionStorage.getItem('emailOtp') ?? 'muhammad.hashir.malik1@gmail.com' }</span>
      </p>
      <form className="m-20">
        <OtpField form={form} />
      </form>
      <p className="resend-div">
        Didn't get the code ?
        <button className="resend" type="button" onClick={() => { sendOtp({ email: sessionStorage.getItem("emailOtp") || "" }) }}>Resend</button>
      </p>
      <Button onClick={() => twoFa? setChangeSection(0): setChangeSection(1)} isCancel mx>Back</Button>
    </>
  );
};

export default OtpValidation;