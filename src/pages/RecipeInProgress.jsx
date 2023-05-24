import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';
import appContext from '../context/appContext';
import fetchAPI from '../helpers/fetchAPI';
import { DRINK_DETAILS, MEALS_DETAILS,
  IN_PROGRESS_RECIPES } from '../services/variables';
import saveItem, { getItem } from '../helpers/storage';
import getIngredients from '../helpers/getIngredients';
import lengthIsTheSame from '../helpers/lengthIsTheSame';

export default function RecipeInProgress() {
  const {
    setRecipe,
    recipe,
    ingredients,
  } = useContext(appContext);

  const {
    strCategory, strAlcoholic, strMeal,
    strDrink, strDrinkThumb, strMealThumb,
    strInstructions,
  } = recipe;

  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  const [recipeProgress, setRecipeProgress] = useState(
    getItem(IN_PROGRESS_RECIPES) || {},
  );
  const checkPath = pathname.includes('meals');
  const RECIPE_ENDPOINT = checkPath ? MEALS_DETAILS : DRINK_DETAILS;
  const NUMBER_OF_SPLITS = 3;
  const splitedPathname = pathname.split('/', NUMBER_OF_SPLITS);
  const newPath = `/${splitedPathname[1]}/${splitedPathname[2]}`;
  const buttonIsDisable = !lengthIsTheSame(recipeProgress, ingredients.length)
    || !Object.values(recipeProgress).every((recipeInProg) => recipeInProg);

  useEffect(() => {
    fetchAPI(`${RECIPE_ENDPOINT}${id}`, ([result]) => {
      setRecipe({
        recipe: result,
        ingredients: getIngredients(result),
      });
    });
  }, [RECIPE_ENDPOINT, id, setRecipe]);

  const checkIngredient = ({ target: { name, checked } }) => {
    console.log(checked);
    setRecipeProgress((prevState) => {
      const progress = {
        ...prevState,
        [name]: checked,
      };
      saveItem(IN_PROGRESS_RECIPES, progress);
      return progress;
    });
  };

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
      <section>
        { ingredients.map(({ ingredient, measure }, index) => (
          <section key={ ingredient }>
            <label
              htmlFor={ ingredient }
              name={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                id={ ingredient }
                name={ ingredient }
                onChange={ checkIngredient }
                checked={ recipeProgress[ingredient] || false }
              />
              { `${ingredient}: ${measure}` }
            </label>
          </section>
        ))}

      </section>
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ buttonIsDisable }
        >
          Finish recipe
        </button>
      </div>
    </main>
  );
}
