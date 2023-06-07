import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FAVORITE_RECIPES } from '../../../services/variables';
import saveItem, { getItem } from '../../../helpers/storage';
import { ButtonIcon } from '../../atoms';
import { likeIcon, likedIcon } from '../../../assets';

export default function FavoriteButton({ recipe }) {
  const getFavRecipes = getItem(FAVORITE_RECIPES) || [];
  const { location: { pathname } } = useHistory();
  const {
    strArea,
    strCategory,
    idMeal,
    idDrink,
    strAlcoholic,
    strMeal,
    strDrink,
    strDrinkThumb,
    strMealThumb,
  } = recipe;
  const RECIPE_ID = idMeal || idDrink;

  const [isFavorite, setIsFavorite] = useState(
    getFavRecipes.some((favRecipe) => favRecipe.id === RECIPE_ID),
  );
  const checkPath = pathname.includes('meals');

  const saveFavoriteRecipe = () => {
    if (isFavorite) {
      const newFavLS = getFavRecipes.filter((favRecipe) => favRecipe.id !== RECIPE_ID);
      saveItem(FAVORITE_RECIPES, newFavLS);
      return setIsFavorite(false);
    }
    const favStorageFormat = {
      id: RECIPE_ID,
      type: checkPath ? 'meal' : 'drink',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
    };
    const union = [...getFavRecipes, favStorageFormat];
    saveItem(FAVORITE_RECIPES, union);
    setIsFavorite(true);
  };

  return (
    <ButtonIcon
      onClick={ saveFavoriteRecipe }
      icon={ isFavorite ? likedIcon : likeIcon }
      alt="Favorite button"
    />
  );
}

FavoriteButton.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
};
