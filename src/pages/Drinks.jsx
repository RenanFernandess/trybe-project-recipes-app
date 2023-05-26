import React, { useEffect, useContext } from 'react';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import { fetchDrinks } from '../helpers/fetchAPI';
import Footer from '../Components/Footer';
import RecipeContext from '../context';

export default function Drinks() {
  const { setRecipes } = useContext(RecipeContext);

  useEffect(() => { fetchDrinks(setRecipes); }, [setRecipes]);

  return (
    <div>
      <Header title="Drinks" enableSearchButton />
      <Recipes />
      <Footer />
    </div>
  );
}
