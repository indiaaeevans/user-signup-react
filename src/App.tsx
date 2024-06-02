import React, { FormEventHandler, useCallback, useState } from 'react';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import './App.css';
import { NEXT_BUTTON_TEXT } from './constants/shared.constants';
import { FormErrors, MultiStepFormData } from './models/form-data';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from './constants/results.constants';
import AddressFields from './components/AddressFields';
import { ADDRESS_TOGGLE_LABEL } from './constants/step2.constants';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({} as MultiStepFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>([
    { email: true, password: true },
    { firstName: true, lastName: true, birthday: true },
  ]);
  const [showValidation, setShowValidation] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleValidation = (name: string, isValid: boolean) => {
    console.log('in parent: ', name, isValid);
    setFormErrors((prevErrors) => {
      const newErrors = [...prevErrors]; // Copy the previous errors
      const currentStepErrors = newErrors[step - 1] || {}; // Get the errors for the current step or initialize to an empty object
      currentStepErrors[name] = !isValid; // Set the error for the current field
      newErrors[step - 1] = currentStepErrors; // Update the errors for the current step
      return newErrors;
    });
  };

  const handleShowAddressChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setShowAddress(event.target.checked);
    }, []);

  const hasFormErrors = (): boolean => {
    let hasErrors = false;
    let currentStepErrors = formErrors[step - 1];
    for (const key in currentStepErrors) {
      if (currentStepErrors[key] === true) {
        hasErrors = true;
        break;
      }
    }
    return hasErrors;
  };

  const handleNextClick = () => {
    if (hasFormErrors()) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousClick = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (hasFormErrors()) {
      setShowValidation(true);
      return;
    }
    console.log('Form Data:', formData);
    submitForm();
  };

  const submitForm = async () => {
    const response = await fetch('https://httpstat.us/random/201,500', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert(SUCCESS_MESSAGE);
    } else {
      // TODO error page
      alert(ERROR_MESSAGE);
      // setFormSubmitError(true);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      {step === 1 && (
        <StepOne
          showValidation={showValidation}
          onInputChange={handleInputChange}
          onValidation={handleValidation}
        />
      )}
      {step === 2 && (
        <>
          <StepTwo
            showValidation={showValidation}
            onInputChange={handleInputChange}
            onValidation={handleValidation}
          />

          <label className="inline-label" htmlFor="show-address">
            {ADDRESS_TOGGLE_LABEL}
          </label>
          <input
            id="show-address"
            type="checkbox"
            checked={showAddress}
            onChange={handleShowAddressChange}
          />

          {showAddress && (
            <AddressFields
              showValidation={showValidation}
              onInputChange={handleInputChange}
              onValidation={handleValidation}
            />
          )}
        </>
      )}

      {step > 1 && (
        <button type="button" onClick={handlePreviousClick}>
          Back
        </button>
      )}
      {step < 2 && (
        <button type="button" onClick={handleNextClick}>
          {NEXT_BUTTON_TEXT}
        </button>
      )}
      {step === 2 && <button type="submit">Submit</button>}
    </form>
  );
};

export default MultiStepForm;
