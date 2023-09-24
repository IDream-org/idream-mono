interface ProgressMobileStepperProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  checkRequired: () => boolean;
  handleCreate: () => Promise<void>;
}
