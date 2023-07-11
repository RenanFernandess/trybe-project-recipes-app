import ALL_MEALS_MOCK from './mealsMock';
import MEALS_CATEGORIES_MOCK from './mealsCategoriesMock';
import SEARCHED_MEALS_BY_INGREDIENTES_MOCK, { SEARCHED_MEALS_BY_FIRST_LETTER_MOCK, SEARCHED_MEALS_BY_NAME_MOCK } from './searchMealsMock';
import MEALS_BEEF_CATEGORY_MOCK, { MEALS_BREAKFAST_CATEGORY_MOCK, MEALS_CHICKEN_CATEGORY_MOCK, MEALS_DESSERT_CATEGORY_MOCK, MEALS_GOAT_CATEGORY_MOCK } from './searchMealsByCategoryMock';
import { getUrlId } from '../../helpers';

const MEALS_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const RECIPE_ENDPOINT_REGEX = new RegExp(`${MEALS_BASE_URL}/lookup.php\\?i=\\d+`);

const getMeal = (url) => {
  const id = getUrlId(url);
  const meal = ALL_MEALS_MOCK.meals.find(({ idMeal }) => idMeal === id);
  return { meals: [meal] };
};

export default function getMeals(url) {
  if (RECIPE_ENDPOINT_REGEX.test(url)) {
    return Promise.resolve(getMeal(url));
  }
  switch (url) {
  case `${MEALS_BASE_URL}/search.php?s=`:
    return Promise.resolve(ALL_MEALS_MOCK);

  case `${MEALS_BASE_URL}/list.php?c=list`:
    return Promise.resolve(MEALS_CATEGORIES_MOCK);

  case `${MEALS_BASE_URL}/filter.php?i=lime`:
    return Promise.resolve(SEARCHED_MEALS_BY_INGREDIENTES_MOCK);

  case `${MEALS_BASE_URL}/search.php?s=fish`:
    return Promise.resolve(SEARCHED_MEALS_BY_NAME_MOCK);

  case `${MEALS_BASE_URL}/search.php?f=H`:
    return Promise.resolve(SEARCHED_MEALS_BY_FIRST_LETTER_MOCK);

  case `${MEALS_BASE_URL}/filter.php?c=Beef`:
    return Promise.resolve(MEALS_BEEF_CATEGORY_MOCK);

  case `${MEALS_BASE_URL}/filter.php?c=Breakfast`:
    return Promise.resolve(MEALS_BREAKFAST_CATEGORY_MOCK);

  case `${MEALS_BASE_URL}/filter.php?c=Chicken`:
    return Promise.resolve(MEALS_CHICKEN_CATEGORY_MOCK);

  case `${MEALS_BASE_URL}/filter.php?c=Dessert`:
    return Promise.resolve(MEALS_DESSERT_CATEGORY_MOCK);

  case `${MEALS_BASE_URL}/filter.php?c=Goat`:
    return Promise.resolve(MEALS_GOAT_CATEGORY_MOCK);

  default: return { meals: [] };
  }
}
