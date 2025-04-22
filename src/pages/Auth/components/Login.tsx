import "../Auth.css";
import { FC } from "react";
import { FormikProps } from "formik";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../components/Button/Button";
import Separator from "../../../components/Separator/Separator";
import InputField from "../../../components/Input/InputField/InputField";

interface LoginProps {
  form: FormikProps<{ email: string; password: string; }>;
  handleChangeWithDebounce: (form: FormikProps<{ email: string; password: string; }>) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  setChangeSectionLogin: React.Dispatch<React.SetStateAction<number>>;
  showToast: () => Promise<boolean>;
}

const Login: FC<LoginProps> = ({ form, handleChangeWithDebounce, setChangeSectionLogin, showToast }) => {
  
  return (
    <>
      <h1 className="logo">Kitaab</h1>
      <form className="form" onSubmit={(e)=> {
        e.preventDefault();
        form.submitForm().then(() => {
          if (JSON.stringify(form.errors) === "{}") {
            form.resetForm();
          }
        });
      }}>
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
          <button type="button" className="forgot-password" onClick={()=>setChangeSectionLogin(1)}>Forgot Password ?</button>
        </div>
        <div className="mt-30">
          <Button onClick={showToast} mx>Login</Button>
        </div>
      </form>
      <Separator />
      <p className="change-side">
        Don't have an account ?
        <button className="link" data-flip-action>
          Signup
        </button>
      </p>
    </>
  );
};

export default Login;