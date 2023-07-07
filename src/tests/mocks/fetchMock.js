import ALL_DRINKS_MOCK, { DRINK_CATEGORIES_MOCK, SHAKE_DRINK_MOCK } from './drinksMock';
import {
  ALL_MEALS_MOCK,
  MEALS_BEEF_CATEGORY,
  MEALS_BREAKFAST_CATEGORY,
  MEALS_CATEGORIES,
  MEALS_CHICKEN_CATEGORY,
  MEALS_DESSERT_CATEGORY,
  MEALS_GOAT_CATEGORY,
  SEARCHED_MEALS_BY_FIRST_LETTER,
  SEARCHED_MEALS_BY_INGREDIENTES,
  SEARCHED_MEALS_BY_NAME,
} from './mealsMock';

const DRINK_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
const MEALS_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

function getDrinks(url) {
  switch (url) {
  case `${DRINK_BASE_URL}/search.php?s=`:
    return Promise.resolve(ALL_DRINKS_MOCK);

  case `${DRINK_BASE_URL}/list.php?c=list`:
    return Promise.resolve(DRINK_CATEGORIES_MOCK);

  case `${DRINK_BASE_URL}/filter.php?c=Shake`:
    return Promise.resolve(SHAKE_DRINK_MOCK);

  default: return { drinks: [] };
  }
}

function getMeals(url) {
  switch (url) {
  case `${MEALS_BASE_URL}/search.php?s=`:
    return Promise.resolve(ALL_MEALS_MOCK);

  case `${MEALS_BASE_URL}/list.php?c=list`:
    return Promise.resolve(MEALS_CATEGORIES);

  case `${MEALS_BASE_URL}/filter.php?i=lime`:
    return Promise.resolve(SEARCHED_MEALS_BY_INGREDIENTES);

  case `${MEALS_BASE_URL}/search.php?s=fish`:
    return Promise.resolve(SEARCHED_MEALS_BY_NAME);

  case `${MEALS_BASE_URL}/search.php?f=H`:
    return Promise.resolve(SEARCHED_MEALS_BY_FIRST_LETTER);

  case `${MEALS_BASE_URL}/filter.php?c=Beef`:
    return Promise.resolve(MEALS_BEEF_CATEGORY);

  case `${MEALS_BASE_URL}/filter.php?c=Breakfast`:
    return Promise.resolve(MEALS_BREAKFAST_CATEGORY);

  case `${MEALS_BASE_URL}/filter.php?c=Chicken`:
    return Promise.resolve(MEALS_CHICKEN_CATEGORY);

  case `${MEALS_BASE_URL}/filter.php?c=Dessert`:
    return Promise.resolve(MEALS_DESSERT_CATEGORY);

  case `${MEALS_BASE_URL}/filter.php?c=Goat`:
    return Promise.resolve(MEALS_GOAT_CATEGORY);

  default: return { meals: [] };
  }
}

const fetchMock = (url) => Promise.resolve({
  status: 200,
  json() {
    return url.includes('thecocktaildb') ? getDrinks(url) : getMeals(url);
  },
});

export default fetchMock;
