import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const DDtiles = (props) => {
  let quizSubmit = (id) => {
    props.history.push(`/tof/${id}`);
  };

  const ratingChanged = (newRating) => {
    fetch(`http://localhost:4000/dratings/`, {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
        "content-type": "application/json",
      },
      body: JSON.stringify({ dquiz_id: props.id, drating: newRating }),
    })
      .then((r) => r.json())
      .then(props.handleNewRating());
  };

  const [rater, setRating] = useState(false);
  // console.log(rater);

  if (!rater) {
    return (
      <div className="cattile">
        <p className="level">Level {props.level}</p>
        <button className="quiz" onClick={() => quizSubmit(props.id)}>
          Take the Quiz
        </button>
        <button className="quiz" onClick={() => setRating(!rater)}>
          Rate Me
        </button>
      </div>
    );
  } else {
    return (
      <div className="cattile">
        <p className="level">Overall Rating: {props.rating} </p>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
        />

        <button className="quiz" onClick={() => quizSubmit(props.id)}>
          Take the Quiz
        </button>
        <button className="quiz" onClick={() => setRating(!rater)}>
          Show Level
        </button>
      </div>
    );
  }
};

let MagicalComponent = withRouter(DDtiles);
export default MagicalComponent;
