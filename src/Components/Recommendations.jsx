import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import RecommendationCard from './RecommendationCard';
import { fetchDrinks, fetchMeals } from '../helpers/fetchAPI';

const FIRST_SIX = 6;
const FETCH = {
  meals: fetchDrinks,
  drinks: fetchMeals,
};

function Recommendations({ page }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    FETCH[page](setRecommendations, FIRST_SIX);
  }, [page]);

  return (
    <section
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
        const idRecipe = idMeal || idDrink;
        return (
          <RecommendationCard
            key={ idRecipe }
            image={ strMealThumb || strDrinkThumb }
            title={ strMeal || strDrink }
            id={ idRecipe }
            index={ index }
          />
        );
      })}
    </section>
  );
}

Recommendations.propTypes = {
  page: PropTypes.string.isRequired,
};

export default memo(Recommendations);
