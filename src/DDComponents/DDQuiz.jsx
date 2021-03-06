import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import DeeDee from "../images/deedee.gif";
import DJ from "../images/DJ.gif";

// import Timer from "./Timer";

const Button = styled.button`

font-family: "Orbitron", sans-serif;
cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  // background-color: this.state.selected ? #f4511e : #ffffff;
  color: black;
  border: 2px solid white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: scale(1.1);
        box-shadow: var(--diffuse-shadow);

`;
// opacity: 0.99;

const QuizBody = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 0px 0px 10px black;
`;

const Next = styled.button`
font-family: "Orbitron", sans-serif;
  display: inline-block;
  border-radius: 5px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 5rem;
  
  color: black;
  border: 2px solid white;
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: scale(1.1);
        box-shadow: var(--diffuse-shadow);
`;

const Finish = styled.button`
font-family: "Orbitron", sans-serif;
cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 6rem;
  color: black;
  border: 2px solid white;
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: scale(1.1);
        box-shadow: var(--diffuse-shadow);
`;

const QuizCapsule = styled.div`
  margin: 20px;
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  border-radius: 10px;
  align-items: center;
  box-shadow: 0px 10px 50px #555;
  background-image: url(${DeeDee});

  background-size: contain;
  background-size: 340px 340px;
  opacity: 0.88;
`;

const ResultsCapsule = styled.div`
  margin: 20px;
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  border-radius: 10px;
  align-items: center;
  box-shadow: 0px 10px 50px #555;
  background-color: #006277;
`;

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: ["True", "False"],
    score: 0,
    disabled: true,
    isEnd: false,
    quizID: 0,
    qnums: 0,
    count: 90,
    bgcolorOrSomething: "white",
  };

  wordStyle = {
    border: "2px solid black",
  };
  resultSubmit = (newRating) => {
    fetch(`http://localhost:4000/dresults/`, {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        num_correct: this.state.score,
        num_incorrect: this.state.qnums - this.state.score,
        quiz_id: this.state.quizID,
        time: this.state.count,
      }),
    })
      .then((r) => r.json())
      .then((resp) => {
        this.props.history.push("/tof");
      });
  };

  loadQuiz = () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:4000/dquizzes/${id}`)
      .then((r) => r.json())
      .then((quizPojo) => {
        this.setState({
          questions: quizPojo.dquestions[this.state.currentQuestion].q_text,
          answer: quizPojo.dquestions[this.state.currentQuestion].correct,
          qnums: quizPojo.dquestions.length,
          quizID: id,
        });
      });
  };

  componentDidMount() {
    this.loadQuiz();
    this.myInterval = setInterval(() => {
      this.setState({ count: this.state.count - 1 });
    }, 1000);
  }

  nextQuestionHandler = () => {
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1,
        disabled: true,
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
    // console.log(this.state.currentQuestion);
    // console.log(this.state.qnums);
    // console.log(this.props);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.loadQuiz();
    }
  }

  checkAnswer = (answer) => {
    this.setState({
      myAnswer: answer,
      disabled: false,
    });
  };

  finishHandler = () => {
    console.log(this.state.currentQuestion);
    console.log(this.state.qnums);
    if (this.state.currentQuestion === this.state.qnums - 1) {
      clearInterval(this.myInterval);
      this.setState({
        isEnd: true,
      });
    }
    if (this.state.myAnswer === this.state.answer) {
      this.setState({
        score: this.state.score + 1,
        disabled: !this.state.disabled,
      });
    }
  };

  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;
    const timer = this.state.count;
    if (isEnd) {
      return (
        <QuizBody>
          <ResultsCapsule>
            <h3>Great job! Your final score is {this.state.score}</h3>
            <h3>Completed with: {this.state.count} seconds left</h3>

            <Next onClick={this.resultSubmit}>Back to True or False</Next>
            <img src={DJ} alt="Dexter" width={500} />
          </ResultsCapsule>
        </QuizBody>
      );
    } else {
      return (
        <QuizBody image={DeeDee}>
          <QuizCapsule>
            <h1>{timer}</h1>
            <h3>{this.state.questions} </h3>
            <span>{`Question ${currentQuestion + 1}  out of ${
              this.state.qnums
            } `}</span>

            {options.map((option) => (
              <Button
                className="button"
                key={option}
                onClick={() => this.checkAnswer(option)}
              >
                {option}
              </Button>
            ))}
            {currentQuestion < this.state.qnums - 1 && (
              <Next
                disabled={this.state.disabled}
                onClick={this.nextQuestionHandler}
              >
                Next
              </Next>
            )}
            {/* //adding a finish button */}
            {currentQuestion === this.state.qnums - 1 && (
              <Finish onClick={this.finishHandler}>All Done</Finish>
            )}
          </QuizCapsule>
        </QuizBody>
      );
    }
  }
}

let MagicalComponent = withRouter(Quiz);
export default MagicalComponent;
