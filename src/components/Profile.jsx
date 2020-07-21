import React, { Component } from "react";

class Profile extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    update: false,
    id: 0,
    numquizzesrated: 0,
    avg_qrating: 0,
    totalqstaken: 0,
    totalAnscorrect: 0,
    totalAnsincorrect: 0,
    questionPercentage: 0,
    totalquestions: 0,
  };

  handleUpdateSubmit = (e) => {
    fetch(`http://localhost:4000/users/${this.state.id}`, {
      method: "PATCH",
      headers: {
        Authorization: localStorage.token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((r) => r.json())
      .then((resp) => {
        this.setState({
          name: resp.user.name,
          username: resp.user.username,
          email: resp.user.email,
          id: resp.user.id,
        });
      });
  };

  handleUpdate = () => {
    this.setState({
      update: !this.state.update,
    });
    console.log(this.state.update);
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    console.log(e.target.name);
    console.log(e.target.value);
  };

  componentDidMount() {
    if (localStorage.token) {
      fetch("http://localhost:4000/users/stay_logged_in", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((r) => r.json())
        .then((resp) => {
          console.log(resp);
          this.setState({
            name: resp.user.name,
            username: resp.user.username,
            email: resp.user.email,
            id: resp.user.id,
            numquizzesrated: resp.user.numquizzesrated,
            avg_qrating: resp.user.avg_qrating,
            totalqstaken: resp.user.totalqstaken,
            totalAnscorrect: resp.user.totalAnsincorrect,
            totalAnsincorrect: resp.user.totalAnsincorrect,
            questionPercentage: resp.user.questionPercentage,
            totalquestions: resp.user.totalquestions,
          });
        });
    }
  }
  render() {
    const {
      name,
      username,
      email,
      update,
      numquizzesrated,
      avg_qrating,
      totalqstaken,
      totalAnscorrect,
      totalAnsincorrect,
      questionPercentage,
      totalquestions,
    } = this.state;

    if (update) {
      return (
        <>
          <div>
            <h1>Stats Card</h1>
            <form>
              <label>Name</label>
              <input
                value={this.state.name}
                name="name"
                type="text"
                onChange={this.handleInput}
              />
              <label>Username</label>
              <input
                value={this.state.username}
                name="username"
                type="text"
                onChange={this.handleInput}
              />

              <label>Email</label>
              <input
                value={this.state.email}
                name="email"
                type="email"
                onChange={this.handleInput}
              />

              <label>Password</label>
              <input
                value={this.state.password}
                name="password"
                type="password"
                onChange={this.handleInput}
              />

              <button onClick={this.handleUpdateSubmit}>Update</button>
              <button onClick={this.handleUpdate}>Nevermind</button>
            </form>
          </div>
          <div>
            <h1>Your Current Stats</h1>
            <h3>Quizzes</h3>
            <p>Total Number of Quizzes Taken: {totalqstaken}</p>
            <p>Total Correct Answers: {totalAnscorrect}</p>
            <p>Total Incorrect Answer: {totalAnsincorrect}</p>
            <p>Total Questions you've answered: {totalquestions}</p>
            <p>Your Overall Percentage is: {questionPercentage}</p>
            <h3>Ratings</h3>
            <p>You've rated {numquizzesrated} of qquizzes</p>
            <p>The average Rating you've given a quiz: {avg_qrating}</p>
          </div>
        </>
      );
    } else {
      return (
        <div className="profileBox">
          <div>
            <h1>Profile</h1>
            <h1>Name:{name}</h1>
            <h1>Username:{username}</h1>
            <h1>Email:{email}</h1>
            <button onClick={this.handleUpdate}>Update Your Information</button>
          </div>
          <div>
            <h1>Your Current Stats</h1>
            <h3>Quizzes</h3>
            <p>Total Number of Quizzes Taken: {totalqstaken}</p>
            <p>Total Correct Answers: {totalAnscorrect}</p>
            <p>Total Incorrect Answer: {totalAnsincorrect}</p>
            <p>Total Questions you've answered: {totalquestions}</p>
            <p>Your Overall Percentage is: {questionPercentage}% </p>
            <h3>Ratings</h3>
            <p>You've rated {numquizzesrated} of quizzes</p>
            <p>The average Rating you've given a quiz: {avg_qrating}</p>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
