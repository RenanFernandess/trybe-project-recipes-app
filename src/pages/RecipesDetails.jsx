import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchAPI from '../helpers/fetchAPI';
import YouTubeEmbed from '../Components/YouTubeEmbed';
// import saveItem from '../helpers/storage';
import {
  DRINK_DETAILS,
  MEALS_DETAILS,
  DRINKS_ENDPOINT,
  MEALS_ENDPOINT,
  FIRST_SIX,
} from '../services/variables';
import RecommendationCard from '../Components/RecommendationCard';

export default function RecipesDetails({ match, history }) {
  const [recipe, setRecipe] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { params: { id }, path } = match;
  const checkPath = path === '/meals/:id';
  const RECIPE_ENDPOINT = checkPath ? MEALS_DETAILS : DRINK_DETAILS;
  const RECOMMENDATION_ENDPOINT = checkPath ? DRINKS_ENDPOINT : MEALS_ENDPOINT;

  useEffect(() => {
    fetchAPI(`${RECIPE_ENDPOINT}${id}`, ({ meals, drinks }) => {
      const result = meals || drinks;
      setRecipe(result);
      const arrayOfKeys = Object.entries(result[0]);
      const regexIngredients = /^stringredient/i;
      const regexMeasure = /^strmeasure/i;
      const ingredientsArray = arrayOfKeys
        .filter(([key, value]) => regexIngredients.test(key) && value !== '');
      const measureArray = arrayOfKeys
        .filter(([key, value]) => regexMeasure.test(key) && value !== '');
      setIngredients(ingredientsArray);
      setMeasures(measureArray);
      /* saveItem('inProgressRecipes', {
        drinks: {
          15997: ['lista-de-ingredientes-utilizados'],
        },
        meals: {
          52977: ['lista-de-ingredientes-utilizados'],

        },
      }); */
    });

    fetchAPI(RECOMMENDATION_ENDPOINT, ({ meals, drinks }) => {
      const result = meals || drinks;
      setRecommendations(result.slice(0, FIRST_SIX));
    });
  }, [RECIPE_ENDPOINT, id, RECOMMENDATION_ENDPOINT]);

  const isRecipeDone = (recipeId) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');

    const checkTrue = doneRecipes.some((doneRecipe) => doneRecipe.id === recipeId);

    return checkTrue;
  };

  const isRecipeInProgress = (recId) => {
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    const inProgressRecipesArray = Object.values(recipes);

    return inProgressRecipesArray
      .some((inProgRecipe) => inProgRecipe.hasOwnProperty.call(inProgRecipe, recId));
  };

  return (
    <div>

      RecipeDetails

      <h1>RecipesDetails</h1>

      {recipe?.map((meal, i) => {
        const {
          strMealThumb,
          strDrinkThumb,
          strDrink,
          strMeal,
          strCategory,
          strYoutube,
          strInstructions,
          strAlcoholic,
        } = meal;

        const URL_CODE = checkPath && strYoutube.split('=')[1];

        return (
          <main key={ i }>
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
              { ingredients.map((ingredient, index) => (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { ingredient }
                  :
                  { measures[index] }
                </p>
              ))}
            </section>
            <section>
              { checkPath && <YouTubeEmbed videoID={ URL_CODE } />}
            </section>
          </main>
        );
      })}
      <div
        style={ {
          display: 'flex',
          gap: '10px',
          padding: '20px',
          width: '80vw',
          overflow: 'scroll',
        } }
      >
        { recommendations.map(({
          strMealThumb,
          strDrinkThumb,
          strMeal,
          strDrink,
          idMeal,
          idDrink,
        }, index) => {
          const image = strMealThumb || strDrinkThumb;
          const title = strMeal || strDrink;
          const idRecipe = idMeal || idDrink;
          return (
            <RecommendationCard
              key={ idRecipe }
              image={ image }
              title={ title }
              id={ idRecipe }
              index={ index }
            />
          );
        })}
      </div>
      {

        !isRecipeDone(id)

          ? (
            <button
              data-testid="start-recipe-btn"
              name="Start Recipe"
              type="button"
              className="start-recipe-btn"
              onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
            >

              {(isRecipeInProgress(id)
                ? 'Continue Recipe' : 'Start Recipe'

              )}

            </button>
          )
          : null
      }
    </div>
  );
}
RecipesDetails.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
