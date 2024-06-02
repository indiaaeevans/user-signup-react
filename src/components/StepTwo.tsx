import React, { useState } from 'react';
import { REQUIRED_FIELD_LABEL } from '../constants/shared.constants';
import {
  FIRST_NAME_LABEL,
  FIRST_NAME_ERROR_MSG,
  LAST_NAME_LABEL,
  LAST_NAME_ERROR_MSG,
  BIRTHDAY_LABEL,
  BIRTHDAY_ERROR_MSG,
} from '../constants/step2.constants';
import { StepComponentProps } from '../models/step-component';

const StepTwo = ({
  showValidation = false,
  onInputChange,
  onValidation,
}: StepComponentProps) => {
  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
  });

  const [inputErrors, setInputErrors] = useState({
    firstName: true,
    lastName: true,
    birthday: true,
  });
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    const isValid = event.target.validity.valid;

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
      <label htmlFor="first-name">
        {FIRST_NAME_LABEL}
        <span className="required-field">{REQUIRED_FIELD_LABEL}</span>
      </label>
      <input
        id="first-name"
        name="firstName"
        required
        type="text"
        value={inputValues.firstName}
        onChange={handleInputChange}
      />
      <span className="validation-status"></span>
      {showValidation && inputErrors.firstName && (
        <p className="validation-message">{FIRST_NAME_ERROR_MSG}</p>
      )}

      <label htmlFor="last-name">
        {LAST_NAME_LABEL}
        <span className="required-field">{REQUIRED_FIELD_LABEL}</span>
      </label>
      <input
        id="last-name"
        name="lastName"
        required
        type="text"
        value={inputValues.lastName}
        onChange={handleInputChange}
      />
      <span className="validation-status"></span>
      {showValidation && inputErrors.lastName && (
        <p className="validation-message">{LAST_NAME_ERROR_MSG}</p>
      )}

      <label htmlFor="birthday">
        {BIRTHDAY_LABEL}
        <span className="required-field">{REQUIRED_FIELD_LABEL}</span>
      </label>
      <input
        id="birthday"
        name="birthday"
        max={today}
        required
        type="date"
        value={inputValues.birthday}
        onChange={handleInputChange}
      />
      <span className="validation-status"></span>
      {showValidation && inputErrors.birthday && (
        <p className="validation-message">{BIRTHDAY_ERROR_MSG}</p>
      )}
    </div>
  );
};

export default StepTwo;
