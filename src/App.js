import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import NotFound from "./components/NotFound";
import styled from "styled-components";
import DDContainer from "./DDComponents/DDContainer";
import DDQuiz from "./DDComponents/DDQuiz";

const APP = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

class App extends React.Component {
  render() {
    return (
      <APP>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500&family=Ranchers&display=swap');
        </style>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/quizzes/:id" component={Quiz} />
          <Route exact path="/quizzes" component={Container} />
          <Route exact path="/tof/:id" component={DDQuiz} />
          <Route exact path="/tof" component={DDContainer} />
          <Route exact path="/profile" component={Profile} />
          <Route render={() => <NotFound />} />
        </Switch>
      </APP>
    );
  }
}

export default App;
