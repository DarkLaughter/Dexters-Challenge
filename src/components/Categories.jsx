import React from "react";
import Categorytiles from "./Categorytiles";

const Categories = () => {
  return (
    <div className="catrow">
      <div className="cattile">
        <h3>Category Container</h3>
      </div>
      <Categorytiles />
      <Categorytiles />
      <Categorytiles />
    </div>
  );
};

export default Categories;
