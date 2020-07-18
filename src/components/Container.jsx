import React from "react";
import Categories from "./Categories";

class Container extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Main Container Component</h1>
        <Categories />
        <Categories />
        <Categories />
      </div>
    );
  }
}

export default Container;
