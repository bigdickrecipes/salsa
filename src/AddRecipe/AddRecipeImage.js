import React, {Component} from 'react';
import styles from './NewRecipe.module.css';

class AddRecipeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      altTag: '',
      height: '',
      width: ''
    };
    this.changeURL = this.changeURL.bind(this);
    this.changeAltTag = this.changeAltTag.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.submitIngredient = this.submitIngredient.bind(this);
  }

  changeURL(e) {
    this.setState({url: e.target.value});
  }

  changeAltTag(e) {
    this.setState({altTag: e.target.value});
  }

  changeHeight(e) {
    this.setState({height: e.target.value});
  }

  changeWidth(e) {
    this.setState({width: e.target.value});
  }

  submitIngredient(e) {
    let obj = {
      url: this.state.url,
      altTag: this.state.altTag,
      height: this.state.height,
      width: this.state.width,
    }
    this.props.addImage(obj)
    this.setState({
      url: '',
      altTag: '',
      height: '',
      width: ''
    })
    e.preventDefault();
  }

  render() {
    return (
    <form className={styles.createIngredientForm} onSubmit={this.submitIngredient}>
        <label>Add Image URL:</label>
        <input type="text" value={this.state.url} onChange={this.changeURL} />
        <label>Add Image Alt Tag:</label>
        <input type="text" value={this.state.altTag} onChange={this.changeAltTag} />
        <label>Add Image Height in PX:</label>
        <input type="number" value={this.state.height} onChange={this.changeHeight} />
        <label>Add Image Width in PX:</label>
        <input type="number" value={this.state.width} onChange={this.changeWidth} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddRecipeImage;