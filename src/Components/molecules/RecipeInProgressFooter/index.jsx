import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeInProgressContext } from '../../../context';
import { Button } from '../../atoms';
import { DONE_RECIPES } from '../../../services/variables';
import saveItem, { getItem } from '../../../helpers/storage';
import { recipeMap } from '../../../helpers';
import Footer from './styles';

export default function RecipeInProgressFooter() {
  const history = useHistory();
  const { recipe, progress, clearProgress } = useContext(RecipeInProgressContext);
  const buttonIsDisable = !progress.every((recipeInProg) => recipeInProg);

  const finishRecipe = () => {
    const doneRecipes = getItem(DONE_RECIPES) || [];
    const date = new Date();
    const doneDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const finishedRecipe = { ...recipeMap(recipe), doneDate };
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
