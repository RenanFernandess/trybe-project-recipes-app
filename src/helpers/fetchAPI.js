import { FIRST_FIVE, FIRST_TWELVE, NO_RECIPES_ERROR } from '../services/variables';

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

export function fetchCategory(endPoint, callback) {
  fetchAPI(endPoint, (data) => {
    callback(data.slice(0, FIRST_FIVE));
  });
}
