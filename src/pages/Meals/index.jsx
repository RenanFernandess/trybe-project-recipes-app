import React, { useEffect, useContext } from 'react';
import Header, { Footer, Recipes } from '../../Components';
import { fetchMeals } from '../../helpers/fetchAPI';
import RecipeContext from '../../context';
import { dishIcon } from '../../assets';

export default function Meals() {
  const { setRecipes } = useContext(RecipeContext);

  useEffect(() => { fetchMeals(setRecipes); }, [setRecipes]);

  return (
    <div>
      <Header
        title="Meals"
        icon={ dishIcon }
        enableSearchButton
      />
      <Recipes />
      <Footer />
    </div>
  );
}
