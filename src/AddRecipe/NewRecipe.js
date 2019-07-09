import React, { Component } from 'react';
import axios from 'axios';
import styles from './NewRecipe.module.css';
import Categories from './Categories.js';
import Tags from './Tags.js';
import AddCategory from './AddCategory.js';
import AddTag from './AddTag.js'
import Ingredients from './Ingredients.js';
import AddIngredient from './AddIngredient.js';
import AddInstruction from './AddInstruction.js';
import AddRecipeImage from './AddRecipeImage.js';
import AddIngredientsText from './AddIngredientsText.js'

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      tagLine: '',
      recipeImages: [],
      availableIngredients: [],
      availableCategories: [],
      availableTags: [],
      instructions: [],
      ingredientsText: [],
      category: '',
      tags: [],
      ingredients: [],
      heat: '1',
      yield: '',
      difficulty: '1',
      prepTime: '',
      html: '',
    }
    this.titleChange = this.titleChange.bind(this);
    this.refreshTags = this.refreshTags.bind(this);
    this.refreshCategories = this.refreshCategories.bind(this);
    this.refreshIngredients = this.refreshIngredients.bind(this);
    this.tagLineChange = this.tagLineChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.heatChange = this.heatChange.bind(this);
    this.yieldChange = this.yieldChange.bind(this);
    this.difficultyChange = this.difficultyChange.bind(this);
    this.prepTimeChange = this.prepTimeChange.bind(this);
    this.selectTag = this.selectTag.bind(this);
    this.selectIngredient = this.selectIngredient.bind(this);
    this.addImage = this.addImage.bind(this);
    this.htmlChange = this.htmlChange.bind(this);
    this.addInstruction = this.addInstruction.bind(this);
    this.addIngredientsText = this.addIngredientsText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //server request to populate available categories and available tags.
    this.refreshTags();
    this.refreshCategories();
    this.refreshIngredients();
  }

  refreshTags() {
    axios.get('/salsa/handleTags')
      .then((res) => {
        this.setState({availableTags: res.data.rows})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  refreshCategories() {
    axios.get('/salsa/handleCategories')
      .then((res) => {
        let arr = [{category: 'Select Category'}]
        let newArr = arr.concat(res.data.rows)
        this.setState({availableCategories: newArr})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  refreshIngredients() {
    axios.get('/salsa/handleIngredients')
      .then((res) => {
        let arr = res.data.rows;
        this.setState({availableIngredients: arr})
      })
      .catch((err) => {
        console.log(err)
      });
  }
  
  titleChange(e) {
    this.setState({recipeName: e.target.value});
  }

  tagLineChange(e) {
    this.setState({tagLine: e.target.value});
  }

  categoryChange(e) {
    let category = this.state.availableCategories[e.target.value]
    this.setState({category: category})
  }

  heatChange(e) {
    this.setState({heat: e.target.value})
  }

  yieldChange(e) {
    this.setState({yield: e.target.value})
  }

  difficultyChange(e) {
    this.setState({difficulty: e.target.value})
  }

  prepTimeChange(e) {
    this.setState({prepTime: e.target.value})
  }

  htmlChange(e) {
    this.setState({html: e.target.value})
  }

  selectTag(e) {
    let arr = this.state.tags.slice();
    let check = false;
    let index
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === e.target.value) {
        check = true;
        index = i
        break;
      }
    }
    if (check) {
      arr.splice(index, 1);
    } else {
      arr.push(e.target.value);
    }
    this.setState({
      tags: arr
    });
  }

  selectIngredient(e) {
    let arr = this.state.ingredients.slice();
    let check = false;
    let index
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === e.target.value) {
        check = true;
        index = i
        break;
      }
    }
    if (check) {
      arr.splice(index, 1);
    } else {
      arr.push(e.target.value);
    }
    this.setState({
      ingredients: arr
    });
  }

  addImage(obj) {
    console.log('this is obj: ', obj)
    let arr = this.state.recipeImages.concat([obj]);
    this.setState({recipeImages: arr});
  }

  addInstruction(text) {
    let arr = this.state.instructions.concat([text]);
    this.setState({instructions: arr}, () => {
      console.log(this.state.instructions);
    });
  }

  addIngredientsText(text) {
    let arr = this.state.ingredientsText.concat([text]);
    this.setState({ingredientsText: arr}, () => {
      console.log(this.state.ingredientsText);
    })
  }

  handleSubmit(e) {
    let tagsData = [];
    let ingredientsData = []
    this.state.tags.forEach((i) => {
      tagsData.push(this.state.availableTags[i])
    })
    this.state.ingredients.forEach((i) => {
      ingredientsData.push(this.state.availableIngredients[i])
    })
    let data = {
      recipeName: this.state.recipeName,
      tagLine: this.state.tagLine,
      recipeImages: this.state.recipeImages,
      instructions: this.state.instructions,
      ingredientsText: this.state.ingredientsText,
      category: this.state.category.category_id,
      tags: tagsData,
      ingredients: ingredientsData,
      heat: this.state.heat,
      yield: this.state.yield,
      difficulty: this.state.difficulty,
      prepTime: this.state.prepTime,
      html: this.state.html,
    }
    axios.post('/salsa/newRecipe', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      this.setState({
        recipeName: '',
        tagLine: '',
        recipeImages: [],
        instructions: [],
        ingredientsText: [],
        category: '',
        tags: [],
        ingredients: [],
        heat: '1',
        yield: '',
        difficulty: '1',
        prepTime: '',
        html: '',
      })
  }

  render() {
    return (
      <div className={styles.formsWrapper}>
        <form className={styles.createRecipeForm} onSubmit={this.handleSubmit}>
          <h2>Add a New Recipe</h2>
          <div className={styles.createRecipeFormSection}>
          {this.state.recipeImages.map((image, i) => {
            return <img key = {i} src = {image.url} alt = {image.alt}/>
          })}
            <label>Recipe Title:</label>
            <input type="text" value={this.state.recipeName} onChange={this.titleChange} />
          </div>
          <div className={styles.createRecipeFormSection}>
            <label>Recipe Tagline:</label>
            <input type="text" value={this.state.tagLine} onChange={this.tagLineChange} />
          </div>
          <Ingredients availableIngredients = {this.state.availableIngredients} selectIngredient = {this.selectIngredient}/>
          <label>Ingredients Text:</label>
          {this.state.ingredientsText.map((ingredient, i) => {
            return <div className = {styles.createRecipeFormSection} key = {i}>{i + 1}: {ingredient}</div>
          })}
          <Categories categories = {this.state.availableCategories} category = {this.state.category} categoryChange = {this.categoryChange}/>
          <Tags availableTags = {this.state.availableTags} selectTag = {this.selectTag}/>
          <label>Instructions:</label>
          {this.state.instructions.map((instruction, i) => {
            return <div className = {styles.createRecipeFormSection} key = {i}>Step {i + 1}: {instruction}</div>
          })}
          <div className={styles.createRecipeFormSection}>
            <label>Recipe Heat:</label>
            <select onChange = {this.heatChange}>
              <option value = '1'>1</option>
              <option value = '2'>2</option>
              <option value = '3'>3</option>
              <option value = '4'>4</option>
              <option value = '5'>5</option>
              <option value = '6'>6</option>
              <option value = '7'>7</option>
              <option value = '8'>8</option>
              <option value = '9'>9</option>
              <option value = '10'>10</option>
            </select>
          </div>
          <div className={styles.createRecipeFormSection}>
            <label>Recipe Yield (in cups):</label>
            <input type="number" value={this.state.yield} onChange={this.yieldChange} />
          </div>
          <div className={styles.createRecipeFormSection}>
            <label>Recipe Difficulty:</label>
            <select onChange = {this.difficultyChange}>
              <option value = '1'>1</option>
              <option value = '2'>2</option>
              <option value = '3'>3</option>
              <option value = '4'>4</option>
              <option value = '5'>5</option>
              <option value = '6'>6</option>
              <option value = '7'>7</option>
              <option value = '8'>8</option>
              <option value = '9'>9</option>
              <option value = '10'>10</option>
            </select>
          </div>
          <div className={styles.createRecipeFormSection}>
            <label>Recipe Preparation Time (in minutes):</label>
            <input type="number" value={this.state.prepTime} onChange={this.prepTimeChange} />
          </div>
          <div className={styles.createRecipeFormSection}>
            <label>Add HTML for Custom Area:</label>
            <textarea type="text" value={this.state.html} onChange={this.htmlChange} />
          </div>
          <input type="submit" value="Submit" />
        </form>
        <AddRecipeImage addImage = {this.addImage}/>
        <AddInstruction addInstruction = {this.addInstruction} />
        <AddIngredient refreshIngredients = {this.refreshIngredients}/>
        <AddIngredientsText addIngredientsText = {this.addIngredientsText} />
        <AddCategory refreshCategories = {this.refreshCategories}/>
        <AddTag refreshTags = {this.refreshTags}/>
      </div>
      
    );
  }
}

export default NewRecipe;
