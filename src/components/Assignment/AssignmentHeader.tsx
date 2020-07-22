import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateAssignment } from './assignmentsSlice';
import EditAssignment from './EditAssignment';
import { Assignment } from './types';

interface AssignmentHeaderProps {
  assignment: Assignment;
  courseId: string;
}

const AssignmentHeader = ({ assignment, courseId }: AssignmentHeaderProps) => {
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
            <Button variant="warning" size="sm" onClick={onEditClick}>
              Edit
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AssignmentHeader;
