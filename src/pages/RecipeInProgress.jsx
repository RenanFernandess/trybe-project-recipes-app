import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';
import { RecipeInProgressContext } from '../context';
import { EndRecipeButton, ListIngredientes } from '../Components';

export default function RecipeInProgress() {
  const {
    recipe,
  } = useContext(RecipeInProgressContext);

  const {
    strCategory, strAlcoholic, strMeal,
    strDrink, strDrinkThumb, strMealThumb,
    strInstructions,
  } = recipe;

  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  const NUMBER_OF_SPLITS = 3;
  const splitedPathname = pathname.split('/', NUMBER_OF_SPLITS);
  const newPath = `/${splitedPathname[1]}/${splitedPathname[2]}`;

  return (
    <main>
      <h1>Recipe in Progress</h1>
      <img
        src={ strDrinkThumb || strMealThumb }
        alt={ strDrink || strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { strDrink || strMeal }
      </h1>
      <div>
        <ShareButton
          testId="share-btn"
          url={ newPath }
        />
        <FavoriteButton
          checkPath={ false }
          recipe={ recipe }
          testId="favorite-btn"
          idRecipe={ id }
        />
      </div>
      <section>
        <p data-testid="recipe-category">
          { strCategory }
          { ' ' }
          { strAlcoholic }
        </p>
        <div data-testid="instructions">
          { strInstructions }
        </div>
      </section>
      <ListIngredientes />
      <EndRecipeButton />
    </main>
  );
}
