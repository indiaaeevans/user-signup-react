import React, {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './App.css';

import AddressFields from './components/AddressFields';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import { FormErrors, MultiStepFormData } from './models/form-data';

import {
  NEXT_BUTTON_TEXT,
  SUBMIT_BUTTON_TEXT,
} from './constants/shared.constants';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from './constants/results.constants';
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
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  /* add/remove address fields from form errors */
  useEffect(() => {
    if (showAddress) {
      setFormErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[1] = {
          ...newErrors[1],
          street: true,
          city: true,
          state: true,
          zip: true,
        };
        return newErrors;
      });
    } else {
      setFormErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        delete newErrors[1].street;
        delete newErrors[1].city;
        delete newErrors[1].state;
        delete newErrors[1].zip;
        return newErrors;
      });
    }
  }, [showAddress]);

  /* update formData when child form inputs update -- TODO debounce to optimize performance? */
  const handleInputChange = useCallback((name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  /* update formErrors when child form inputs update */
  const handleValidation = useCallback(
    (name: string, isValid: boolean) => {
      setFormErrors((prevErrors) => {
        const newErrors = [...prevErrors]; // Copy the previous errors
        const currentStepErrors = newErrors[step - 1] || {}; // Get the errors for the current step or initialize to an empty object
        currentStepErrors[name] = !isValid; // Set the error for the current field
        newErrors[step - 1] = currentStepErrors; // Update the errors for the current step
        return newErrors;
      });
    },
    [step]
  );

  /* toggle address form fields */
  const handleShowAddressChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setShowAddress(event.target.checked);
    }, []);

  /* check for form errors on the current step */
  const hasFormErrors = useMemo(() => {
    let hasErrors = false;
    let currentStepErrors = formErrors[step - 1];
    for (const key in currentStepErrors) {
      if (currentStepErrors[key] === true) {
        hasErrors = true;
        break;
      }
    }
    return hasErrors;
  }, [formErrors, step]);

  /* go to next step if valid */
  const handleNextClick = () => {
    if (hasFormErrors) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    setStep((prevStep) => prevStep + 1);
  };

  /* submit the form if valid */
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (hasFormErrors) {
      setShowValidation(true);
      return;
    }
    submitForm();
  };

  /* submit the form data */
  const submitForm = async () => {
    setFormSubmitSuccess(false);
    setFormSubmitError(false);
    const response = await fetch('https://httpstat.us/random/201,500', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });
    setFormSubmitted(true);
    if (response.ok) {
      setFormSubmitSuccess(true);
    } else {
      setFormSubmitError(true);
    }
  };

  return (
    <>
      {!formSubmitted && (
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

          {step < 2 && (
            <button type="button" onClick={handleNextClick}>
              {NEXT_BUTTON_TEXT}
            </button>
          )}
          {step === 2 && <button type="submit">{SUBMIT_BUTTON_TEXT}</button>}
        </form>
      )}
      {formSubmitSuccess && <div>{SUCCESS_MESSAGE}</div>}
      {formSubmitError && <div>{ERROR_MESSAGE}</div>}
    </>
  );
};

export default MultiStepForm;
