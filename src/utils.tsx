import { debounce } from "lodash";
import { FormikProps } from "formik";
import { toast } from "react-toastify";

const debouncedValidate = debounce((form: FormikProps<any>, field: string) => {
  form.validateField(field);
}, 500);
  
export const handleChangeWithDebounce = (form: FormikProps<any>) => 
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    form.setTouched({ ...form.touched, [fieldName]: true });
    form.handleChange(e);
    debouncedValidate(form, fieldName);
};

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const showErrorToastForm = async <T extends object>(form: FormikProps<T>, isToastActive: React.RefObject<boolean>) => {
  if (!isToastActive.current) {
    const errors = await form.validateForm();
    if (Object.keys(errors).length > 0) {
      isToastActive.current = true;
      toast.error(`${capitalizeFirstLetter(Object.keys(errors)[0])}: ${Object.values(errors)[0]}!`, {
        onClose: () => {
          isToastActive.current = false;
        },
      });
      return true;
    }
  }
  return false;
};