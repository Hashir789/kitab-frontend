import "../Auth.css";
import { FC } from "react";
import { FormikProps } from "formik";
import Button from "../../Button/Button";
import "react-toastify/dist/ReactToastify.css";
import Separator from "../../Separator/Separator";
import InputField from "../../Input/InputField/InputField";

interface SignupProps {
  form: FormikProps<{ fullname: string; email: string; }>;
  handleChangeWithDebounce: (form: FormikProps<{ fullname: string; email: string; }>) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  next: boolean;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: () => Promise<boolean>;
}

const Signup1: FC<SignupProps> = ({ form, handleChangeWithDebounce, next, setNext, showToast }) => {
  
  return (
    <>
      <h1 className="logo">Kitaab</h1>
      <form className="form" onSubmit={form.handleSubmit}>
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
        />
        <Button onClick={showToast} onMouseEnter={()=>setNext(true)} onMouseLeave={()=>setNext(false)}>
            Next
            <i className={`fa-solid fa-angles-right fa-xs next ${next ? 'animate-next': ''}`}></i>
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

export default Signup1;