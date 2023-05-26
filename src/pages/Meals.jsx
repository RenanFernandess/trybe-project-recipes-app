import React, { useEffect, useContext } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Recipes from '../Components/Recipes';
import { fetchMeals } from '../helpers/fetchAPI';
import RecipeContext from '../context';

export default function Meals() {
  const { setRecipes } = useContext(RecipeContext);

  useEffect(() => { fetchMeals(setRecipes); }, [setRecipes]);

  return (
    <div>
      <Header title="Meals" enableSearchButton />
      <Recipes />
      <Footer />
    </div>
  );
}
