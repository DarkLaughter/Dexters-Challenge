import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";

class App extends React.Component {
  // renderForm = (routerProps) => {
  //   if (routerProps.location.pathname === "/login") {
  //     return (
  //       <Form formName="Login Form" handleSubmit={this.handleLoginSubmit} />
  //     );
  //   } else if (routerProps.location.pathname === "/register") {
  //     return (
  //       <Form
  //         formName="Register Form"
  //         handleSubmit={this.handleRegisterSubmit}
  //       />
  //     );
  //   }
  // };
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/quizzes/:id" component={Quiz} />
          <Route exact path="/quizzes" component={Container} />
          <Route exact path="/profile" component={Profile} />
          <Route render={() => <p>Page Not Found</p>} />
        </Switch>
      </div>
    );
  }
}

export default App;
