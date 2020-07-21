import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Crit } from '../Crit/critsSlice';
import FeedbackCrit from '../FeedbackCrit';
import './Feedback.scss';
import FeedbackControls from './FeedbackControls';
import FeedbackScore from './FeedbackScore';
import FeedbackText from './FeedbackText';

interface FeedbackProps {
  maxScore: number;
  computeScore: Function;
}

const Feedback: React.FC<FeedbackProps> = ({ maxScore, computeScore }) => {
  const feedbackCrits: Crit[] = useSelector((state: RootState) =>
    state.crits.feedbackCritIds.map((critId) => state.crits.critsById[critId])
  );

  const currentScore = computeScore(feedbackCrits);

  return (
    <div className="sticky-top" style={{ top: '10px' }}>
      <Row className="mb-1">
        <Col>
          <FeedbackScore maxScore={maxScore} currentScore={currentScore} />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <FeedbackControls feedbackCrits={feedbackCrits} />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <FeedbackText feedbackCrits={feedbackCrits} />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <Droppable droppableId="feedback-crits-droppable" type="feedback">
            {(provided) => (
              <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                {feedbackCrits.map((crit, index) => (
                  <FeedbackCrit key={crit.id} crit={crit} index={index} />
                ))}
                {provided.placeholder}
              </ListGroup>
            )}
          </Droppable>
        </Col>
      </Row>
      {feedbackCrits.length > 1 && (
        <Row>
          <Col>
            <div className="feedback-list-help text-muted">
              Items in this list can be reordered to change the order of the
              feedback.
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Feedback;
