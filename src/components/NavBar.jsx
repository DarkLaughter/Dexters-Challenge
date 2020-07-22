import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";

const Nav = styled.div`
  position: relative;

  ul.nav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: space-evenly;
    background-color: #54116e;
  }

  ul.nav li {
    float: left;
  }

  ul.nav li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  ul.nav li a:hover {
    background-color: white;
    color: #54116e;
  }
`;

function NavBar(props) {
  let handleLogout = () => {
    localStorage.token = "";
    props.history.push("/");
  };

  let token = localStorage.token;

  if (token !== "") {
    return (
      <Nav>
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
      </Nav>
    );
  } else {
    return (
      <Nav>
        <ul className="nav">
          <li>
            <NavLink to="/">Please Log In</NavLink>
          </li>
        </ul>
      </Nav>
    );
  }
}

let MagicalComponent = withRouter(NavBar);
export default MagicalComponent;
