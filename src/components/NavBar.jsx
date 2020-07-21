import React from "react";

import { NavLink, withRouter } from "react-router-dom";

function NavBar(props) {
  let handleLogout = () => {
    localStorage.token = "";
    props.history.push("/");
  };

  let token = localStorage.token;

  if (token !== "") {
    return (
      <div className="Navbar">
        <ul className="nav">
          <li>LOGO</li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/quizzes">Quizzes</NavLink>
          </li>
          <li>
            <NavLink onClick={() => handleLogout()} to="">
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="Navbar">
        <ul className="nav">
          <li>
            <NavLink to="/">Please Log In</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

let MagicalComponent = withRouter(NavBar);
export default MagicalComponent;
