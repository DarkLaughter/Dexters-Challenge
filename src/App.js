import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import NotFound from "./components/NotFound";
import styled from "styled-components";

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
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/quizzes/:id" component={Quiz} />
          <Route exact path="/quizzes" component={Container} />
          <Route exact path="/profile" component={Profile} />
          <Route render={() => <NotFound />} />
        </Switch>
      </APP>
    );
  }
}

export default App;
