export interface StepComponentProps {
  showValidation: boolean;
  onInputChange: (name: string, value: string) => void;
  onValidation: (name: string, isValid: boolean) => void;
}
