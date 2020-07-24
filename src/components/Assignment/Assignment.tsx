import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Category from '../Category';
import AddCategory from '../Category/AddCategory';
import { reorderCrits } from '../Category/categoriesSlice';
import { reorderFeedbackCrits } from '../Crit/critsSlice';
import Feedback from '../Feedback';
import './Assignment.scss';
import AssignmentHeader from './AssignmentHeader';
import { reorderCategories } from './assignmentsSlice';

interface AssignmentProps {
  id: string;
  courseId: string;
}

const Assignment = ({ id, courseId }: AssignmentProps) => {
  const [showEditControls, setShowEditControls] = useState(false);
  const dispatch = useDispatch();

  const assignment = useSelector(
    (state: RootState) => state.assignments.assignmentsById[id]
  );

  const onShowEditControlsClick = () => setShowEditControls(!showEditControls);

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
        <Row>
          {/* Crit column */}
          <Col sm={12} md={8}>
            <AssignmentHeader
              assignment={assignment}
              courseId={courseId}
              showEditControls={showEditControls}
              onShowEditControlsClick={onShowEditControlsClick}
            />
            <Droppable droppableId={id} type="category">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {assignment.categoryIds.map((categoryId, index) => (
                    <Category
                      key={categoryId}
                      id={categoryId}
                      index={index}
                      assignmentId={id}
                      showEditControls={showEditControls}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {showEditControls && <AddCategory assignmentId={assignment.id} />}
          </Col>
          {/* Feedback column */}
          <Col sm={12} md={4} className="column-feedback">
            <Feedback assignment={assignment} />
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  );
};

export default Assignment;
