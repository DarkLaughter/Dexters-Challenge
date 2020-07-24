import React, { Component } from "react";
import styled from "styled-components";

const ProfileCard = styled.div`
  margin: 20px;
  width: 850px;
  height: 500px;
  display: flex;
  flex-basis: 30%;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 10px;
  align-items: center;
  box-shadow: 10px 10px 50px #555;
  background-color: #ffffff;
  opacity: 0.92;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const StatCard = styled.div`
  margin: 20px;
  width: 850px;
  height: 850px;
  display: flex;
  flex-basis: 30%;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 10px;
  align-items: center;
  box-shadow: 10px 10px 50px #555;
  background-color: #ffffff;
  opacity: 0.92;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

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
    avgtime: 0,
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
            totalAnscorrect: resp.user.totalAnscorrect,
            totalAnsincorrect: resp.user.totalAnsincorrect,
            questionPercentage: resp.user.questionPercentage,
            totalquestions: resp.user.totalquestions,
            avgtime: resp.user.avgTime,
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
      avgtime,
    } = this.state;
    console.log(this.state);
    if (update) {
      return (
        <div className="profileBox">
          <div className="profile-wrapper">
            <h2>Profile Information</h2>
            <form onSubmit={this.handleUpdateSubmit} noValidate>
              <div className="name">
                <label htmlFor="name">Name</label>
                <input
                  value={this.state.name}
                  name="name"
                  type="text"
                  onChange={this.handleInput}
                />
              </div>
              <div className="username">
                <label htmlFor="username">Username</label>

                <input
                  value={this.state.username}
                  name="username"
                  type="text"
                  onChange={this.handleInput}
                />
              </div>

              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  value={this.state.email}
                  name="email"
                  type="email"
                  onChange={this.handleInput}
                />
              </div>

              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  value={this.state.password}
                  name="password"
                  type="password"
                  onChange={this.handleInput}
                />
              </div>
              <button>Update</button>
              <br />
              <button onClick={this.handleUpdate}>Nevermind</button>
            </form>
          </div>

          <StatCard>
            <h1>Your Current Stats</h1>
            <h2>Quizzes</h2>
            <p>Total Number of Quizzes Taken: {totalqstaken}</p>
            <p>Total Correct Answers: {totalAnscorrect}</p>
            <p>Total Incorrect Answer: {totalAnsincorrect}</p>
            <p>Total Questions you've answered: {totalquestions}</p>
            <p>Your Trivia Percentage is: {questionPercentage}</p>
            <h2>Ratings</h2>
            <p>You've rated {numquizzesrated} of qquizzes</p>
            <p>The average Rating you've given a quiz: {avg_qrating}</p>
          </StatCard>
        </div>
      );
    } else {
      return (
        <div className="profileBox">
          <ProfileCard>
            <h2>Profile</h2>
            <h3>Name: {name}</h3>
            <h3>Username: {username}</h3>
            <h3>Email: {email}</h3>
            <button onClick={this.handleUpdate}>Update Your Information</button>
          </ProfileCard>
          <StatCard>
            <h1>Your Current Stats</h1>
            <h3>Quizzes</h3>
            <p>Total Number of Quizzes Taken: {totalqstaken}</p>
            <p>Total Correct Answers: {totalAnscorrect}</p>
            <p>Total Incorrect Answer: {totalAnsincorrect}</p>
            <p>Total Questions you've answered: {totalquestions}</p>
            <p>Avg Time Per Quiz: {avgtime} Seconds </p>
            <p>Trivia Answer Percentage is: {questionPercentage}% </p>
            <h3>Ratings</h3>
            <p>You've rated {numquizzesrated} of quizzes</p>
            <p>The average Rating you've given a quiz: {avg_qrating}</p>
          </StatCard>
        </div>
      );
    }
  }
}

export default Profile;
