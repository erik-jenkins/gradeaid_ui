import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../app/store';

const Course = () => {
  const { courseId } = useParams();

  const course = useSelector(
    (state: RootState) => state.courses.coursesById[courseId]
  );

  const assignments = useSelector((state: RootState) =>
    course.assignmentIds.map((id) => state.assignments.assignmentsById[id])
  );

  return (
    <Container className="course-container p-0">
      <Row>
        <Col>
          <h1 className="mb-0">{course.name}</h1>
          <p className="text-muted">
            return to <a href="/">Course List</a>
          </p>
          <hr />
        </Col>
      </Row>
      <Row>
        {/* Sidebar with description */}
        <Col sm={12} md={4}>
          <p>{course.description}</p>
        </Col>
        {/* Assignment list */}
        <Col sm={12} md={8}>
          <ListGroup>
            {assignments.map((assignment, index) => (
              <ListGroup.Item
                key={index}
                action
                href={`/courses/${courseId}/assignments/${assignment.id}`}
              >
                {assignment.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Course;
