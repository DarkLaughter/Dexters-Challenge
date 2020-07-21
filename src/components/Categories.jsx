import React from "react";
import Categorytiles from "./Categorytiles";

const Categories = (props) => {
  const arrayOfCatTiles = props.quizInfo.map((quizPojo, index) => {
    return (
      <Categorytiles
        handleNewRating={props.handleNewRating}
        key={index}
        id={quizPojo.id}
        level={quizPojo.level}
        rating={quizPojo.quizratings}
      />
    );
  });
  return (
    <div className="catrow">
      <div className="catName">
        <h3>{props.title}</h3>
      </div>

      {arrayOfCatTiles}
    </div>
  );
};

export default Categories;
