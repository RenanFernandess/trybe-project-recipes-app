import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipeInProgressContext } from '../../../context';
import { Button } from '../../atoms';
import { DONE_RECIPES } from '../../../services/variables';
import { getItem } from '../../../helpers/storage';
import Footer from './styles';

export default function RecipeFooter() {
  const { id } = useParams();
  const { location: { pathname }, push } = useHistory();
  const { progress } = useContext(RecipeInProgressContext);

  const recipeIsDone = () => {
    const doneRecipes = getItem(DONE_RECIPES) || [];
    return doneRecipes.some((doneRecipe) => doneRecipe.id === id);
  };

  const recipeIsInProgress = progress.some((bool) => bool);

  return (
    <Footer>
      {
        !recipeIsDone()
          ? (
            <Button onClick={ () => push(`${pathname}/in-progress`) }>
              { recipeIsInProgress ? 'Continue Recipe' : 'Start Recipe' }
            </Button>
          ) : null
      }
    </Footer>
  );
}
