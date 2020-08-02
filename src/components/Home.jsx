import React from "react";
import Signup from "./Signup";
import { bounce } from "react-animations";
import styled, { keyframes } from "styled-components";
import Squad from "../images/squad.jpg";

const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`} infinite;
`;

const squadStyle = {
  width: "475px",
  height: "250px",
};

const Home = () => (
  <div>
    <Signup />
  </div>
);

export default Home;
