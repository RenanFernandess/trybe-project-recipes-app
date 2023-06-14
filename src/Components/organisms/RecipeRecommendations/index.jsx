import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinks, fetchMeals } from '../../../helpers/fetchAPI';
import Container, { Title, Div } from './styles';
import RecommendationCard from '../RecommendationCard';

const FIRST_SIX = 6;
const FETCH = {
  meals: fetchDrinks,
  drinks: fetchMeals,
};

function RecipeRecommendations({ page }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => { FETCH[page](setRecommendations, FIRST_SIX); }, [page]);

  return (
    <Container>
      <Title>Recommended</Title>
      <Div>
        { recommendations.map(({
          strMealThumb,
          strDrinkThumb,
          strMeal,
          strDrink,
          idMeal,
          idDrink,
        }) => {
          const idRecipe = idMeal || idDrink;
          return (
            <RecommendationCard
              key={ idRecipe }
              thumb={ strMealThumb || strDrinkThumb }
              name={ strMeal || strDrink }
              id={ idRecipe }
            />
          );
        })}
      </Div>
    </Container>
  );
}

RecipeRecommendations.propTypes = {
  page: PropTypes.string.isRequired,
};

export default memo(RecipeRecommendations);
