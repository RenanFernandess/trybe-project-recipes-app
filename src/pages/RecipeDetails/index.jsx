import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinkById, fetchMealById } from '../../helpers/fetchAPI';
import { RecipeInProgressContext } from '../../context';
import { AwaitReady, Recipe } from '../../Components';

const FETCH = {
  meals: fetchMealById,
  drinks: fetchDrinkById,
};

export default function RecipeDetails() {
  const [loading, setLoading] = useState(true);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const { setRecipe } = useContext(RecipeInProgressContext);
  const page = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    FETCH[page](id, (data) => {
      setRecipe(data);
      setLoading(false);
    });
  }, [id, setRecipe, page]);

  return (
    <div>
      <AwaitReady ready={ loading }>
        <Recipe />
      </AwaitReady>
    </div>
  );
}
