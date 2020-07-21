import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { resetFeedbackCrits } from '../Crit/critsSlice';
import { Crit } from '../Crit/types';
import { constructFeedbackText } from './computeFeedback';
import './FeedbackControls.scss';

interface FeedbackControlsProps {
  feedbackCrits: Crit[];
}

const FeedbackControls: React.FC<FeedbackControlsProps> = ({
  feedbackCrits,
}) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const dispatch = useDispatch();

  const onCopyClick = () => {
    if (feedbackCrits.length > 0) {
      const feedbackText = constructFeedbackText(feedbackCrits);
      navigator.clipboard.writeText(feedbackText).then(() => {
        setCopyButtonText('Copied!');
        window.setTimeout(() => setCopyButtonText('Copy'), 5000);
      });
    }
  };

  const onResetClick = () => {
    dispatch(resetFeedbackCrits());
  };

  return (
    <div className="feedback-controls">
      <Button variant="primary" id="copy-button" onClick={onCopyClick}>
        {copyButtonText}
      </Button>
      <Button variant="danger" id="reset-button" onClick={onResetClick}>
        Reset
      </Button>
    </div>
  );
};

export default FeedbackControls;
