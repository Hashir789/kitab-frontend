import "../Auth.css";
import { FC } from "react";
import { FormikProps } from "formik";
import Button from "../../../components/Button/Button";
import InputField from "../../../components/Input/InputField/InputField";

interface PasswordRecoveryProps {
  form: FormikProps<{ password: string; confirmPassword: string; }>;
  handleChangeWithDebounce: (form: FormikProps<{ password: string; confirmPassword: string; }>) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  setChangeSectionLogin: React.Dispatch<React.SetStateAction<number>>;
  showToast: () => Promise<boolean>;
}

const PasswordRecovery: FC<PasswordRecoveryProps> = ({ form, handleChangeWithDebounce, setChangeSectionLogin, showToast }) => {

  return (
    <>
      <h1 className="logo">Kitaab</h1>
      <p className="password-recovery-text">Set a new password to continue</p>
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
        <div className="mt-20">
          <Button onClick={showToast} mx>Continue</Button>
        </div>
      </form>
      <div className="mt-15">
        <Button onClick={() => setChangeSectionLogin(2)} isCancel mx>Cancel</Button>
      </div>
    </>
  );
};

export default PasswordRecovery;