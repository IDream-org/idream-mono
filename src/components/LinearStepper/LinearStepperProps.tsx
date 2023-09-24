export interface LinearStepperProps {
  steps: string[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  checkRequired: () => boolean;
  handleCreate: () => Promise<void>;
}
