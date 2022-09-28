import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchAPI from '../helpers/fetchAPI';
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
    //   console.log(data);
      setRecipe(data);
    });
    fetchAPI(RECOMMENDATION_ENDPOINT, ({ meals, drinks }) => {
      const result = meals || drinks;
      console.log(result);
      setRecommendations(result.slice(0, FIRST_SIX));
    });
  }, [RECIPE_ENDPOINT, id, RECOMMENDATION_ENDPOINT]);

  return (
    <div>
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
