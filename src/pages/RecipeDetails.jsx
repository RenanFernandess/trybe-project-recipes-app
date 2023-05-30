import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinkById, fetchMealById } from '../helpers/fetchAPI';
import {
  DONE_RECIPES,
} from '../services/variables';
import { getItem } from '../helpers/storage';
import '../css/Recipes.css';
import {
  Recommendations, YouTubeEmbed, FavoriteButton, ShareButton,
} from '../Components';
import { RecipeInProgressContext } from '../context';

const FETCH = {
  meals: fetchMealById,
  drinks: fetchDrinkById,
};

export default function RecipeDetails() {
  const { location: { pathname }, push } = useHistory();
  const { id } = useParams();
  const {
    recipe,
    ingredients,
    setRecipe,
    progress,
  } = useContext(RecipeInProgressContext);

  const {
    strCategory,
    strAlcoholic, strMeal,
    strDrink, strDrinkThumb, strMealThumb,
    strYoutube, strInstructions, idMeal, idDrink,
  } = recipe;
  const URL_CODE = strYoutube && strYoutube.split('=')[1];
  const page = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    const recipeId = idMeal || idDrink;
    if (id !== recipeId) FETCH[page](id, setRecipe);
  }, [id, setRecipe, page, idMeal, idDrink]);

  const recipeIsDone = (recipeId) => {
    const doneRecipes = getItem(DONE_RECIPES) || [];
    const checkTrue = doneRecipes.some((doneRecipe) => doneRecipe.id === recipeId);
    return checkTrue;
  };

  const recipeIsInProgress = () => progress.some((bool) => bool);

  return (
    <div>
      <header>
        <h1>RecipeDetails</h1>
      </header>
      <main>
        <div>
          <ShareButton
            testId="share-btn"
          />
          <FavoriteButton
            recipe={ recipe }
            testId="favorite-btn"
            idRecipe={ id }
          />
        </div>
        <h2
          data-testid="recipe-title"
        >
          {strMeal || strDrink}
        </h2>
        <img
          src={ strMealThumb || strDrinkThumb }
          width="100"
          alt={ strMeal }
          data-testid="recipe-photo"
          tagname={ strMeal || strDrink }
        />
        <p data-testid="recipe-category">
          { strCategory }
          { ' ' }
          { strAlcoholic }
        </p>
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
              <button
                data-testid="start-recipe-btn"
                name="Start Recipe"
                type="button"
                className="start-recipe-btn"
                onClick={ () => push(`${pathname}/in-progress`) }
              >
                {(recipeIsInProgress()
                  ? 'Continue Recipe' : 'Start Recipe'
                )}
              </button>
            )
            : null
        }
      </footer>
    </div>
  );
}
