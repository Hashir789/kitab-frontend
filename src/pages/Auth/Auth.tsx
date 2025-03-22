import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { FC, useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import Login from "../Auth/components/Login/Login";
import Signup1 from "../Auth/components/Signup/Signup1";
import Signup2 from "../Auth/components/Signup/Signup2";
import { handleChangeWithDebounce, showErrorToastForm } from '../../utils';
import ForgetPassword from "../Auth/components/ForgetPassword/ForgetPassword";
import { getLoginConfig, getSignupConfig_1, getSignupConfig_2 } from './utils';
import { FlipCard, FlipCardBackSide, FlipCardFrontSide, FlipCardSection } from "../../components/FlipCard/FlipCard";

const Auth: FC = () => {

  const navigate = useNavigate();
  
  const isToastActive = useRef<boolean>(false);

  const [changeSectionLogin, setChangeSectionLogin] = useState(false);
  const [changeSectionSignup, setChangeSectionSignup] = useState(false);

  const loginForm = useFormik(getLoginConfig(navigate));
  const signupForm_1 = useFormik(getSignupConfig_1(setChangeSectionSignup));
  const signupForm_2 = useFormik(getSignupConfig_2(navigate));
  
  return (
    <FlipCard width="90vw" maxWidth="350px">
      <FlipCardFrontSide changeSection={changeSectionLogin}>
        <FlipCardSection>
          <Login 
            form={loginForm} 
            handleChangeWithDebounce={handleChangeWithDebounce} 
            setChangeSectionLogin={setChangeSectionLogin} 
            showToast={() => showErrorToastForm(loginForm, isToastActive)}
          />
        </FlipCardSection>
        <FlipCardSection>
          <ForgetPassword setChangeSectionLogin={setChangeSectionLogin}/>
        </FlipCardSection>
      </FlipCardFrontSide>
      <FlipCardBackSide changeSection={changeSectionSignup}>
        <FlipCardSection>
          <Signup1 
            form={signupForm_1} 
            handleChangeWithDebounce={handleChangeWithDebounce} 
            showToast={() => showErrorToastForm(signupForm_1, isToastActive)}
          />
        </FlipCardSection>
        <FlipCardSection>
          <Signup2 
            form={signupForm_2}
            handleChangeWithDebounce={handleChangeWithDebounce} 
            setChangeSectionSignup={setChangeSectionSignup} 
            showToast={() => showErrorToastForm(signupForm_2, isToastActive)}
          />
        </FlipCardSection>
      </FlipCardBackSide>
    </FlipCard>
  );
};

export default Auth;