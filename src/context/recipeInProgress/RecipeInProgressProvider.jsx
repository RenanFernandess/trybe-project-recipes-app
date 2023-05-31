import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgressContext from './recipeInProgressContext';
import { IN_PROGRESS_RECIPES } from '../../services/variables';
import saveItem, { getItem } from '../../helpers/storage';
import { getIngredients } from '../../helpers';

export default function RecipeInProgressProvider({ children }) {
  const [recipe, setRecipe] = useState({});
  const ingredients = useMemo(() => getIngredients(recipe), [recipe]);
  const [progress, setProgress] = useState(getItem(IN_PROGRESS_RECIPES) || {});
  const recipeId = String(recipe.idMeal || recipe.idDrink);

  useEffect(() => { saveItem(IN_PROGRESS_RECIPES, progress); }, [progress]);

  const setRecipeProgress = useCallback((recipeProgress) => {
    setProgress((state) => ({ ...state, [recipeId]: recipeProgress }));
  }, [recipeId]);

  const clearProgress = useCallback(() => {
    setProgress(({ [recipeId]: _, ...data }) => data);
  }, [recipeId]);

  useEffect(() => {
    if (ingredients.length && !progress[recipeId]) {
      setRecipeProgress(Array(ingredients.length).fill(false));
    }
  }, [recipeId, setRecipeProgress, progress, ingredients]);

  const contextType = {
    recipe,
    setRecipe,
    ingredients,
    progress,
    setRecipeProgress,
    clearProgress,
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
