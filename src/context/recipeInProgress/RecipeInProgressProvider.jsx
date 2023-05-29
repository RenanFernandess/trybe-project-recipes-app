import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgressContext from './recipeInProgressContext';
import getIngredients from '../../helpers/getIngredients';
import { IN_PROGRESS_RECIPES } from '../../services/variables';
import saveItem, { getItem } from '../../helpers/storage';

const INITIAL_STATE = getItem(IN_PROGRESS_RECIPES) || {
  recipe: {},
  ingredients: [],
  progress: [],
};
export default function RecipeInProgressProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => { saveItem(IN_PROGRESS_RECIPES, state); }, [state]);

  const setRecipe = useCallback(([recipe]) => {
    const ingredients = getIngredients(recipe);
    const progress = Array(ingredients.length).fill(false);
    setState({ recipe, ingredients, progress });
  }, []);

  const setProgress = useCallback((progress) => {
    setState((prevState) => ({ ...prevState, progress }));
  }, []);

  const clearRecipe = useCallback(() => { setState(INITIAL_STATE); }, []);

  const contextType = {
    ...state,
    setRecipe,
    setProgress,
    clearRecipe,
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
