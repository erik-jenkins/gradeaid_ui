import React from 'react';

interface FeedbackScoreProps {
  maxScore: number;
  currentScore: number;
}

const FeedbackScore: React.FC<FeedbackScoreProps> = ({
  maxScore,
  currentScore,
}) => {
  return (
    <div className="feedback-score">
      <h3 className="mb-0">
        Score: {currentScore}/{maxScore}
      </h3>
    </div>
  );
};

export default FeedbackScore;
