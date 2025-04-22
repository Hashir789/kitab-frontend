import "../Auth.css";
import { FC, useState } from "react";
import { FormikProps } from "formik";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import useIsEmailAvailable from "../../../api/Auth/useIsEmailAvailable";
import InputField from "../../../components/Input/InputField/InputField";

interface ConfirmEmailProps {
  form: FormikProps<{ email: string; }>;
  handleChangeWithDebounce: (form: FormikProps<{ email: string; }>) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  setChangeSectionLogin: React.Dispatch<React.SetStateAction<number>>;
  showToast: () => Promise<boolean>;
}

const ConfirmEmail: FC<ConfirmEmailProps> = ({ form, handleChangeWithDebounce, setChangeSectionLogin, showToast }) => {

  const [unique, setUnique] = useState('');
  const { isFetching, isFetched, data } = useIsEmailAvailable(unique, form, false);

  return (
    <>
      <h1 className="logo">Kitaab</h1>
      <div className="forget-password-icon-container">
        <div className="forget-password-envelope-wrapper">
          <FaEnvelope size={60} className="forget-password-envelope-icon"/>
          <div className="forget-password-lock-wrapper">
            <FaLock size={15} className="forget-password-lock-icon"/>
          </div>
        </div>
      </div>
      <p className="forget-your-password-text">
        <strong className="font-600">Forgot your password ?</strong>
        &nbsp;We will send a recovery email to your email address.
      </p>
      <form onSubmit={(e)=> {
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
          setUnique={setUnique}
          isFetching={isFetching}
          isFetched={isFetched}
          condition={!data?.available && !form.errors.email}
        />
        <div className="mt-20">
          <Button onClick={showToast} disabled={isFetching} mx>Continue</Button>
        </div>
      </form>
      <div className="mt-15">
        <Button onClick={() => setChangeSectionLogin(0)} isCancel mx>Cancel</Button>
      </div>
    </>
  );
};

export default ConfirmEmail;