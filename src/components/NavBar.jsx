import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import Dexter from "../images/dex.png";
import Logo from "../images/dexterlogo.png";

const Nav = styled.div`
  ul.nav {
    list-style-type: none;
    width: 100%;
    margin: 0px;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: space-evenly;
    background-color: #006277;
  }

  ul.nav li {
    margin-top: 15px;
    float: left;
  }

  ul.nav li a {
    display: block;
    border-radius: 5px;
    color: #a3cf65;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  ul.nav li a:hover {
    background-color: white;
    color: #a3cf65;
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
          <img src={Dexter} alt="Dexter" height="80px" />
          <img src={Logo} alt="Moogle" height="80px" />
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/quizzes">Mandark's Quizzes</NavLink>
          </li>
          <li>
            <NavLink to="/tof">Dee Dee's True-or-False</NavLink>
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
            <img src={Dexter} alt="" height="80px" />
            <img src={Logo} alt="Moogle" height="80px" />
            {/* <NavLink to="/">Please Log In</NavLink> */}
          </li>
        </ul>
      </Nav>
    );
  }
}

let MagicalComponent = withRouter(NavBar);
export default MagicalComponent;
