import React, { Component } from "react";
import styled from "styled-components";

const ProfileCard = styled.div`
  margin: 20px;
  width: 700px;
  height: 500px;
  display: flex;
  flex-basis: 25%;
  flex-direction: column;

  border-radius: 10px;
  align-items: center;
  box-shadow: 10px 10px 50px #555;
  background-color: #ffffff;
  opacity: 0.92;
  font-family: "Orbitron", sans-serif;
  padding: 30px;
`;

const StatCard = styled.div`
  margin: 20px;
  width: 700px;
  height: 1000px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
  box-shadow: 10px 10px 50px #555;
  background-color: #ffffff;
  opacity: 0.92;
  font-family: "Orbitron", sans-serif;
  padding: 30px;
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
    dnumquizzesrated: 0,
    davg_qrating: 0,
    dtotalqstaken: 0,
    dtotalAnscorrect: 0,
    dtotalAnsincorrect: 0,
    dquestionPercentage: 0,
    dtotalquestions: 0,
    davgtime: 0,
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

            dnumquizzesrated: resp.user.dnumquizzesrated,
            davg_qrating: resp.user.avg_qrating,
            dtotalqstaken: resp.user.dtotalqstaken,
            dtotalAnscorrect: resp.user.dtotalAnscorrect,
            dtotalAnsincorrect: resp.user.dtotalAnsincorrect,
            dquestionPercentage: resp.user.dquestionPercentage,
            dtotalquestions: resp.user.dtotalquestions,
            davgtime: resp.user.davgTime,
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
      dnumquizzesrated,
      davg_qrating,
      dtotalqstaken,
      dtotalAnscorrect,
      dtotalAnsincorrect,
      dquestionPercentage,
      dtotalquestions,
      davgtime,
    } = this.state;
    console.log(this.state);
    if (update) {
      return (
        <div className="appBody">
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
              <button className="quiz">Update</button>
              <br />
              <button className="quiz" onClick={this.handleUpdate}>
                Nevermind
              </button>
            </form>
          </div>
          <StatCard>
            <div className="statsBox">
              <h4>Your Current Stats</h4>
              <h4>Mandark's Quiz</h4>
              <p>Total Number of Quizzes Taken: {totalqstaken}</p>
              <p>Total Correct Answers: {totalAnscorrect}</p>
              <p>Total Incorrect Answer: {totalAnsincorrect}</p>
              <p>Total Questions you've answered: {totalquestions}</p>
              <p>Avg Time Per Quiz: {avgtime} Seconds </p>
              <p>Percentage of correct answers: {questionPercentage}% </p>
              <h4>Rating's for Mandark's Quizzes</h4>
              <p>You've rated {numquizzesrated} True or False</p>
              <p>The average Rating you've given: {avg_qrating} Stars</p>

              <h4>Dee Dee's True or False Quiz</h4>
              <p>Total Number of True or False Taken: {dtotalqstaken}</p>
              <p>Total Correct Answers: {dtotalAnscorrect}</p>
              <p>Total Incorrect Answer: {dtotalAnsincorrect}</p>
              <p>Total Questions you've answered: {dtotalquestions}</p>
              <p>Avg Time Per True or False: {davgtime} Seconds </p>
              <p>Percentage of correct answers: {dquestionPercentage}% </p>
              <h4>Rating's for Dee Dee's True or False</h4>
              <p>You've rated {dnumquizzesrated} of quizzes</p>
              <p>The average Rating you've given is {davg_qrating}</p>
            </div>
          </StatCard>
        </div>
      );
    } else {
      return (
        <div className="profileBox">
          <ProfileCard>
            <h4>Profile</h4>
            <p>Name: {name}</p>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <button className="quiz" onClick={this.handleUpdate}>
              Update Your Information
            </button>
          </ProfileCard>
          <StatCard>
            <h4>Your Current Stats</h4>
            <h4>Mandark's Quiz</h4>
            <p>Total Number of Quizzes Taken: {totalqstaken}</p>
            <p>Total Correct Answers: {totalAnscorrect}</p>
            <p>Total Incorrect Answer: {totalAnsincorrect}</p>
            <p>Total Questions you've answered: {totalquestions}</p>
            <p>Avg Time Per Quiz: {avgtime} Seconds </p>
            <p>Percentage of corect answers: {questionPercentage}% </p>
            <h4>Rating's for Mandark's Quizzes</h4>
            <p>You've rated {numquizzesrated} of Mandark's quizzes</p>
            <p>The average Rating you've given: {avg_qrating} Stars</p>

            <h4>Dee Dee's True or False Quiz</h4>
            <p>Total Number of True or False Quizzes Taken: {dtotalqstaken}</p>
            <p>Total Correct Answers: {dtotalAnscorrect}</p>
            <p>Total Incorrect Answer: {dtotalAnsincorrect}</p>
            <p>Total Questions you've answered: {dtotalquestions}</p>
            <p>Avg Time Per True or False: {davgtime} Seconds </p>
            <p>Percentage of corect answers:: {dquestionPercentage}% </p>
            <h4>Rating's for Dee Dee's True or False</h4>
            <p>You've rated {dnumquizzesrated} of True or False Quizzes</p>
            <p>The average Rating you've given: {davg_qrating} Stars</p>
          </StatCard>
        </div>
      );
    }
  }
}

export default Profile;
