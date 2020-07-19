import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Category from '../Category';
import { reorderCrits } from '../Category/categoriesSlice';
import Feedback from '../Feedback';
import { reorderFeedbackCrits } from '../Feedback/feedbackSlice';
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
        <Row noGutters>
          <div className="assignment-header">
            <h1>Assignment Title</h1>
            <p>
              from <a href="#courses/123">Example Course</a>
            </p>
          </div>
        </Row>
        <Row>
          {/* Crit column */}
          <Droppable droppableId={id} type="category">
            {(provided) => (
              <Col
                sm={12}
                md={8}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {assignment.categoryIds.map((categoryId, index) => (
                  <Category key={categoryId} id={categoryId} index={index} />
                ))}
                {provided.placeholder}
              </Col>
            )}
          </Droppable>
          {/* Feedback column */}
          <Col sm={12} md={4} className="column-feedback">
            <Feedback />
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  );
};

export default Assignment;
