import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
import { FAVORITE_RECIPES } from '../../services/variables';
import saveItem, { getItem } from '../../helpers/storage';

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getItem(FAVORITE_RECIPES) || []);

  useEffect(() => { saveItem(FAVORITE_RECIPES, favorites); }, [favorites]);

  const addToFavorite = useCallback((recipe) => {
    setFavorites((state) => [...state, recipe]);
  }, []);

  const removeToFavorite = useCallback((id) => {
    setFavorites((state) => state.filter((recipe) => recipe.id === id));
  }, []);

  const contextType = {
    favorites,
    addToFavorite,
    removeToFavorite,
  };

  return (
    <FavoritesContext.Provider value={ contextType }>
      { children }
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
