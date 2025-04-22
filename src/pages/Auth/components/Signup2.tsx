import "../Auth.css";
import { FC } from "react";
import { FormikProps } from "formik";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../components/Button/Button";
import Separator from "../../../components/Separator/Separator";
import InputField from "../../../components/Input/InputField/InputField";

interface SignupProps {
  form: FormikProps<{ password: string; confirmPassword: string; }>;
  handleChangeWithDebounce: (form: FormikProps<{ password: string; confirmPassword: string; }>) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  setChangeSectionSignup: React.Dispatch<React.SetStateAction<number>>;
  showToast: () => Promise<boolean>;
}

const Signup2: FC<SignupProps> = ({ form, handleChangeWithDebounce, setChangeSectionSignup, showToast }) => {
  
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
        <div className="mt-30" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button onClick={() => { setChangeSectionSignup(0); }} isCancel mx>
            Back
          </Button>
          <Button onClick={showToast} mr>
            Signup
          </Button>
        </div>
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