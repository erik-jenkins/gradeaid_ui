import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Assignment } from '../Assignment/types';
import { Crit } from '../Crit/types';
import './Feedback.scss';
import FeedbackControls from './FeedbackControls';
import FeedbackCrit from './FeedbackCrit';
import FeedbackScore from './FeedbackScore';
import FeedbackText from './FeedbackText';

interface FeedbackProps {
  assignment: Assignment;
}

const Feedback: React.FC<FeedbackProps> = ({ assignment }) => {
  const feedbackCrits: Crit[] = useSelector((state: RootState) =>
    state.crits.feedbackCritIds.map((critId) => state.crits.critsById[critId])
  );

  return (
    <div className="sticky-top" style={{ top: '10px' }}>
      <Row className="mb-1">
        <Col>
          <FeedbackScore
            feedbackCrits={feedbackCrits}
            assignment={assignment}
          />
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
              <ListGroup
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="feedback-crits"
              >
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
