import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
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
    <div className="assignment-header">
      {showEditAssignment ? (
        <EditAssignment
          editAssignment={editAssignment}
          setEditAssignment={setEditAssignment}
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick}
        />
      ) : (
        <>
          <div className="assignment-header-details">
            <h1>{assignment.name}</h1>
            <p className="text-muted">
              from <a href={courseUrl}>Example Course</a>
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
              className="mr-2"
              checked={showEditControls}
              onChange={onShowEditControlsClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AssignmentHeader;
