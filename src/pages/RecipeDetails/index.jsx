import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinkById, fetchMealById } from '../../helpers/fetchAPI';
import { RecipeInProgressContext } from '../../context';
import { Recipe } from '../../Components';

const FETCH = {
  meals: fetchMealById,
  drinks: fetchDrinkById,
};

export default function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const { setRecipe } = useContext(RecipeInProgressContext);
  const page = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    FETCH[page](id, setRecipe);
  }, [id, setRecipe, page]);

  return (
    <div>
      <Recipe />
    </div>
  );
}
