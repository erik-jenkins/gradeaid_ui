import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Assignment from '../Assignment';
import Navbar from '../Navbar';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <Switch>
          <Route path="/courses/:courseId/assignments/:assignmentId">
            <Assignment id="assignment-1" courseId="course-1" />
          </Route>
          <Route path="/courses/:courseId/assignments">
            <p>Assignments list for a given course</p>
          </Route>
          <Route path="/courses/:courseId">
            <p>Details for a given course</p>
          </Route>
          <Route path="/courses">
            <p>Course List</p>
          </Route>
          <Route path="/register">
            <p>User Registration</p>
          </Route>
          <Route path="/login">
            <p>User Login</p>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
