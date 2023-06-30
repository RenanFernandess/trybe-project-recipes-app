import DONE_RECIPES_MOCK from './doneRecipesMock';
import FAVORITE_RECIPES_MOCK from './favoriteRecipesMock';

function getKeyValue(key) {
  switch (key) {
  case 'user':
    return 'jose_receitas@gmail.com';
  case 'doneRecipes':
    return DONE_RECIPES_MOCK;
  case 'favoriteRecipes':
    return FAVORITE_RECIPES_MOCK;

  default: return null;
  }
}

export default function getItemMock(key) {
  return JSON.stringify(getKeyValue(key));
}
