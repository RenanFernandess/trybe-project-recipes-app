import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FAVORITE_RECIPES } from '../services/variables';
import saveItem, { getItem } from '../helpers/storage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteButton({
  recipe: {
    strArea, strCategory,
    idMeal, idDrink, strAlcoholic, strMeal,
    strDrink, strDrinkThumb, strMealThumb,
  },
  testId, idRecipe,
}) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const checkPath = pathname.includes('meals');
  const getFavRecipes = getItem(FAVORITE_RECIPES) || [];
  const [isFavorite, setIsFavorite] = useState(getFavRecipes
    .some((favRecipe) => favRecipe.id === idRecipe));

  const saveFavoriteRecipe = () => {
    if (isFavorite) {
      const newFavLS = getFavRecipes.filter((favRecipe) => favRecipe.id !== idRecipe);
      saveItem(FAVORITE_RECIPES, newFavLS);
      return setIsFavorite(false);
    }
    const favStorageFormat = {
      id: idMeal || idDrink,
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
    <button
      type="button"
      data-testid={ testId }
      onClick={ saveFavoriteRecipe }
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
    >
      { isFavorite ? (
        <img alt="not-favorite" src={ blackHeartIcon } />
      ) : (
        <img alt="favorite" src={ whiteHeartIcon } />)}
      Favorite
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
  testId: propTypes.string.isRequired,
  idRecipe: propTypes.string.isRequired,
};
