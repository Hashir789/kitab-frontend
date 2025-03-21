import "../Auth.css";
import { FC } from "react";
import { FormikProps } from "formik";
import Button from "../../Button/Button";
import "react-toastify/dist/ReactToastify.css";
import Separator from "../../Separator/Separator";
import InputField from "../../Input/InputField/InputField";

interface LoginProps {
  form: FormikProps<{ email: string; password: string; }>;
  handleChangeWithDebounce: (form: FormikProps<{ email: string; password: string; }>) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  setChangeSectionLogin: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: () => Promise<boolean>;
}

const Login: FC<LoginProps> = ({ form, handleChangeWithDebounce, setChangeSectionLogin, showToast }) => {
  
  return (
    <>
      <h1 className="logo">Kitaab</h1>
      <form className="form" onSubmit={form.handleSubmit}>
        <InputField
          name="email"
          title="Email"
          placeholder="john.doe@example.com"
          leftIcon="fa-envelope"
          onChange={handleChangeWithDebounce(form)}
          value={form.values.email}
          error={form.touched.email ? form.errors.email : undefined}
        />
        <div className="forgot-password-container">
          <InputField
            name="password"
            title="Password"
            isPassword
            onChange={handleChangeWithDebounce(form)}
            value={form.values.password}
            error={form.touched.password ? form.errors.password : undefined}
          />
          <button type="button" className="forgot-password" onClick={()=>setChangeSectionLogin(true)}>Forgot Password ?</button>
        </div>
        <Button onClick={showToast}>Login</Button>
      </form>
      <Separator />
      <p className="change-side">
        Don't have an account?
        <button className="link" data-flip-action>
          Signup
        </button>
      </p>
    </>
  );
};

export default Login;