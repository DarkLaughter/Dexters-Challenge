import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import NotFound from "./components/NotFound";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/quizzes/:id" component={Quiz} />
          <Route exact path="/quizzes" component={Container} />
          <Route exact path="/profile" component={Profile} />
          <Route render={() => <NotFound />} />
        </Switch>
      </div>
    );
  }
}

export default App;
