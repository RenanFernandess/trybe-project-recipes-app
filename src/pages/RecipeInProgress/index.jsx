import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MakingRecipe } from '../../Components';
import { fetchDrinkById, fetchMealById } from '../../helpers/fetchAPI';
import { RecipeInProgressContext } from '../../context';

const FETCH = {
  meals: fetchMealById,
  drinks: fetchDrinkById,
};

export default function RecipeInProgress() {
  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  const { setRecipe, RECIPE_ID } = useContext(RecipeInProgressContext);
  const page = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    if (id !== RECIPE_ID) FETCH[page](id, setRecipe);
  }, [id, setRecipe, page, RECIPE_ID]);

  return (
    <div>
      <MakingRecipe />
    </div>
  );
}
