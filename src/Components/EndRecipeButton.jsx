import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipeInProgressContext } from '../context';
import { DONE_RECIPES } from '../services/variables';
import saveItem, { getItem } from '../helpers/storage';

export default function EndRecipeButton() {
  const { recipe, progress, clearProgress } = useContext(RecipeInProgressContext);
  const history = useHistory();
  const { id } = useParams();
  const buttonIsDisable = (progress[id]
    && !progress[id].every((recipeInProg) => recipeInProg));

  const finishRecipe = () => {
    const {
      strCategory, strAlcoholic, strMeal,
      strDrink, strDrinkThumb, strMealThumb,
      strArea, strTags, idMeal, idDrink,
    } = recipe;
    const doneRecipes = getItem(DONE_RECIPES) || [];
    const finishedRecipe = {
      alcoholicOrNot: strAlcoholic,
      category: strCategory,
      doneDate: new Date(),
      id: idMeal || idDrink,
      image: strDrinkThumb || strMealThumb,
      name: strDrink || strMeal,
      nationality: strArea,
      tags: [strTags],
      type: strMeal ? 'meal' : 'drink',
    };
    saveItem(DONE_RECIPES, [...doneRecipes, finishedRecipe]);
    clearProgress();
    history.push('/done-recipes');
  };

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ finishRecipe }
      disabled={ buttonIsDisable }
    >
      Finish recipe
    </button>
  );
}
