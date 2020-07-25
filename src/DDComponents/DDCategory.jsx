import React from "react";
import Categorytiles from "./DDtiles";
import Mandark from "../images/md.png";

const DDCategories = (props) => {
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
        <img src={Mandark} alt="Mnadark" height="100px" />
      </div>

      {arrayOfCatTiles}
    </div>
  );
};

export default DDCategories;
