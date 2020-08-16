import React, { useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import AddCourse from './AddCourse';

const CourseList = () => {
  const courses = useSelector((state: RootState) =>
    state.courses.allIds.map((courseId) => state.courses.coursesById[courseId])
  );

  const [showEditControls, setShowEditControls] = useState(false);
  const onShowEditControlsClick = () => {
    setShowEditControls(!showEditControls);
  };

  return (
    <Container className="courselist-container p-0">
      <Row>
        <Col sm={12}>
          <div className="d-flex justify-content-between align-items-end">
            <h1 className="m-0">Courses</h1>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Show edit controls"
              className="mr-2 mt-1"
              checked={showEditControls}
              onChange={onShowEditControlsClick}
            />
          </div>
          <hr />
        </Col>
      </Row>
      <Row>
        {/* Search/filter sidebar */}
        <Col sm={12} md={4}>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Search for a course" />
            </Form.Group>
          </Form>
        </Col>
        {/* Course list */}
        <Col sm={12} md={8}>
          <ListGroup>
            {courses.map((course) => (
              <div key={course.id} className="d-flex mb-1">
                <ListGroup.Item
                  action
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="mr-1"
                >
                  {course.name}
                </ListGroup.Item>
                {showEditControls && (
                  <div className="edit-controls d-flex">
                    <Button variant="secondary" size="sm" className="mr-1">
                      Duplicate
                    </Button>
                    <Button variant="secondary" size="sm">
                      Archive
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </ListGroup>
          {showEditControls && <AddCourse />}
        </Col>
      </Row>
    </Container>
  );
};

export default CourseList;
