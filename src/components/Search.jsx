import React, { Component } from "react";

class Search extends Component {
  handleInput = (e) => {
    this.props.handleInputChange(e.target.value);
  };

  render() {
    return (
      <input
        placeholder="Search for..."
        onChange={this.handleInput}
        value={this.props.query}
      />
    );
  }
}

export default Search;
