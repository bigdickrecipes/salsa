import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className={`${styles.Header} ${styles[this.props.currentPage]}`}>
        <Link className = {styles.HeaderLink} to = '/addrecipe' >Add Recipe</Link>
        <Link className = {styles.HeaderLink} to = '/recipes' >Browse Recipes</Link>
      </div>
    );
  }
}

export default Header;
