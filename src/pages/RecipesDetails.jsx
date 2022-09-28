import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchAPI from '../helpers/fetchAPI';
import { DRINK_DETAILS, MEALS_DETAILS } from '../services/variables';
import YouTubeEmbed from '../Components/YouTubeEmbed';
import {
  DRINK_DETAILS,
  MEALS_DETAILS,
  DRINKS_ENDPOINT,
  MEALS_ENDPOINT,
  FIRST_SIX,
} from '../services/variables';
import RecommendationCard from '../Components/RecommendationCard';

export default function RecipesDetails({ match }) {
  const [recipe, setRecipe] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const { params: { id }, path } = match;
  const checkPath = path === '/meals/:id';
  const RECIPE_ENDPOINT = checkPath ? MEALS_DETAILS : DRINK_DETAILS;
  const RECOMMENDATION_ENDPOINT = checkPath ? DRINKS_ENDPOINT : MEALS_ENDPOINT;
  console.log(RECIPE_ENDPOINT);
  
  useEffect(() => {
    fetchAPI(`${RECIPE_ENDPOINT}${id}`, (data) => {
      setRecipe(data);
    });
    fetchAPI(RECOMMENDATION_ENDPOINT, ({ meals, drinks }) => {
      const result = meals || drinks;
      setRecommendations(result.slice(0, FIRST_SIX));
    });
  }, [RECIPE_ENDPOINT, id, RECOMMENDATION_ENDPOINT]);

  const getIngredientsAndMeasure = () => {
    if (meals) {
      const arrayOfKeys = Object.entries(meals[0]);
      const regexIngredients = /^stringredient/i;
      const regexMeasure = /^strmeasure/i;
      const ingredientsArray = arrayOfKeys
        .filter(([key, value]) => regexIngredients.test(key) && value !== '');
      const measureArray = arrayOfKeys
        .filter(([key, value]) => regexMeasure.test(key) && value !== '');
      setIngredients(ingredientsArray);
      setMeasures(measureArray);
    }
  };

  const { meals } = recipe;
  return (
    <div>
      <h1>RecipesDetails</h1>

      {meals.map((meal, i) => {
        const {
          strMealThumb,
          strMeal,
          strCategory,
          strYoutube,
          strInstructions,
          // strMeasure1,
          // strIngredient,
        } = meal;

        const URL_CODE = strYoutube.split('=')[1];

        return (
          <main key={ i }>
            <h2
              data-testid="recipe-title"
            >
              {strMeal}
            </h2>
            <img
              src={ strMealThumb }
              width="100"
              alt={ strMeal }
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-category">
              Categoria:
              {strCategory}
            </p>
            <article data-testid="instructions">
              Instruções:
              {strInstructions}
            </article>

            <YouTubeEmbed videoID={ URL_CODE } />

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
    </div>
  );
}
RecipesDetails.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
