import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

interface ConfirmButtonProps {
  defaultStateText: string;
  confirmStateText: string;
  onConfirmClick(): void;
  resetOnMouseBlur?: boolean;
  buttonProps?: object;
}

enum ConfirmSteps {
  DEFAULT,
  CONFIRM,
}

const ConfirmButton = ({
  defaultStateText,
  confirmStateText,
  onConfirmClick,
  resetOnMouseBlur,
  buttonProps,
}: ConfirmButtonProps) => {
  const [buttonText, setButtonText] = useState(defaultStateText);
  const [confirmStep, setConfirmStep] = useState(ConfirmSteps.DEFAULT);

  const setConfirmState = () => {
    setButtonText(confirmStateText);
    setConfirmStep(ConfirmSteps.CONFIRM);
  };

  const setDefaultState = () => {
    setButtonText(defaultStateText);
    setConfirmStep(ConfirmSteps.DEFAULT);
  };

  const onClick = () => {
    if (confirmStep === ConfirmSteps.DEFAULT) {
      setConfirmState();
      return;
    }

    if (confirmStep === ConfirmSteps.CONFIRM) {
      onConfirmClick();
      setDefaultState();
    }
  };

  const onBlur = () => {
    resetOnMouseBlur && setDefaultState();
  };

  return (
    <Button onClick={onClick} onBlur={onBlur} {...buttonProps}>
      {buttonText}
    </Button>
  );
};

export default ConfirmButton;
