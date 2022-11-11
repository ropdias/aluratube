import { useState } from "react";

// This hook receives an array of functions to validate true or false
const useInput = (validations) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  let valueIsValid = true;
  validations.forEach((validation) => {
    if (!validation(enteredValue)) {
      valueIsValid = false;
    }
  });

  // const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue(""); // this resets the input value
    setIsTouched(false); // this makes the input not show as invalid when the form is submited
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
