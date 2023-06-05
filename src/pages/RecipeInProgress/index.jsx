import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  ShareButton,
  FavoriteButton,
  EndRecipeButton,
  ListIngredientes,
} from '../../Components';
import { fetchDrinkById, fetchMealById } from '../../helpers/fetchAPI';
import { RecipeInProgressContext } from '../../context';

const FETCH = {
  meals: fetchMealById,
  drinks: fetchDrinkById,
};

export default function RecipeInProgress() {
  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  const { recipe, setRecipe, RECIPE_ID } = useContext(RecipeInProgressContext);
  const page = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    if (id !== RECIPE_ID) FETCH[page](id, setRecipe);
  }, [id, setRecipe, page, RECIPE_ID]);

  const {
    strCategory, strAlcoholic, strMeal,
    strDrink, strDrinkThumb, strMealThumb,
    strInstructions,
  } = recipe;

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
