import React, { useState } from 'react';
import { StepComponentProps } from '../models/step-component';
import {
  STREET_LABEL,
  STREET_ERROR_MSG,
  CITY_LABEL,
  CITY_ERROR_MSG,
  STATE_LABEL,
  STATE_ERROR_MSG,
  ZIP_LABEL,
  ZIP_ERROR_MSG,
} from '../constants/address.constants';
import { REQUIRED_FIELD_LABEL } from '../constants/shared.constants';

export default function AddressFields({
  showValidation = false,
  onInputChange,
  onValidation,
}: StepComponentProps) {
  const [inputValues, setInputValues] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const [inputErrors, setInputErrors] = useState({
    street: true,
    city: true,
    state: true,
    zip: true,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
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
    <>
      <label htmlFor="street">
        {STREET_LABEL}
        <span className="required-field">{REQUIRED_FIELD_LABEL}</span>
      </label>
      <input
        id="street"
        name="street"
        required
        type="text"
        value={inputValues.street}
        onChange={handleChange}
      />
      <span className="validation-status"></span>
      {showValidation && inputErrors.street && (
        <p className="validation-message">{STREET_ERROR_MSG}</p>
      )}

      <label htmlFor="city">
        {CITY_LABEL}
        <span className="required-field">{REQUIRED_FIELD_LABEL}</span>
      </label>
      <input
        id="city"
        name="city"
        required
        type="text"
        value={inputValues.city}
        onChange={handleChange}
      />
      <span className="validation-status"></span>
      {showValidation && inputErrors.city && (
        <p className="validation-message">{CITY_ERROR_MSG}</p>
      )}
      {/* TODO make a select with list of states */}
      <label htmlFor="state">
        {STATE_LABEL}
        <span className="required-field">{REQUIRED_FIELD_LABEL}</span>
      </label>
      <input
        id="state"
        maxLength={2}
        name="state"
        size={2}
        required
        type="text"
        value={inputValues.state}
        onChange={handleChange}
      />
      <span className="validation-status"></span>
      {showValidation && inputErrors.state && (
        <p className="validation-message">{STATE_ERROR_MSG}</p>
      )}

      <label htmlFor="zip">
        {ZIP_LABEL}
        <span className="required-field">{REQUIRED_FIELD_LABEL}</span>
      </label>
      <input
        id="zip"
        inputMode="numeric"
        maxLength={5}
        name="zip"
        pattern="[0-9]*"
        size={5}
        required
        type="text"
        value={inputValues.zip}
        onChange={handleChange}
      />
      <span className="validation-status"></span>
      {showValidation && inputErrors.zip && (
        <p className="validation-message">{ZIP_ERROR_MSG}</p>
      )}
    </>
  );
}
