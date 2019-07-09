import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    }
  }

  componentDidMount() {
    axios.get('/salsa/getRecipes')
      .then((data) => {
        let recipes = data.data.rows;
        console.log(recipes);
        this.setState({recipes: recipes})
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        {this.state.recipes.map((recipe, i) => {
          return (
            <div key = {i}>
              <Link
                to = {`/recipes/${recipe.title}`} >
                {recipe.title}
              </Link>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Recipes;