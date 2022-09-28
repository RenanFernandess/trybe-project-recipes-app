import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchAPI from '../helpers/fetchAPI';
import { DRINK_DETAILS, MEALS_DETAILS } from '../services/variables';

export default function RecipesDetails({ match }) {
  const [recipe, setRecipe] = useState({});
  const { params: { id }, path } = match;
  const regex = /^\/meals/i;
  const urlTest = regex.test(path) ? MEALS_DETAILS : DRINK_DETAILS;
  console.log(urlTest);

  useEffect(() => {
    fetchAPI(`${urlTest}${id}`, (data) => {
      setRecipe(data);
    });
  }, [urlTest, id]);

  const isRecipeDone = (recipeId) => {
    const storage = localStorage.getItem('doneRecipes') || '[]';
    const doneRecipes = JSON.parse(storage);

    const checkTrue = doneRecipes.some((doneRecipe) => doneRecipe.id === recipeId);

    return checkTrue;
  };
  return (
    <div>
      RecipeDetails
      {
        !isRecipeDone(id)
          ? (
            <button
              data-testid="start-recipe-btn"
              name="Start Recipe"
              type="button"
              className="start-recipe-btn"
            >
              Start Recipe
            </button>
          )
          : null
      }
    </div>
  );
}
RecipesDetails.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
