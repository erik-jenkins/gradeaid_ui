import React from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import Assignment from '../Assignment';
import Course from '../Course';
import CourseList from '../Course/CourseList';
import Navbar from '../Navbar';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <Switch>
          <Route path="/courses/:courseId/assignments/:assignmentId">
            <Assignment />
          </Route>
          <Route path="/courses/:courseId/assignments">
            <p>Assignments list for a given course</p>
          </Route>
          <Route path="/courses/:courseId">
            <Course />
          </Route>
          <Route path="/courses">
            <CourseList />
          </Route>
          <Route path="/register">
            <p>User Registration</p>
          </Route>
          <Route path="/login">
            <p>User Login</p>
          </Route>
          <Route path="/">
            <Redirect to={{ pathname: '/courses' }} />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
