import './InputField.css';
import Loader from '../../Loader/Loader';
import { FC, useState, useEffect } from 'react';
import { handleDebounceSignup1 } from '../../../pages/Auth/utils';

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
  setUnique?: React.Dispatch<React.SetStateAction<string>>;
  isFetching?: boolean;
  isFetched?: boolean;
  condition?: boolean;
}

const InputField: FC<InputFieldProps> = ({ name, title, leftIcon, rightIcon, placeholder, isPassword, onChange, value, error, setUnique, isFetching, isFetched, condition }) => {
  
  useEffect(() => {
    if (!setUnique) return;
    handleDebounceSignup1(setUnique, value, error || "");
    return () => handleDebounceSignup1.cancel();
  }, [value, error]);
  
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <>
      <div className="input">
        <label className="label" htmlFor={name}>
          {title}
        </label>
        <input
          className={`${(isPassword || rightIcon || (isFetching || isFetched)) ? 'padding-lg': 'padding-sm'} ${error ? 'error': ''}`}
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
        {(isPassword || rightIcon) ? !setUnique && (
          <div className="right-icon" onClick={() => setShowPassword(!showPassword)}>
            <i
              className={`fa-lg fa-solid ${ isPassword ? showPassword ? 'fa-eye-slash' : 'fa-eye' : rightIcon } icon-color pointer`}
            ></i>
          </div>
        ) :
        isFetching ? (
          <div className="right-icon">
            <Loader />
          </div>
        ) : 
        isFetched ? (
          <div className="right-icon">
            <i className={`fa-lg fa-solid ${ condition ? 'fa-check check-color': 'fa-xmark xmark-color' } pointer`}
            ></i>
          </div>
        ) : ''}
      </div>
      <p className={`helper-text ${error ? 'visible': ''}`}>
        <i className="fa-solid fa-circle-exclamation error-logo"></i>
        {error ?? '.'}
      </p>
    </>
  );
};

export default InputField;