import ALL_DRINKS_MOCK, { DRINK_CATEGORIES_MOCK, SHAKE_DRINK_MOCK } from './drinksMock';

const DRINK_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

const fetchMock = (url) => Promise.resolve({
  status: 200,
  json() {
    switch (url) {
    case `${DRINK_BASE_URL}/search.php?s=`:
      return Promise.resolve(ALL_DRINKS_MOCK);

    case `${DRINK_BASE_URL}/list.php?c=list`:
      return Promise.resolve(DRINK_CATEGORIES_MOCK);

    case `${DRINK_BASE_URL}/filter.php?c=Shake`:
      return Promise.resolve(SHAKE_DRINK_MOCK);

    default: return { meals: [], drinks: [] };
    }
  },
});

export default fetchMock;
