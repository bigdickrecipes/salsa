import React, {Component} from 'react';
import styles from './NewRecipe.module.css';

class AddIngredientsText extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.changeIngredientText = this.changeIngredientText.bind(this);
    this.submitIngredientText = this.submitIngredientText.bind(this);
  }

  changeIngredientText(e) {
    this.setState({value: e.target.value});
  }

  submitIngredientText(e) {
    e.preventDefault();
    let text = this.state.value;
    this.props.addIngredientsText(text);
    this.setState({value: ''});
  }

  render() {
    return (
      <form className={styles.createTagForm} onSubmit={this.submitIngredientText}>
        <label>Add Ingredients Text:</label>
          <input type="text" value={this.state.value} onChange={this.changeIngredientText} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddIngredientsText;