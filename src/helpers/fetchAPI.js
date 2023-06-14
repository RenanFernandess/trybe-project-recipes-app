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

async function fetchAPI(URL) {
  const response = await fetch(URL);
  const { meals, drinks } = await response.json();
  const data = meals || drinks || [];
  return data;
}

export default async function fetchRecipes(endPoint, callback, limit = FIRST_TWELVE) {
  const data = await fetchAPI(endPoint);
  if (!data.length) return global.alert(NO_RECIPES_ERROR);
  callback(limitData(data, limit));
}

export function fetchMeals(callback, limit) {
  fetchRecipes(MEALS_ENDPOINT, callback, limit);
}

export function fetchDrinks(callback, limit) {
  fetchRecipes(DRINKS_ENDPOINT, callback, limit);
}

export function fetchMealById(id, callback) {
  fetchRecipes(`${MEALS_DETAILS}${id}`, ([data]) => {
    callback(data);
  });
}

export function fetchDrinkById(id, callback) {
  fetchRecipes(`${DRINK_DETAILS}${id}`, ([data]) => {
    callback(data);
  });
}

async function fetchCategory(endPoint) {
  const data = await fetchAPI(endPoint);
  return limitData(data, FIRST_FIVE);
}

async function fetchRecipesAndCategories(recipesEndpoint, categoriesEndPoint) {
  const recipes = await fetchAPI(recipesEndpoint);
  const categories = await fetchCategory(categoriesEndPoint);
  if (!recipes.length) return global.alert(NO_RECIPES_ERROR);

  return { recipes: limitData(recipes, FIRST_TWELVE), categories };
}

export async function fetchMealsAndCategories(callback) {
  const data = await fetchRecipesAndCategories(MEALS_ENDPOINT, MEALS_CATEGORY_ENDPOINT);
  callback(data);
}

export async function fetchDrinksAndCategories(callback) {
  const data = await fetchRecipesAndCategories(DRINKS_ENDPOINT, DRINKS_CATEGORY_ENDPOINT);
  callback(data);
}
