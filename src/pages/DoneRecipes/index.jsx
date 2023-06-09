import React from 'react';
import Header, { FinishedRecipes, Footer } from '../../Components';
import { getItem } from '../../helpers/storage';
import { DONE_RECIPES } from '../../services/variables';
import { doneRecipesIcon } from '../../assets';

export default function DoneRecipes() {
  const savedRecipes = getItem(DONE_RECIPES) || [];

  return (
    <div>
      <Header
        icon={ doneRecipesIcon }
        title="Done Recipes"
      />
      <FinishedRecipes recipes={ savedRecipes } />
      <Footer />
    </div>
  );
}
