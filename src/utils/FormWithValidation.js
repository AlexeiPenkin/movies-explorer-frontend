import { useCallback, useState } from 'react';
import validator from 'validator';

export function FormWithValidation({ defaultValues = {} } = {}) {
  const [values, setValues] = useState({ ...defaultValues });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  
  const validEmail = (target, name, value) => {
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: (validator.isEmail(value)) ? "" : 'Некоректный e-mail' });
    setIsValid((!validator.isEmail(value)) ? validator.isEmail(value) : target.closest("form").checkValidity());
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'email') {
      validEmail(target, name, value);
      return;
    }
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, setIsValid, resetForm, setValues };
}
