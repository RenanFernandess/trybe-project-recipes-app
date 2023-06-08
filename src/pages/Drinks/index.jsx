import React, { useEffect, useContext } from 'react';
import Header, { Recipes, Footer } from '../../Components';
import { fetchDrinks } from '../../helpers/fetchAPI';
import RecipeContext from '../../context';
import { cupIcon } from '../../assets';

export default function Drinks() {
  const { setRecipes } = useContext(RecipeContext);

  useEffect(() => { fetchDrinks(setRecipes); }, [setRecipes]);

  return (
    <div>
      <Header
        title="Drinks"
        icon={ cupIcon }
        enableSearchButton
      />
      <Recipes />
      <Footer />
    </div>
  );
}
