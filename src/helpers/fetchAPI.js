import {
  DRINKS_CATEGORY_ENDPOINT,
  DRINKS_ENDPOINT,
  DRINK_DETAILS,
  MEALS_CATEGORY_ENDPOINT,
  MEALS_DETAILS,
  MEALS_ENDPOINT,
  NO_RECIPES_ERROR,
} from '../services/variables';

const FIRST_TWELVE = 12;
const FIRST_FIVE = 5;

const limitData = (data, limit) => data.slice(0, limit);

function fetchAPI(URL, callback) {
  fetch(URL).then((response) => response.json())
    .then(({ meals, drinks }) => {
      const data = meals || drinks || [];
      callback(data);
    });
}

export default function fetchRecipes(endPoint, callback, limit = FIRST_TWELVE) {
  fetchAPI(endPoint, (data) => {
    if (!data.length) return global.alert(NO_RECIPES_ERROR);
    callback(limitData(data, limit));
  });
}

export function fetchMeals(callback, limit) {
  fetchRecipes(MEALS_ENDPOINT, callback, limit);
}

export function fetchDrinks(callback, limit) {
  fetchRecipes(DRINKS_ENDPOINT, callback, limit);
}

export function fetchMealById(id, callback) {
  fetchRecipes(`${MEALS_DETAILS}${id}`, callback);
}

export function fetchDrinkById(id, callback) {
  fetchRecipes(`${DRINK_DETAILS}${id}`, callback);
}

function fetchCategory(endPoint, callback) {
  fetchAPI(endPoint, (data) => {
    callback(limitData(data, FIRST_FIVE));
  });
}

export function fetchMealsCategory(callback) {
  fetchCategory(MEALS_CATEGORY_ENDPOINT, callback);
}

export function fetchDrinksCategory(callback) {
  fetchCategory(DRINKS_CATEGORY_ENDPOINT, callback);
}
