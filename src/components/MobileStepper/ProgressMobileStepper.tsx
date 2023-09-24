import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const ProgressMobileStepper: React.FC<ProgressMobileStepperProps> = ({
  activeStep,
  setActiveStep,
  checkRequired,
  handleCreate,
}) => {
  const theme = useTheme();

  const handleNext = async () => {
    const requiredItems = checkRequired();
    if (!requiredItems) return;
    if (activeStep === 6) {
      await handleCreate();
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="progress"
      steps={7}
      position="static"
      activeStep={activeStep}
      sx={{ flexGrow: 1, pb: 5 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 7}>
          {activeStep === 6 ? "Create" : "Next"}
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
};

export default ProgressMobileStepper;
