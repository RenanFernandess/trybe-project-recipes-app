import { FIRST_FIVE, FIRST_TWELVE, NO_RECIPES_ERROR } from '../services/variables';

export default function fetchAPI(URL, callback) {
  fetch(URL).then((respose) => respose.json())
    .then(({ meals, drinks }) => {
      const result = meals || drinks || [];
      callback(result);
    });
}

export function fetchRecipes(endPoint, callback, numberOfElements = FIRST_TWELVE) {
  fetchAPI(endPoint, (result) => {
    const resultLength = result.length;
    if (!resultLength) return global.alert(NO_RECIPES_ERROR);
    const LAST_INDEX = resultLength < numberOfElements ? resultLength : numberOfElements;
    callback(result.slice(0, LAST_INDEX));
  });
}

export function fetchCategory(endPoint, callback) {
  fetchAPI(endPoint, (result) => {
    callback(result.slice(0, FIRST_FIVE));
  });
}
