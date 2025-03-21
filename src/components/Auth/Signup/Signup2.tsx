import "../Auth.css";
import { FC } from "react";
import { FormikProps } from "formik";
import Button from "../../Button/Button";
import "react-toastify/dist/ReactToastify.css";
import Separator from "../../Separator/Separator";
import InputField from "../../Input/InputField/InputField";

interface SignupProps {
  form: FormikProps<{ password: string; confirmPassword: string; }>;
  handleChangeWithDebounce: (form: FormikProps<{ password: string; confirmPassword: string; }>) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  setChangeSectionSignup: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: () => Promise<boolean>;
}

const Signup2: FC<SignupProps> = ({ form, handleChangeWithDebounce, setChangeSectionSignup, showToast }) => {
  
  return (
    <>
      <h1 className="logo" onClick={()=>setChangeSectionSignup(false)}>Kitaab</h1>
      <form className="form" onSubmit={form.handleSubmit}>
        <InputField
          name="password"
          title="Password"
          isPassword
          onChange={handleChangeWithDebounce(form)}
          value={form.values.password}
          error={form.touched.password ? form.errors.password : undefined}
        />
        <InputField
          name="confirmPassword"
          title="Confirm Password"
          isPassword
          onChange={handleChangeWithDebounce(form)}
          value={form.values.confirmPassword}
          error={form.touched.confirmPassword ? form.errors.confirmPassword : undefined}
        />
        <Button onClick={showToast}>
          Signup
        </Button>
      </form>
      <Separator/>
      <p className="change-side">
        Already have an account ?
        <button className="link" data-flip-action>
          Login
        </button>
      </p>
    </>
  );
};

export default Signup2;