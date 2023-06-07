import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipeInProgressContext } from '../../../context';

import Recommendations from '../../Recommendations';
import { DONE_RECIPES } from '../../../services/variables';
import { getItem } from '../../../helpers/storage';
import { Button } from '../../atoms';
import { RecipeHeader } from '../../organisms';
import { drinkIcon, mealIcon } from '../../../assets';
import { RecipeIngredients, RecipeInstructions, RecipeVideo } from '../../molecules';
import Container from './styles';

const PAGE_ICON = {
  meals: mealIcon,
  drinks: drinkIcon,
};

export default function Recipe() {
  const { location: { pathname }, push } = useHistory();
  const { id } = useParams();
  const {
    progress,
    recipe,
    ingredients,
  } = useContext(RecipeInProgressContext);
  const page = pathname.includes('meals') ? 'meals' : 'drinks';

  const { strYoutube, strInstructions } = recipe;

  const recipeIsDone = (recipeId) => {
    const doneRecipes = getItem(DONE_RECIPES) || [];
    const checkTrue = doneRecipes.some((doneRecipe) => doneRecipe.id === recipeId);
    return checkTrue;
  };

  const recipeIsInProgress = () => progress.some((bool) => bool);

  return (
    <>
      <RecipeHeader icon={ PAGE_ICON[page] } />
      <Container>
        <RecipeIngredients
          ingredients={ ingredients }
        />
        <RecipeInstructions
          text={ strInstructions }
        />
        { strYoutube && <RecipeVideo url={ strYoutube } />}
        <Recommendations page={ page } />
      </Container>
      <footer>
        {
          !recipeIsDone(id)
            ? (
              <Button
                onClick={ () => {
                  push(`${pathname}/in-progress`);
                } }
              >
                {(recipeIsInProgress()
                  ? 'Continue Recipe' : 'Start Recipe'
                )}
              </Button>
            )
            : null
        }
      </footer>
    </>
  );
}
