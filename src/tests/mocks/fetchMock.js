import getDrinks from './drinks';
import getMeals from './meals';

const fetchMock = (url) => Promise.resolve({
  status: 200,
  json() {
    return url.includes('thecocktaildb') ? getDrinks(url) : getMeals(url);
  },
});

export default fetchMock;
