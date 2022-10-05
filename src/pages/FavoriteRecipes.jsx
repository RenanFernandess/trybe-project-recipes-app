import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import saveItem, { getItem } from '../helpers/storage';
import FavoriteCard from '../Components/FavoriteCard';
import { FAVORITE_RECIPES } from '../services/variables';

export default function FavoriteRecipes() {
  const [recipes, setRecipes] = useState(getItem(FAVORITE_RECIPES));
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filterValue, setFilterValue] = useState('All');

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(({ type }) => type === filterValue || filterValue === 'All'),
    );
  }, [setFilteredRecipes, recipes, filterValue]);

  const filterRecipes = ({ target: { name } }) => {
    setFilterValue(name);
  };

  const removeFavorite = (recipeId) => {
    const savedRecipes = getItem(FAVORITE_RECIPES);
    const recipesList = savedRecipes.filter(({ id }) => recipeId !== id);
    saveItem(FAVORITE_RECIPES, recipesList);
    setRecipes(recipesList);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <main>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            name="All"
            onClick={ filterRecipes }
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            type="button"
            name="meal"
            onClick={ filterRecipes }
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            name="drink"
            onClick={ filterRecipes }
          >
            Drinks
          </button>
        </div>
        <section>
          {
            filteredRecipes.map(({
              alcoholicOrNot,
              category,
              id,
              image,
              name,
              nationality,
              type,
            }, index) => (
              <FavoriteCard
                key={ id }
                alcoholicOrNot={ alcoholicOrNot }
                category={ category }
                id={ id }
                index={ index }
                image={ image }
                isFavorite={ recipes.some(({ id: recipeId }) => recipeId === id) }
                name={ name }
                nationality={ nationality }
                removeFavorite={ removeFavorite }
                type={ type }
              />
            ))
          }
        </section>
      </main>
    </div>
  );
}
