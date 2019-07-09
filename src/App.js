import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import styles from './App.module.css';
import Recipes from './BrowseRecipes/Recipes.js';
import Header from './Header/Header.js';
import NewRecipe from './AddRecipe/NewRecipe.js';
import Recipe from './Recipe/Recipe.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: '',
    }
  }

  render() {
    return (
      <Router>
        <div className={styles.App}>
          <Header currentPage = {this.state.PageType} location = {this.props.location}/>
          <Switch>
            <Route path = '/recipes' exact component = {Recipes}/>
            <Route path = '/recipes/:recipeTitle' component = {Recipe}/>
            <Route path = '/addrecipe' component = {NewRecipe}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
