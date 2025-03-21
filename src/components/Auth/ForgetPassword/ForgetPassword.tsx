import "../Auth.css";
import { FC } from "react";

interface ForgetPasswordProps {
    setChangeSectionLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForgetPassword: FC<ForgetPasswordProps> = ({ setChangeSectionLogin }) => {
  
  return (
    <>
      <h1 className="logo" onClick={() => setChangeSectionLogin(false)}>Kitaab</h1>
    </>
  );
};

export default ForgetPassword;