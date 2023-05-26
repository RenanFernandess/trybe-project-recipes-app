import {
  DRINKS_CATEGORY_ENDPOINT,
  DRINKS_ENDPOINT,
  MEALS_CATEGORY_ENDPOINT,
  MEALS_ENDPOINT,
  NO_RECIPES_ERROR,
} from '../services/variables';

const FIRST_TWELVE = 12;
const FIRST_FIVE = 5;

const limitData = (data, limit) => data.slice(0, limit);

export default function fetchAPI(URL, callback) {
  console.log(URL);
  fetch(URL).then((response) => response.json())
    .then(({ meals, drinks }) => {
      const data = meals || drinks || [];
      callback(data);
    });
}

export function fetchRecipes(endPoint, callback) {
  fetchAPI(endPoint, (data) => {
    if (!data.length) return global.alert(NO_RECIPES_ERROR);
    callback(limitData(data, FIRST_TWELVE));
  });
}

export function fetchMeals(callback) {
  fetchRecipes(MEALS_ENDPOINT, callback);
}

export function fetchDrinks(callback) {
  fetchRecipes(DRINKS_ENDPOINT, callback);
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
