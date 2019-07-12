import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { gql } from "apollo-boost";
import ApolloClient from "apollo-boost";
import styles from './App.module.css';
import Recipes from './BrowseRecipes/Recipes.js';
import Header from './Header/Header.js';
import NewRecipe from './AddRecipe/NewRecipe.js';
import Recipe from './Recipe/Recipe.js';

const client = new ApolloClient({
  uri: "http://localhost:8000/salsa/graphql"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: '',
    }
  }
  componentDidMount() { // TODO: Make react talk to django. CORS problem? 403 forbidden error. tried corsheaders but not working yet
    console.log('wtf')
    client.query({
      query: gql`
      {
        tags {
          id
          tag
        }
        ingredients {
          id
          ingredient
        }
        categories {
          id
          category
        }
      }
      `
    }).then((data) => console.log('this is the client query: ',data));
  }

  render() {
    return (
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    );
  }
}

export default App;
