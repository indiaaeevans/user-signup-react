import React, { useState } from 'react';
import { REQUIRED_FIELD_LABEL } from '../constants/shared.constants';
import {
  EMAIL_LABEL,
  EMAIL_ERROR_MSG,
  PASSWORD_LABEL,
  PASSWORD_REGEX,
  PASSWORD_DESCRIPTION,
  PASSWORD_ERROR_MSG,
} from '../constants/step1.constants';

interface StepOneProps {
  showValidation: boolean;
  onInputChange: (name: string, value: string) => void;
  onValidation: (name: string, isValid: boolean) => void;
}

const StepOne = ({
  showValidation = false,
  onInputChange,
  onValidation,
}: StepOneProps) => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const [inputErrors, setInputErrors] = useState({
    email: true,
    password: true,
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    const isValid = event.target.validity.valid;
    console.log('name:', name);
    console.log('isValid:', isValid);
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !isValid,
    }));

    onInputChange(name, value);
    onValidation(name, isValid);
  };

  return (
    <div>
      <label htmlFor="email">
        {EMAIL_LABEL}
        <span className="required-field">{REQUIRED_FIELD_LABEL}</span>
      </label>
      <input
        id="email"
        name="email"
        required
        type="email"
        value={inputValues.email}
        onChange={handleInputChange}
      />
      <span className="validation-status"></span>
      {showValidation && inputErrors.email && (
        <p className="validation-message">{EMAIL_ERROR_MSG}</p>
      )}

      <label htmlFor="password">
        {PASSWORD_LABEL}
        <span className="required-field">{REQUIRED_FIELD_LABEL}</span>
      </label>
      <input
        id="password"
        minLength={8}
        name="password"
        pattern={PASSWORD_REGEX.source}
        required
        type="password"
        value={inputValues.password}
        onChange={handleInputChange}
      />
      <span className="validation-status"></span>
      <p className="microcopy">{PASSWORD_DESCRIPTION}</p>
      {showValidation && inputErrors.password && (
        <p className="validation-message">{PASSWORD_ERROR_MSG}</p>
      )}
    </div>
  );
};

export default StepOne;
