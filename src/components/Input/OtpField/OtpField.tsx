import './OtpField.css';
import { FormikProps } from 'formik';
import { FC, useEffect, useRef } from 'react';

interface OtpFieldProps {
  form: FormikProps<{ otp: string; }>;
}

const OtpField: FC<OtpFieldProps> = ({ form }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const hasSubmittedRef = useRef<boolean>(false);
  
  const otpArray = form.values.otp.padEnd(4, '').split('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/^\d$/.test(value)) return;

    const updatedOtpArray = [...otpArray];
    updatedOtpArray[index] = value;

    form.setFieldValue('otp', updatedOtpArray.join(''));

    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const value = e.currentTarget.value;

    if (e.key === 'Backspace') {
      const updatedOtpArray = [...otpArray];
      if (!value && index > 0) {
        updatedOtpArray[index - 1] = 'a';
        inputRefs.current[index - 1]?.focus();
      } else {
        updatedOtpArray[index] = 'a';
      }

      form.setFieldValue('otp', updatedOtpArray.join(''));
      return;
    }

    if (e.ctrlKey || e.metaKey) return;

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();

    const pasteData = e.clipboardData.getData('Text').replace(/\D/g, '');
    const chars = pasteData.slice(0, 4 - index).split('');
    const updatedOtpArray = [...otpArray];

    chars.forEach((char, i) => {
      if (index + i < 4) {
        updatedOtpArray[index + i] = char;
      }
    });

    form.setFieldValue('otp', updatedOtpArray.join(''));

    const nextIndex = index + chars.length;
    if (nextIndex < 4) {
      inputRefs.current[nextIndex]?.focus();
    } else {
      inputRefs.current[3]?.focus();
    }
  };


  useEffect(() => {
    const isValidOtp = /^\d{4}$/.test(form.values.otp);
    if (isValidOtp && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      form.submitForm().then(() => {
        if (JSON.stringify(form.errors) === "{}") {
          form.resetForm();
        }
        hasSubmittedRef.current = false;
      });
    }
  }, [form.values.otp, form]);

  return (
    <div className="container">
      {[...Array(4)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={(index + 1).toString()}
          className="input1"
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
          value={otpArray[index] !== 'a' ? otpArray[index] : ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          onBlur={form.handleBlur}
          name="otp"
        />
      ))}
    </div>
  );
};

export default OtpField;