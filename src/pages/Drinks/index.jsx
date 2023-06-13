import React, { useEffect, useContext } from 'react';
import Header, { Recipes, Footer, SearchByDrinksCategory } from '../../Components';
import { fetchDrinks, fetchDrinksCategory } from '../../helpers/fetchAPI';
import RecipeContext from '../../context';
import { cupIcon } from '../../assets';

export default function Drinks() {
  const { setRecipes, setCategories } = useContext(RecipeContext);

  useEffect(() => {
    fetchDrinks(setRecipes);
    fetchDrinksCategory(setCategories);
  }, [setRecipes, setCategories]);

  return (
    <div>
      <Header
        title="Drinks"
        icon={ cupIcon }
        enableSearchButton
      />
      <SearchByDrinksCategory />
      <Recipes />
      <Footer />
    </div>
  );
}
