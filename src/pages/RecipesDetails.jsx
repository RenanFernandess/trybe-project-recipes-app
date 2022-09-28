import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchAPI from '../helpers/fetchAPI';
import { DRINK_DETAILS, MEALS_DETAILS } from '../services/variables';
import YouTubeEmbed from '../Components/YouTubeEmbed';

export default function RecipesDetails({ match }) {
  const [recipe, setRecipe] = useState({});
  const { params: { id }, path } = match;
  const regex = /^\/meals/i;
  const urlTest = regex.test(path) ? MEALS_DETAILS : DRINK_DETAILS;
  // console.log(urlTest);

  useEffect(() => {
    fetchAPI(`${urlTest}${id}`, (data) => {
      // console.log(data);
      setRecipe(data);
    });
  }, [urlTest, id]);

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
    </div>
  );
}
RecipesDetails.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
