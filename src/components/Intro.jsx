import React from "react";
import { withRouter } from "react-router-dom";
import { bounce } from "react-animations";
import styled, { keyframes } from "styled-components";

import Dexter from "../images/dexter.gif";

const Bounce = styled.div`
  color: rgb(179, 62, 11);
  font-size: 50px;
  animation: 2s ${keyframes`${bounce}`} infinite;
`;

class Intro extends React.Component {
  handleHomepage = () => {
    this.props.history.push("/home");
  };

  render() {
    return (
      <div className="wrapper">
        <div className="Intro">
          <Bounce>Welcome to Dexter's Challenge</Bounce>

          <img src={Dexter} />
          <button className="quiz" onClick={this.handleHomepage}>
            Click to get Started
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Intro);
