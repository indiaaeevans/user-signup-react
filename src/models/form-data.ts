export interface MultiStepFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  address?: AddressFormData;
}

export interface AddressFormData {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export type FormErrorStep = {
  [key: string]: boolean;
};

export type FormErrors = FormErrorStep[];

// export type MultiStepFormErrors = {
//   [K in keyof MultiStepFormData]: boolean;
// };
