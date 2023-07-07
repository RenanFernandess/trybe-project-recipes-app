import DRINKS_ORDINARY_DRINK_CATEGORY_MOCK, { DRINKS_COCKTAIL_CATEGORY_MOCK, DRINKS_COCOA_CATEGORY_MOCK, DRINKS_OTHER_OR_UNKNOWN_CATEGORY_MOCK, DRINKS_SHAKE_CATEGORY_MOCK } from './drinkCategoriesMock';
import DRINK_CATEGORIES_MOCK from './drinksCategoryMock';
import ALL_DRINKS_MOCK from './drinksMock';

const DRINK_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export default function getDrinks(url) {
  switch (url) {
  case `${DRINK_BASE_URL}/search.php?s=`:
    return Promise.resolve(ALL_DRINKS_MOCK);

  case `${DRINK_BASE_URL}/list.php?c=list`:
    return Promise.resolve(DRINK_CATEGORIES_MOCK);

  case `${DRINK_BASE_URL}/filter.php?c=Ordinary%20Drink`:
    return Promise.resolve(DRINKS_ORDINARY_DRINK_CATEGORY_MOCK);

  case `${DRINK_BASE_URL}/filter.php?c=Cocktail`:
    return Promise.resolve(DRINKS_COCKTAIL_CATEGORY_MOCK);

  case `${DRINK_BASE_URL}/filter.php?c=Shake`:
    return Promise.resolve(DRINKS_SHAKE_CATEGORY_MOCK);

  case `${DRINK_BASE_URL}/filter.php?c=Other%20/%20Unknown`:
    return Promise.resolve(DRINKS_OTHER_OR_UNKNOWN_CATEGORY_MOCK);

  case `${DRINK_BASE_URL}/filter.php?c=Cocoa`:
    return Promise.resolve(DRINKS_COCOA_CATEGORY_MOCK);

  default: return { drinks: [] };
  }
}
