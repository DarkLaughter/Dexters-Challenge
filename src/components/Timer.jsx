import React, { Component } from "react";

class Timer extends Component {
  state = {
    count: 90,
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState({ count: this.state.count - 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    console.log(this.myInterval);
    const time = this.state.count;

    return (
      <div>
        <h3>Seconds Left: {time}</h3>
      </div>
    );
  }
}

export default Timer;
