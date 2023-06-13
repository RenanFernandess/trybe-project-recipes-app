import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './recipeContext';

export default function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const contextType = {
    recipes,
    categories,
    setRecipes,
    setCategories,
  };

  return (
    <RecipeContext.Provider value={ contextType }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
