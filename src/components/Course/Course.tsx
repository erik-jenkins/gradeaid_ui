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
    <Container className="course-container">
      <Row>
        {/* Sidebar with description */}
        <Col sm={12} md={4}>
          <h1>{course.name}</h1>
          <hr />
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
