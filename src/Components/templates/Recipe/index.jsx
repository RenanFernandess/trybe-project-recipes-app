import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipeInProgressContext } from '../../../context';

import Recommendations from '../../Recommendations';
import YouTubeEmbed from '../../YouTubeEmbed';
import { DONE_RECIPES } from '../../../services/variables';
import { getItem } from '../../../helpers/storage';
import { Button } from '../../atoms';
import { RecipeHeader } from '../../organisms';

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
  const URL_CODE = strYoutube && strYoutube.split('=')[1];

  const recipeIsDone = (recipeId) => {
    const doneRecipes = getItem(DONE_RECIPES) || [];
    const checkTrue = doneRecipes.some((doneRecipe) => doneRecipe.id === recipeId);
    return checkTrue;
  };

  const recipeIsInProgress = () => progress.some((bool) => bool);

  return (
    <>
      <RecipeHeader />
      <main>
        <article data-testid="instructions">
          <h3>Instruções</h3>
          {strInstructions}
        </article>
        <section>
          <h3>Ingredientes</h3>
          { ingredients.map(({ ingredient, measure }, index) => (
            <p
              key={ `${index}${ingredient}` }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredient}: ${measure}` }
            </p>
          ))}
        </section>
        <article>
          { strYoutube && <YouTubeEmbed videoID={ URL_CODE } />}
        </article>
        <Recommendations page={ page } />
      </main>
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
