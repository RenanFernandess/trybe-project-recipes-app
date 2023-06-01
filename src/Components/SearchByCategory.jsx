import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import {
  DRINKS_FILTER_BY_CATEGORY_ENDPOINT,
  MEALS_FILTER_BY_CATEGORY_ENDPOINT } from '../services/variables';
import RecipeContext from '../context';
import
fetchRecipes,
{
  fetchDrinks,
  fetchDrinksCategory,
  fetchMeals,
  fetchMealsCategory,
} from '../helpers/fetchAPI';

const ALL_CATEGORIES = 'All';
const CATEGORY_TYPE = {
  '/meals': fetchMealsCategory,
  '/drinks': fetchDrinksCategory,
};

export default function SearchByCategory() {
  const { location: { pathname } } = useHistory();
  const { setRecipes } = useContext(RecipeContext);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(ALL_CATEGORIES);

  useEffect(() => {
    CATEGORY_TYPE[pathname](setCategories);
  }, [pathname]);

  const searchByCategory = (value) => {
    const endpoint = pathname === '/meals'
      ? MEALS_FILTER_BY_CATEGORY_ENDPOINT
      : DRINKS_FILTER_BY_CATEGORY_ENDPOINT;
    fetchRecipes(`${endpoint}${value}`, setRecipes);
  };

  const setAllCategory = () => {
    setCategory(ALL_CATEGORIES);
    if (pathname === '/meals') return fetchMeals(setRecipes);
    fetchDrinks(setRecipes);
  };

  const toggleCategory = ({ target: { value } }) => {
    if (category === value) return setAllCategory();
    setCategory(value);
    searchByCategory(value);
  };

  return (
    <aside className="group-btn">
      <CategoryButton
        testId="All-category-filter"
        value="All"
        onClick={ setAllCategory }
      >
        All
      </CategoryButton>
      {
        categories.map(({ strCategory }) => (
          <CategoryButton
            key={ strCategory }
            value={ strCategory }
            onClick={ toggleCategory }
            testId={ `${strCategory}-category-filter` }
          >
            { strCategory }
          </CategoryButton>
        ))
      }
    </aside>
  );
}
