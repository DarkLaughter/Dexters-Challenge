import React from "react";

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

  loadQuiz = () => {
    const id = this.props.match.params.id;
    let arr = [];
    fetch(`http://localhost:3000/quizzes/${id}`)
      .then((r) => r.json())
      .then((quizPojo) => {
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
        });
      });
  };

  componentDidMount() {
    this.loadQuiz();
    debugger;
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
    console.log(this.state.currentQuestion);
    console.log(this.state.qnums);
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
      });
    }
  };
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;
    if (isEnd) {
      return (
        <div className="">
          <h3>Game Over your Final score is {this.state.score} points </h3>
          {/* <div>
            The correct answer's for the questions was
            <ul>
              {quizData.map((item, index) => (
                <li className="ui floating message options" key={index}>
                  {item.answer}
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      );
    } else {
      return (
        <div>
          <h1>{this.state.questions} </h1>
          <span>{`Questions ${currentQuestion}  out of ${this.state.qnums} remaining `}</span>

          {options.map((option) => (
            <p
              key={option}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < this.state.qnums - 1 && (
            <button
              className=""
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {/* //adding a finish button */}
          {currentQuestion === this.state.qnums - 1 && (
            <button className="" onClick={this.finishHandler}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}

export default Quiz;
