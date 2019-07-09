import React, {Component} from 'react';
import styles from './NewRecipe.module.css';

class AddInstruction extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.changeInstruction = this.changeInstruction.bind(this);
    this.submitInstruction = this.submitInstruction.bind(this);
  }

  changeInstruction(e) {
    this.setState({value: e.target.value});
  }

  submitInstruction(e) {
    e.preventDefault();
    let text = this.state.value;
    this.props.addInstruction(text);
    this.setState({value: ''});
  }

  render() {
    return (
      <form className={styles.createTagForm} onSubmit={this.submitInstruction}>
        <label>Create New Instruction:</label>
          <input type="text" value={this.state.value} onChange={this.changeInstruction} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddInstruction;