export const MEALSTOKEN = 'mealsToken';
export const DRINKS_TOKEN = 'drinksToken';
export const DONE_RECIPES = 'doneRecipes';
export const FAVORITE_RECIPES = 'favoriteRecipes';
export const IN_PROGRESS_RECIPES = 'inProgressRecipes';
const USER = 'user';
export default USER;

export const MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const DRINKS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const MEALS_CATEGORY_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_CATEGORY_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const MEALS_FILTER_BY_CATEGOTY_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
export const DRINKS_FILTER_BY_CATEGOTY_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
export const MEALS_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const DRINK_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
export const MEALS_INGREDIENT_EDNPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
export const DRINK_INGREDIENT_EDNPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
export const MEALS_FIRST_LETTER_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
export const DRINK_FIRST_LETTER_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const URLS_BY_PAGE = {
  Meals: {
    nome: MEALS_ENDPOINT,
    ingredient: MEALS_INGREDIENT_EDNPOINT,
    firstLetter: MEALS_FIRST_LETTER_ENDPOINT,
  },
  Drinks: {
    nome: DRINKS_ENDPOINT,
    ingredient: DRINK_INGREDIENT_EDNPOINT,
    firstLetter: DRINK_FIRST_LETTER_ENDPOINT,
  },
};

export const FIRST_TWELVE = 12;
export const FIRST_FIVE = 5;
export const FIRST_SIX = 6;
export const INGREDIENTS_NUMBER = 20;

export const NO_RECIPES_ERROR = 'Sorry, we haven\'t found any recipes for these filters.';
export const NAME_LENGTH_ERROR = 'Your search must have only 1 (one) character';

export const REGEX_INGREDIENT = /^stringredient/i;
export const REGEX_MEASURE = /^strmeasure/i;

export const PAGES_TITLE = ['Meals', 'Drinks'];
