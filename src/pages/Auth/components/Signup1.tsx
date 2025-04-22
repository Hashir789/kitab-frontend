import "../Auth.css";
import { FC, useState } from "react";
import { FormikProps } from "formik";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../components/Button/Button";
import Separator from "../../../components/Separator/Separator";
import useIsEmailAvailable from "../../../api/Auth/useIsEmailAvailable";
import InputField from "../../../components/Input/InputField/InputField";

interface SignupProps {
  form: FormikProps<{ fullname: string; email: string; }>;
  handleChangeWithDebounce: (
    form: FormikProps<{ fullname: string; email: string; }>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToast: () => Promise<boolean>;
}

const Signup1: FC<SignupProps> = ({ form, handleChangeWithDebounce, showToast }) => {
  
  const [unique, setUnique] = useState('');
  const { isFetching, isFetched, data } = useIsEmailAvailable(unique, form);

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
            name="fullname"
            title="Full Name"
            placeholder="John Doe"
            leftIcon="fa-user"
            onChange={handleChangeWithDebounce(form)}
            value={form.values.fullname}
            error={form.touched.fullname ? form.errors.fullname : undefined}
        />
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
            condition={(data?.available && !form.errors.email)}
        />
        <div className="mt-30">
          <Button onClick={showToast} disabled={isFetching} mx>
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

export default Signup1;