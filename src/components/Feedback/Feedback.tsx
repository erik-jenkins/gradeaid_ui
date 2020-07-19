import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import FeedbackCrit from '../FeedbackCrit';
import './Feedback.scss';

const Feedback = () => {
  const feedbackCrits = useSelector(
    (state: RootState) => state.feedback.feedbackCrits
  );

  const critsById = useSelector((state: RootState) => state.crits.critsById);

  return (
    <div className="sticky-top" style={{ top: '10px' }}>
      <Row className="mb-1">
        <Col className="feedback-controls">
          <Button variant="primary" id="copy-button">
            Copy
          </Button>
          <Button variant="danger" id="reset-button">
            Reset
          </Button>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Feedback will appear here once added..."
            disabled
          />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <Droppable droppableId="feedback-crits-droppable" type="feedback">
            {(provided) => (
              <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                {feedbackCrits.map(({ critId, occurrences }, index) => (
                  <FeedbackCrit
                    key={critId}
                    crit={critsById[critId]}
                    occurrences={occurrences}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </ListGroup>
            )}
          </Droppable>
        </Col>
      </Row>
      {feedbackCrits.length > 0 && (
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
