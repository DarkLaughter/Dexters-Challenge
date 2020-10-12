import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

class Form extends Component {
  state = {
    hasaccount: false,
    name: null,
    username: null,
    email: null,
    password: null,
    formErrors: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  };

  loginSubmit = (e) => {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((r) => r.json())
      .then(this.handleResponse);
  };

  createSubmit = (e) => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((r) => r.json())
      .then(this.handleResponse);
  };

  handleResponse = (resp) => {
    if (resp.user) {
      localStorage.token = resp.token;
      this.setState(resp, () => {
        this.props.history.push("/profile");
      });
    } else {
      alert(resp.error);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((r) => r.json())
        .then(console.log);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  hasLogin = () => {
    this.setState({
      hasaccount: !this.state.hasaccount,
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "username":
        formErrors.username =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    if (this.state.hasaccount) {
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h2> Login </h2>
            <div className="loginName">
              <label htmlFor="username">Username</label>
              <input
                className={formErrors.username.length > 0 ? "error" : null}
                placeholder="Username"
                type="text"
                name="username"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
            <div className="createAccount">
              <button onClick={this.loginSubmit}>Log In </button>
              <Link onClick={this.hasLogin}>Click Here to Sign Up</Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h2>Sign Up</h2>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="name">
                <label htmlFor="name">Name</label>
                <input
                  className={formErrors.name.length > 0 ? "error" : null}
                  placeholder="Name"
                  type="text"
                  name="name"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.name.length > 0 && (
                  <span className="errorMessage">{formErrors.name}</span>
                )}
              </div>
              <div className="username">
                <label htmlFor="username">Username</label>
                <input
                  className={formErrors.username.length > 0 ? "error" : null}
                  placeholder="Username"
                  type="text"
                  name="username"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.username.length > 0 && (
                  <span className="errorMessage">{formErrors.username}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  placeholder="Email"
                  type="email"
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  className={formErrors.password.length > 0 ? "error" : null}
                  placeholder="Password"
                  type="password"
                  name="password"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>
              <div className="createAccount">
                <button type="submit" onClick={this.createSubmit}>
                  Create Account
                </button>
                <Link onClick={this.hasLogin}>Click Here to Log In</Link>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

let MagicalComponent = withRouter(Form);
export default MagicalComponent;
