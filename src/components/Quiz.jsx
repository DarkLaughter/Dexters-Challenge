import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: black;
  border: 2px solid Black;
`;

const QuizBody = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Next = styled.button`
  display: inline-block;
  border-radius: 20px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 5rem;
  background: #54116e;
  color: white;
  border: 2px solid white;
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
  background-color: #ffffff;
`;

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
    quizID: 0,
    qnums: 0,
  };

  resultSubmit = (newRating) => {
    fetch(`http://localhost:4000/results/`, {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        num_correct: this.state.score,
        num_incorrect: this.state.qnums - this.state.score,
        quiz_id: this.state.quizID,
      }),
    })
      .then((r) => r.json())
      .then((resp) => {
        this.props.history.push("/quizzes");
      });
  };

  loadQuiz = () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:4000/quizzes/${id}`)
      .then((r) => r.json())
      .then((quizPojo) => {
        let arr = [];
        arr.push(
          quizPojo.questions[this.state.currentQuestion].correct,
          quizPojo.questions[this.state.currentQuestion].incorrect1,
          quizPojo.questions[this.state.currentQuestion].incorrect2,
          quizPojo.questions[this.state.currentQuestion].incorrect3
        );

        arr = arr.sort(() => Math.random() - 0.5);

        this.setState({
          questions: quizPojo.questions[this.state.currentQuestion].q_text,
          answer: quizPojo.questions[this.state.currentQuestion].correct,
          qnums: quizPojo.questions.length,
          options: arr,
          quizID: id,
        });
      });
  };

  componentDidMount() {
    this.loadQuiz();
  }

  nextQuestionHandler = () => {
    // console.log('test')
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
  //check answer
  checkAnswer = (answer) => {
    this.setState({ myAnswer: answer, disabled: false });
  };

  finishHandler = () => {
    console.log(this.state.currentQuestion);
    console.log(this.state.qnums);
    if (this.state.currentQuestion === this.state.qnums - 1) {
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
    if (isEnd) {
      return (
        <QuizBody>
          <QuizCapsule>
            <h3>Game Over your Final score is {this.state.score} points </h3>
            <button onClick={this.resultSubmit}>Back to Quizzes</button>
          </QuizCapsule>
        </QuizBody>
      );
    } else {
      return (
        <QuizBody>
          <QuizCapsule>
            <h3>{this.state.questions} </h3>
            <span>{`Question ${currentQuestion + 1}  out of ${
              this.state.qnums
            } `}</span>

            {options.map((option) => (
              <Button
                key={option}
                className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
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
              <button className="" onClick={this.finishHandler}>
                Finish
              </button>
            )}
          </QuizCapsule>
        </QuizBody>
      );
    }
  }
}

let MagicalComponent = withRouter(Quiz);
export default MagicalComponent;
