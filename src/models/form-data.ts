export interface MultiStepFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export type FormErrorStep = {
  [key: string]: boolean;
};

export type FormErrors = FormErrorStep[];
