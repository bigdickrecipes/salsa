import React from 'react';
import styles from './NewRecipe.module.css';

const Categories = (props) => {
  return (
    <div className={styles.createRecipeFormSection}>
      <label htmlFor="selectCategory">Select an Existing Category:</label>
      <select id="selectCategory" onChange = {props.categoryChange} defaultValue = 'select an existing category'>
        {props.categories.map((category, i) => {
          return <option value = {i} key = {i}>{category.category}</option>
        })}
      </select>
    </div>
  );
}

export default Categories;