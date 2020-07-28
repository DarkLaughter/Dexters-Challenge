import React from "react";
import DDCategories from "./DDCategory";
import DDSearch from "./DDSearch";

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
    fetch(`http://localhost:4000/dcategories`)
      .then((r) => r.json())
      .then((resp) => {
        this.setState({
          categories: resp,
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
    // console.log(this.state.ratingupdate);
  };

  render() {
    let catArray = this.returnArray();
    const catBars = catArray.map((catPojo) => {
      return (
        <DDCategories
          handleNewRating={this.handleNewRating}
          key={catPojo.id}
          title={catPojo.name}
          quizInfo={catPojo.dquizzes}
        />
      );
    });
    return (
      <div className="container">
        <div className="search">
          <DDSearch
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
