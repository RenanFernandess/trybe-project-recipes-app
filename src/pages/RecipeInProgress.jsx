import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';
import appContext from '../context/appContext';
import fetchAPI from '../helpers/fetchAPI';
import { DRINK_DETAILS, MEALS_DETAILS,
  INGREDIENTS_NUMBER,
  IN_PROGRESS_RECIPES } from '../services/variables';
import saveItem, { getItem } from '../helpers/storage';

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
  const history = useHistory();
  const { location: { pathname } } = history;
  const [isChecked, setIsChecked] = useState({});
  const checkPath = pathname.includes('meals');
  const RECIPE_ENDPOINT = checkPath ? MEALS_DETAILS : DRINK_DETAILS;
  const NUMBER_OF_SPLITS = 3;
  const splitedPathname = pathname.split('/', NUMBER_OF_SPLITS);
  const newPath = `/${splitedPathname[1]}/${splitedPathname[2]}`;
  const getRecipesProgress = getItem(IN_PROGRESS_RECIPES) || [];
  const arrayCheck = getRecipesProgress.every((recipeInProg) => recipeInProg);

  useEffect(() => {
    fetchAPI(`${RECIPE_ENDPOINT}${id}`, ([result]) => {
      const ingredientsArray = Array(INGREDIENTS_NUMBER).fill(undefined)
        .reduce((Acc, _, ind) => {
          const number = ind + 1;
          const ingredient = result[`strIngredient${number}`];
          const measure = result[`strMeasure${number}`];
          if (ingredient) return [...Acc, `${ingredient}: ${measure}`];
          return Acc;
        }, []);
      console.log('test: ', ingredientsArray);
      setRecipe({
        recipe: result,
        ingredients: ingredientsArray,
      });
    });
  }, [RECIPE_ENDPOINT, id]);

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const checkList = {
      ...isChecked,
      [target.name]: value,
    };
    target.parentNode.classList.toggle('lined');
    setIsChecked(checkList);
    saveItem(IN_PROGRESS_RECIPES, Object.values(checkList));
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
        { ingredients.map((ingredient, index) => (
          <section key={ index }>
            <label
              htmlFor={ index }
              name={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                value={ ingredient }
                id={ index }
                name={ ingredient }
                onChange={ handleChange }
                checked={ getRecipesProgress[index] }
              />
              { ingredient }
            </label>
          </section>
        ))}

      </section>
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ arrayCheck }
        >
          Finish recipe
        </button>
      </div>
    </main>
  );
}
