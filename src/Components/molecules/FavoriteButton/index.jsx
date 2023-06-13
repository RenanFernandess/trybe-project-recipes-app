import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ButtonIcon } from '../../atoms';
import { likeIcon, likedIcon } from '../../../assets';
import { FavoritesContext } from '../../../context';

export default function FavoriteButton({ recipe }) {
  const { favorites, addToFavorite, removeToFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.some(({ id }) => id === recipe.id);

  const toggleFavorite = () => {
    if (isFavorite) return removeToFavorite(recipe.id);
    addToFavorite(recipe);
  };

  return (
    <ButtonIcon
      onClick={ toggleFavorite }
      icon={ isFavorite ? likedIcon : likeIcon }
      alt="Favorite button"
    />
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};
