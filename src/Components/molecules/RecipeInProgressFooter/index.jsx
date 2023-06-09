import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeInProgressContext } from '../../../context';
import { Button } from '../../atoms';
import { DONE_RECIPES } from '../../../services/variables';
import { getItem } from '../../../helpers/storage';
import Footer from './styles';

export default function RecipeInProgressFooter() {
  const history = useHistory();
  const { recipe, progress, clearProgress } = useContext(RecipeInProgressContext);
  const buttonIsDisable = !progress.every((recipeInProg) => recipeInProg);

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
    <Footer>
      <Button
        onClick={ finishRecipe }
        disabled={ buttonIsDisable }
      >
        Finish recipe
      </Button>
    </Footer>
  );
}
