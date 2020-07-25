import React from "react";
import Categories from "./Categories";
import Search from "./Search";

class DDContainer extends React.Component {
  state = {
    categories: [],
    ratingupdate: false,
    query: "",
  };

  handleInputChange = (searchText) => {
    this.setState({
      query: searchText,
    });
  };

  returnArray = () => {
    let array = this.state.categories.filter((cat) =>
      cat.name.toLowerCase().includes(this.state.query.toLowerCase())
    );
    return array;
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
    let catArray = this.returnArray();
    const catBars = catArray.map((catPojo, index) => {
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
        <div className="search">
          <Search
            handleInputChange={this.handleInputChange}
            query={this.state.query}
          />
        </div>
        <div className="catContainer">{catBars}</div>
      </div>
    );
  }
}

export default DDContainer;
