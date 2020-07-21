import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Category from '../Category';
import { reorderCrits } from '../Category/categoriesSlice';
import { reorderFeedbackCrits } from '../Crit/critsSlice';
import { Crit } from '../Crit/types';
import Feedback from '../Feedback';
import './Assignment.scss';
import { reorderCategories } from './assignmentsSlice';

interface AssignmentProps {
  id: string;
}

const Assignment = ({ id }: AssignmentProps) => {
  const dispatch = useDispatch();

  const assignment = useSelector(
    (state: RootState) => state.assignments.assignmentsById[id]
  );

  const computeScore = (feedbackCrits: Crit[]) => {
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

  const onDragEnd = (result: DropResult) => {
    if (result.type === 'crit') {
      dispatch(reorderCrits(result));
    } else if (result.type === 'category') {
      dispatch(reorderCategories(result));
    } else if (result.type === 'feedback') {
      dispatch(reorderFeedbackCrits(result));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container className="assignment-container">
        <Row noGutters></Row>
        <Row>
          {/* Crit column */}
          <Col sm={12} md={8}>
            <div className="assignment-header">
              <div className="assignment-header-details">
                <h1>Assignment Title</h1>
                <p className="text-muted">
                  from <a href="#courses/123">Example Course</a>
                </p>
              </div>
              <div className="assignment-header-controls">asd</div>
            </div>
            <Droppable droppableId={id} type="category">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {assignment.categoryIds.map((categoryId, index) => (
                    <Category key={categoryId} id={categoryId} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
          {/* Feedback column */}
          <Col sm={12} md={4} className="column-feedback">
            <Feedback
              maxScore={assignment.maxScore}
              computeScore={computeScore}
            />
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  );
};

export default Assignment;
