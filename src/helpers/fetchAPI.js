import {
  DRINKS_CATEGORY_ENDPOINT,
  MEALS_CATEGORY_ENDPOINT,
  NO_RECIPES_ERROR,
} from '../services/variables';

const FIRST_TWELVE = 12;
const FIRST_FIVE = 5;

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
    callback(data.slice(0, FIRST_TWELVE));
  });
}

function fetchCategory(endPoint, callback) {
  fetchAPI(endPoint, (data) => {
    callback(data.slice(0, FIRST_FIVE));
  });
}

export function fetchMealsCategory(callback) {
  fetchCategory(MEALS_CATEGORY_ENDPOINT, callback);
}

export function fetchDrinksCategory(callback) {
  fetchCategory(DRINKS_CATEGORY_ENDPOINT, callback);
}
