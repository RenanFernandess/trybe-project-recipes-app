import React, { useState } from 'react';
import Header from '../Components/Header';
import { getItem } from '../helpers/storage';
import FavoriteCard from '../Components/FavoriteCard';
import { FAVORITE_RECIPES } from '../services/variables';

export default function FavoriteRecipes() {
  const savedRecipes = getItem(FAVORITE_RECIPES) || [];
  const [recipes, setRecipes] = useState(savedRecipes);

  const filterRecipes = ({ target: { name } }) => {
    setRecipes(
      savedRecipes.filter(({ type }) => type === name || name === 'All'),
    );
  };

  console.log(recipes);

  return (
    <div>
      <Header title="Done Recipes" />
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
          <p>p</p>
          {
            recipes.map(({
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
                name={ name }
                nationality={ nationality }
                type={ type }
              />
            ))
          }
        </section>
      </main>
    </div>
  );
}
