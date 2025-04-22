import { useFormik } from "formik";
import Login from "./components/Login";
import Signup1 from "./components/Signup1";
import Signup2 from "./components/Signup2";
import Loading from "./components/Loading";
import { FC, useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import useLogin from "../../api/Auth/useLogin";
import { useNavigate } from "react-router-dom";
import useSendOtp from "../../api/Auth/useSendOtp";
import ConfirmEmail from "./components/ConfirmEmail";
import OtpValidation from "./components/OtpValidation";
import useVerifiedOtp from "../../api/Auth/useVerifiedOtp";
import PasswordRecovery from "./components/PasswordRecovery";
import useResetPassword from "../../api/Auth/useResetPassword";
import useSignupVerifyOtp from "../../api/Auth/useSignupVerifyOtp";
import useSignupRequestOtp from "../../api/Auth/useSignupRequestOtp";
import { handleChangeWithDebounce, showErrorToastForm } from '../../utils';
import { FlipCard, FlipCardBackSide, FlipCardFrontSide, FlipCardSection } from "../../components/FlipCard/FlipCard";
import { getLoginConfig, getSignupConfig1, getSignupConfig2, getConfirmEmailConfig, getOtpConfig, passwordRecoveryConfig } from './utils';

const Auth: FC = () => {

  const navigate = useNavigate();
  const isToastActive = useRef<boolean>(false);

  const [twoFa, setTwoFa] = useState(false);
  const [loader, setLoader] = useState(false);
  const [changeSectionLogin, setChangeSectionLogin] = useState(0);
  const [changeSectionSignup, setChangeSectionSignup] = useState(0);

  const { mutate: sendOtp } = useSendOtp(setLoader, setChangeSectionLogin, isToastActive);
  const { mutate: signupVerifyOtp } = useSignupVerifyOtp(setLoader, navigate, isToastActive);
  const { mutate: verifyOtp } = useVerifiedOtp(setLoader, setChangeSectionLogin, navigate, twoFa, isToastActive);
  const { mutate: resetPassword } = useResetPassword(setLoader, setChangeSectionLogin, isToastActive);
  const { mutate: login } = useLogin(setLoader, setTwoFa, navigate, sendOtp, isToastActive);
  const { mutate: signupRequestOtp } = useSignupRequestOtp(setLoader, setChangeSectionSignup, isToastActive);

  const loginForm = useFormik(getLoginConfig(login));
  const signupForm1 = useFormik(getSignupConfig1(setChangeSectionSignup));
  const signupForm2 = useFormik(getSignupConfig2(signupRequestOtp));
  const confirmEmailForm = useFormik(getConfirmEmailConfig(sendOtp));
  const otpFormLogin = useFormik(getOtpConfig(verifyOtp));
  const otpFormSignup = useFormik(getOtpConfig(signupVerifyOtp));
  const passwordRecoveryForm = useFormik(passwordRecoveryConfig(resetPassword));

  return (
    <FlipCard width="90vw" maxWidth="350px">
      <FlipCardFrontSide changeSection={changeSectionLogin}>
        <FlipCardSection>
          {!loader ? 
            <Login 
              form={loginForm} 
              handleChangeWithDebounce={handleChangeWithDebounce} 
              setChangeSectionLogin={setChangeSectionLogin} 
              showToast={() => showErrorToastForm(loginForm, isToastActive)}
            /> : 
            <Loading />
          }
        </FlipCardSection>
        <FlipCardSection>
          {!loader ? 
            twoFa ?
              <OtpValidation 
                form={otpFormLogin} 
                setChangeSection={setChangeSectionLogin}
                twoFa={true}
                sendOtp={sendOtp}
              /> :  
              <ConfirmEmail
                form={confirmEmailForm} 
                handleChangeWithDebounce={handleChangeWithDebounce} 
                setChangeSectionLogin={setChangeSectionLogin} 
                showToast={() => showErrorToastForm(confirmEmailForm, isToastActive)}
              /> : 
              <Loading />
          }
        </FlipCardSection>
        <FlipCardSection>
          {!loader ? 
            <OtpValidation 
              form={otpFormLogin} 
              setChangeSection={setChangeSectionLogin}
              sendOtp={sendOtp}
            /> :
            <Loading />
          }
        </FlipCardSection>
        <FlipCardSection>
          {!loader ?
            <PasswordRecovery
              form={passwordRecoveryForm}
              handleChangeWithDebounce={handleChangeWithDebounce} 
              setChangeSectionLogin={setChangeSectionLogin} 
              showToast={() => showErrorToastForm(passwordRecoveryForm, isToastActive)}
            /> :
            <Loading />
          }
        </FlipCardSection>
      </FlipCardFrontSide>
      <FlipCardBackSide changeSection={changeSectionSignup}>
        <FlipCardSection>
          <Signup1 
            form={signupForm1} 
            handleChangeWithDebounce={handleChangeWithDebounce} 
            showToast={() => showErrorToastForm(signupForm1, isToastActive)}
          />
        </FlipCardSection>
        <FlipCardSection>
          {!loader ? 
            <Signup2 
              form={signupForm2}
              handleChangeWithDebounce={handleChangeWithDebounce} 
              setChangeSectionSignup={setChangeSectionSignup} 
              showToast={() => showErrorToastForm(signupForm2, isToastActive)}
            /> : 
            <Loading/>
          }
        </FlipCardSection>
        <FlipCardSection>
          {!loader ? 
            <OtpValidation 
              form={otpFormSignup} 
              setChangeSection={setChangeSectionSignup} 
              sendOtp={sendOtp}
            /> :
            <Loading/>
          }
        </FlipCardSection>
      </FlipCardBackSide>
    </FlipCard>
  );
};

export default Auth;