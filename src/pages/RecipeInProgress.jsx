import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';
import appContext from '../context/appContext';

export default function RecipeInProgress({
  match: { params: { id }, url },
}) {
  const {
    recipe,
    ingredients,
  } = useContext(appContext);
  const {
    strCategory, strAlcoholic, strMeal,
    strDrink, strDrinkThumb, strMealThumb,
    strInstructions,
  } = recipe;

  return (
    <main>
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
          url={ url }
        />
        <FavoriteButton
          checkPath={ false }
          recipe={ {} }
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
        { ingredients.map((ingredient, i) => (
          <section key={ i }>
            <label
              htmlFor={ i }
              className="ingredients-checklist"
              data-testId={ `${i}-ingredient-step` }
            >
              <input
                type="checkbox"
                value={ ingredient }
                id={ i }
                name={ ingredient }
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
        >
          Finish recipe
        </button>
      </div>
    </main>
  );
}

RecipeInProgress.propTypes = {
  match: propTypes.shape({
    path: propTypes.string,
    url: propTypes.string,
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};
