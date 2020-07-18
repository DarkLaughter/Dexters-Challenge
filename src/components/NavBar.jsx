import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavBar(props) {
  return (
    <header>
      <h1>Hello</h1>
      <ul className="nav">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/quizzes">Quizzes</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </header>
  );
}

export default NavBar;
