import ALL_DRINKS_MOCK, { DRINK_CATEGORIES_MOCK, SHAKE_DRINK_MOCK } from './drinksMock';
import { ALL_MEALS_MOCK, MEALS_CATEGORIES, SEARCHED_MEALS_BY_FIRST_LETTER, SEARCHED_MEALS_BY_INGREDIENTES, SEARCHED_MEALS_BY_NAME } from './mealsMock';

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

  case `${MEALS_BASE_URL}/filter.php?c=`:
    return Promise.resolve();

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
