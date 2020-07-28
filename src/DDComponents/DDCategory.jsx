import React from "react";
import DDCategorytiles from "./DDtiles";
import Deedee from "../images/deedee.png";

const DDCategories = (props) => {
  const arrayOfCatTiles = props.quizInfo.map((quizPojo, index) => {
    return (
      <DDCategorytiles
        handleNewRating={props.handleNewRating}
        key={index}
        id={quizPojo.id}
        level={quizPojo.level}
        rating={quizPojo.dquizratings}
      />
    );
  });

  return (
    <div className="catrow">
      <div className="catName">
        <h3>{props.title}</h3>
        <img src={Deedee} alt="Mnadark" height="100px" />
      </div>

      {arrayOfCatTiles}
    </div>
  );
};

export default DDCategories;
