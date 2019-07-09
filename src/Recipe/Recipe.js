import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      html: null,
      difficulty: null,
      heat: null,
      prepTime: null,
      rating: null,
      votes: null,
      tagline: null,
      title: null,
      yield: null,
      ingredients: [],
      ingredientsText: [],
      instructions: [],
      images: [],
      tags: []
    }
  }

  componentDidMount() {
    axios.get(`/salsa/populateRecipe/${this.props.match.params.recipeTitle}`)
      .then((data) => {
        let info = data.data
        let recipe = info.recipe[0];
        this.setState({
          category: recipe.category,
          html: recipe.custom,
          difficulty: recipe.difficulty,
          heat: recipe.heat,
          prepTime: recipe.prep_time,
          rating: recipe.rating,
          votes: recipe.votes,
          tagline: recipe.tagline,
          title: recipe.title,
          yield: recipe.yield,
          ingredients: info.ingredients,
          ingredientsText: info.ingredientsText,
          instructions: info.instructions,
          images: info.recipeImages,
          tags: info.tags
        }, () => console.log(this.state));
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div><Link to = '/recipes'>Recipes</Link> > <Link to = {`/categories/${this.state.category}`}>{this.state.category}</Link> > {this.state.title}</div>
        <header>{this.state.title}</header>
        <p>{this.state.tagline}</p>
        {this.state.votes === null ? 
        <div>No Ratings Yet</div> : 
        <div>Rating: {this.state.rating}/5, {this.state.votes} reviews total</div>}
        {this.state.images.map((image, i) => {
          return <img key = {i} src = {image.url} alt = {image.alt_tag}/>
        })}
        <header>Basic Info</header>
        <p>Heat: {this.state.heat}</p>
        <p>Yield: {this.state.yield}</p>
        <p>Difficulty: {this.state.difficulty}/10</p>
        <p>Preparation Time: {this.state.prepTime} minutes</p>
        <header>Ingredients</header>
        {this.state.ingredientsText.map((ingredient, i) => {
          return <p key = {i}>{ingredient.text}</p>
        })}
        <header>Instructions</header>
        {this.state.instructions.map((instruction, i) => {
          return <p key = {i}>{instruction.step_number}: {instruction.text}</p>
        })}
        <header>Tags</header>
        {this.state.tags.map((tag, i) => {
          return <button key = {i}>{tag.tag}</button>
        })}
      </div>
    )
  }
}

export default Recipe;