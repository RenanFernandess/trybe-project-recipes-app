import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgressContext from './recipeInProgressContext';
import getIngredients from '../../helpers/getIngredients';

export default function RecipeInProgressProvider({ children }) {
  const [state, setState] = useState({
    recipe: {},
    ingredients: [],
    progress: [],
  });

  const setRecipe = useCallback(([recipe]) => {
    const ingredients = getIngredients(recipe);
    const progress = Array(ingredients.length).fill(false);
    setState({ recipe, ingredients, progress });
  }, []);

  const setProgress = useCallback((progress) => {
    setState((prevState) => ({
      ...prevState,
      progress,
    }));
  }, []);

  const contextType = {
    ...state,
    setRecipe,
    setProgress,
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
