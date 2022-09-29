import { FIRST_TWELVE, NO_RECIPES_ERROR } from '../services/variables';

export default function fetchAPI(URL, callback) {
  fetch(URL).then((respose) => respose.json())
    .then(({ meals, drinks }) => {
      const result = meals || drinks || [];
      callback(result);
    });
}

export function fetchRecipes(endPoint, callback) {
  fetchAPI(endPoint, (result) => {
    if (!result.length) return global.alert(NO_RECIPES_ERROR);
    const LAST_INDEX = (result.length < FIRST_TWELVE) ? result.length : FIRST_TWELVE;
    callback(result.slice(0, LAST_INDEX));
  });
}
