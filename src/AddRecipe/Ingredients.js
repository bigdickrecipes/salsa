import React from 'react';
import styles from './NewRecipe.module.css';

const Ingredients = (props) => {
  return (
    <div className={styles.createRecipeFormSection}>
      <label>Select Existing Ingredients:</label>
      <div className={styles.checkboxGroup}>
        {props.availableIngredients.map((ingredient, i) => {
          return <div key = {i} className={styles.checkbox}><input id = {`ingredientCheckBox${i}`} type = 'checkbox' value = {i} onChange = {props.selectIngredient}/><label htmlFor = {`ingredientCheckBox${i}`}>{ingredient.ingredient}</label></div>
        })}
      </div>
    </div>
  );
}

export default Ingredients;