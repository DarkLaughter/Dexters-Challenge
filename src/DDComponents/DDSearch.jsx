import React, { Component } from "react";

class Search extends Component {
  handleInput = (e) => {
    this.props.handleInputChange(e.target.value);
  };

  searchStyle = {
    width: "50%",
    margin: "10px",
    padding: "18px 10px",
    borderradius: "1000px",
    border: "1px solid black",
    boxshadow: "1px 0.5px #888888",
    fontsize: "18px",
    fontFamily: "Orbitron",
  };

  render() {
    return (
      <div className="searchBar">
        <input
          style={this.searchStyle}
          placeholder="Search Categories..."
          onChange={this.handleInput}
          value={this.props.query}
        />
      </div>
    );
  }
}

export default Search;
