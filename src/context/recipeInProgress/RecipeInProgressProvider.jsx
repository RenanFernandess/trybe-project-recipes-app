import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgressContext from './recipeInProgressContext';
import { IN_PROGRESS_RECIPES } from '../../services/variables';
import saveItem, { getItem } from '../../helpers/storage';
import { getIngredients } from '../../helpers';

export default function RecipeInProgressProvider({ children }) {
  const [recipe, setRecipe] = useState({});
  const ingredients = useMemo(() => getIngredients(recipe), [recipe]);
  const [progress, setProgress] = useState(
    getItem(IN_PROGRESS_RECIPES)
    || { meals: {}, drinks: {} },
  );
  const RECIPE_ID = recipe.idMeal || recipe.idDrink;
  const RECIPE_TYPE = recipe.idMeal ? 'meals' : 'drinks';

  useEffect(() => { saveItem(IN_PROGRESS_RECIPES, progress); }, [progress]);

  const setRecipeProgress = useCallback((recipeProgress) => {
    setProgress((state) => {
      const prog = { ...state };
      prog[RECIPE_TYPE][RECIPE_ID] = recipeProgress;
      return prog;
    });
  }, [RECIPE_ID, RECIPE_TYPE]);

  const clearProgress = useCallback(() => {
    setProgress((state) => {
      const { [RECIPE_TYPE]: { [RECIPE_ID]: _, ...data } } = state;
      const prog = { ...state };
      prog[RECIPE_TYPE] = data;
      return prog;
    });
  }, [RECIPE_ID, RECIPE_TYPE]);

  const contextType = {
    recipe,
    setRecipe,
    ingredients,
    progress: (progress[RECIPE_TYPE][RECIPE_ID] || Array(ingredients.length).fill(false)),
    setRecipeProgress,
    clearProgress,
    RECIPE_ID,
  };

  return (
    <RecipeInProgressContext.Provider value={ contextType }>
      { children }
    </RecipeInProgressContext.Provider>
  );
}

RecipeInProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
