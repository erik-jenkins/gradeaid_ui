import React from 'react';
import { Assignment } from '../Assignment/types';
import { Crit } from '../Crit/types';

interface FeedbackScoreProps {
  feedbackCrits: Crit[];
  assignment: Assignment;
}

const computeScore = (
  feedbackCrits: Crit[],
  assignment: Assignment
): number => {
  let score = assignment.maxScore;

  if (assignment.useMasteryScoring && feedbackCrits.length > 0) {
    score -= assignment.masteryPoints;
  }

  score -= feedbackCrits.reduce(
    (acc, crit) => acc + crit.pointValue * crit.occurs,
    0
  );

  if (score < 0) {
    score = 0;
  }

  return score;
};

const FeedbackScore: React.FC<FeedbackScoreProps> = ({
  feedbackCrits,
  assignment,
}) => {
  const currentScore = computeScore(feedbackCrits, assignment);

  return (
    <div className="feedback-score">
      <h3 className="mb-0">
        Score: {currentScore}/{assignment.maxScore}
      </h3>
    </div>
  );
};

export default FeedbackScore;
