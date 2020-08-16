import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createCourse } from '../../app/actions/createCourse';
import { Course } from './types';

const initialCourseState: Course = {
  id: '',
  name: '',
  description: '',
  assignmentIds: [],
};

const AddCourse = () => {
  const [courseToAdd, setCourseToAdd] = useState(initialCourseState);
  const [showAddForm, setShowAddForm] = useState(false);

  const dispatch = useDispatch();

  const onAddButtonClick = () => setShowAddForm(true);
  const onSaveButtonClick = () => {
    dispatch(createCourse({ course: courseToAdd }));
    setShowAddForm(false);
    setCourseToAdd(initialCourseState);
  };
  const onCancelButtonClick = () => setShowAddForm(false);

  const onCourseNameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setCourseToAdd({
      ...courseToAdd,
      name: e.target.value,
    });

  const onCourseDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void =>
    setCourseToAdd({
      ...courseToAdd,
      description: e.target.value,
    });

  return (
    <div className="add-course mb-3">
      {showAddForm ? (
        <Card className="add-course">
          <Card.Header>Add a new course</Card.Header>
          <Card.Body className="mb-2">
            <Form>
              <Form.Group controlId="edit-course-name">
                <Form.Label>Course name</Form.Label>
                <Form.Control
                  placeholder="Enter category name."
                  value={courseToAdd.name}
                  onChange={onCourseNameChange}
                />
              </Form.Group>
              <Form.Group controlId="edit-course-description">
                <Form.Label>Course description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter course description here."
                  value={courseToAdd.description}
                  className="edit-course-description"
                  onChange={onCourseDescriptionChange}
                />
              </Form.Group>

              <div className="edit-course-controls">
                <Button
                  variant="light mr-1"
                  size="sm"
                  onClick={onSaveButtonClick}
                >
                  Save
                </Button>
                <Button variant="light" size="sm" onClick={onCancelButtonClick}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Button variant="secondary" block onClick={onAddButtonClick}>
          Add a course
        </Button>
      )}
    </div>
  );
};

export default AddCourse;
