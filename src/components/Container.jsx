import React from "react";
import Categories from "./Categories";

class Container extends React.Component {
  state = {
    categories: [],
    ratingupdate: false,
  };

  componentDidMount() {
    this.loadContainer();
  }

  loadContainer = () => {
    fetch(`http://localhost:4000/categories`)
      .then((r) => r.json())
      .then((resp) => {
        let arr = [];
        Object.values(resp).forEach((key) => {
          arr.push(key);
        });
        this.setState({
          categories: arr,
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.ratingupdate !== prevState.ratingupdate) {
      this.loadContainer();
    }
  }

  handleNewRating = () => {
    this.setState({
      ratingupdate: !this.state.ratingupdate,
    });
    console.log(this.state.ratingupdate);
  };

  render() {
    const catBars = this.state.categories.map((catPojo, index) => {
      return (
        <Categories
          handleNewRating={this.handleNewRating}
          key={index}
          title={catPojo.name}
          quizInfo={catPojo.quizzes}
        />
      );
    });
    return (
      <div className="container">
        <div>
          <h1>Search Bar</h1>
        </div>
        <div className="catContainer">{catBars}</div>
      </div>
    );
  }
}

export default Container;
