import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchAPI from '../helpers/fetchAPI';
import {
  DRINK_DETAILS,
  MEALS_DETAILS,
  DRINKS_ENDPOINT,
  MEALS_ENDPOINT,
} from '../services/variables';

export default function RecipesDetails({ match }) {
  const [recipe, setRecipe] = useState({});
  const [recommendation, setRecommendation] = useState([]);
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
      setRecommendation(result);
    });
  }, [RECIPE_ENDPOINT, id, RECOMMENDATION_ENDPOINT]);

  return (
    <div>
      RecipesDetails

    </div>
  );
}
RecipesDetails.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
