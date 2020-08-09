import React from 'react';
import { Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const CourseList = () => {
  const courses = useSelector((state: RootState) =>
    state.courses.allIds.map((courseId) => state.courses.coursesById[courseId])
  );

  return (
    <Container className="courselist-container">
      <Row>
        {/* Search/filter sidebar */}
        <Col sm={12} md={4}>
          <Form>
            <Form.Group>
              <Form.Label>Search for a course</Form.Label>
              <Form.Control type="text" placeholder="Begin typing to search" />
            </Form.Group>
          </Form>
        </Col>
        {/* Course list */}
        <Col sm={12} md={8}>
          <ListGroup>
            {courses.map((course) => (
              <ListGroup.Item
                action
                key={course.id}
                href={`/courses/${course.id}`}
              >
                {course.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseList;
