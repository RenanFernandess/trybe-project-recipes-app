import React, { useEffect, useContext } from 'react';
import Header, { Footer, Recipes, SearchByMealsCategory } from '../../Components';
import { fetchMeals, fetchMealsCategory } from '../../helpers/fetchAPI';
import RecipeContext from '../../context';
import { dishIcon } from '../../assets';

export default function Meals() {
  const { setRecipes, setCategories } = useContext(RecipeContext);

  useEffect(() => {
    fetchMeals(setRecipes);
    fetchMealsCategory(setCategories);
  }, [setRecipes, setCategories]);

  return (
    <div>
      <Header
        title="Meals"
        icon={ dishIcon }
        enableSearchButton
      />
      <SearchByMealsCategory />
      <Recipes />
      <Footer />
    </div>
  );
}
