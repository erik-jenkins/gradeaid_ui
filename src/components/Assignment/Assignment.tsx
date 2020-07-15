import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CategoryList from '../CategoryList';
import './Assignment.scss';

const Assignment = () => {
  return (
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
        <Col sm={12} md={8}>
          <CategoryList />
        </Col>
        {/* Feedback column */}
        <Col sm={12} md={4}>
          <Row>
            <Col className="feedback-controls">
              <Button variant="primary" id="copy-button">
                Copy
              </Button>
              <Button variant="danger" id="reset-button">
                Reset
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Assignment;
