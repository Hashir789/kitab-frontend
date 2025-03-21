import './InputField.css';
import { FC, useState } from 'react';

interface InputFieldProps {
  name: string;
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  placeholder?: string;
  isPassword?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: string | undefined;
}

const InputField: FC<InputFieldProps> = ({ name, title, leftIcon, rightIcon, placeholder, isPassword, onChange, value, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="input">
        <label className="label" htmlFor={name}>
          {title}
        </label>
        <input
          className={`${(isPassword || rightIcon) ? 'padding-lg': 'padding-sm'} ${error ? 'error': ''}`}
          type={isPassword && !showPassword ? 'password' : 'text'}
          name={name}
          placeholder={isPassword ? '••••••••' : placeholder || ''}
          autoComplete="off"
          onChange={onChange}
          value={value}
        />
        {(isPassword || leftIcon) && <div className="left-icon">
          <i className={`fa-lg fa-solid ${ isPassword ? "fa-lock" : leftIcon } icon-color`}></i>
        </div>}
        {(isPassword || rightIcon) && (
          <div className="right-icon" onClick={() => setShowPassword(!showPassword)}>
            <i
              className={`fa-lg fa-solid ${ isPassword ? showPassword ? 'fa-eye-slash' : 'fa-eye' : rightIcon } icon-color pointer`}
            ></i>
          </div>
        )}
      </div>
      <p className={`helper-text ${error ? 'visible': ''}`}>
        <i className="fa-solid fa-circle-exclamation error-logo"></i>
        {error ?? '.'}
      </p>
    </>
  );
};

export default InputField;