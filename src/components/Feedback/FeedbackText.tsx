import React from 'react';
import { Form } from 'react-bootstrap';
import { Crit } from '../Crit/critsSlice';
import { constructFeedbackText } from './computeFeedback';

interface FeedbackTextProps {
  feedbackCrits: Crit[];
}

const FeedbackText: React.FC<FeedbackTextProps> = ({ feedbackCrits }) => {
  const feedbackText = constructFeedbackText(feedbackCrits);

  return (
    <Form.Control
      as="textarea"
      rows={5}
      placeholder="Feedback will appear here once added..."
      value={feedbackText}
      disabled
      id="feedback-textarea"
    />
  );
};

export default FeedbackText;
