import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import './AssignmentHeader.scss';
import { updateAssignment } from './assignmentsSlice';
import EditAssignment from './EditAssignment';
import { Assignment } from './types';

interface AssignmentHeaderProps {
  assignment: Assignment;
  courseId: string;
  showEditControls: boolean;
  onShowEditControlsClick: () => void;
}

const AssignmentHeader = ({
  assignment,
  courseId,
  showEditControls,
  onShowEditControlsClick,
}: AssignmentHeaderProps) => {
  const [editAssignment, setEditAssignment] = useState(assignment);
  const [showEditAssignment, setShowEditAssignment] = useState(false);
  const dispatch = useDispatch();

  const courseName = useSelector(
    (state: RootState) => state.courses.coursesById[courseId].name
  );
  const courseUrl = `/courses/${courseId.replace('course-', '')}`;

  const onEditClick = () => setShowEditAssignment(true);

  const onSaveClick = () => {
    dispatch(updateAssignment(editAssignment));
    setShowEditAssignment(false);
  };

  const onCancelClick = () => {
    // TODO - confirm want to cancel when dirty
    setEditAssignment(assignment);
    setShowEditAssignment(false);
  };

  return (
    <>
      <div className="assignment-header">
        <div className="assignment-header-details">
          <h1>{assignment.name}</h1>
          <p className="text-muted">
            from <a href={courseUrl}>{courseName}</a>
          </p>
        </div>
        <div className="assignment-header-controls">
          {showEditControls && (
            <Button variant="light" size="sm" onClick={onEditClick}>
              Edit assignment
            </Button>
          )}
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Show edit controls"
            className="mr-2 mt-1"
            checked={showEditControls}
            onChange={onShowEditControlsClick}
          />
        </div>
      </div>
      <div className="edit-assignment-form mt-1 mb-1">
        {showEditAssignment && (
          <EditAssignment
            editAssignment={editAssignment}
            setEditAssignment={setEditAssignment}
            onSaveClick={onSaveClick}
            onCancelClick={onCancelClick}
          />
        )}
      </div>
    </>
  );
};

export default AssignmentHeader;
