import React, { useState } from 'react';
import Header from '../Components/Header';
import { getItem } from '../helpers/storage';
import { DONE_RECIPES } from '../services/variables';
import DoneRecipeCard from '../Components/DoneRecipeCard';

export default function DoneRecipes() {
  const savedRecipes = getItem(DONE_RECIPES) || [];
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
              doneDate,
              id,
              image,
              name,
              nationality,
              tags,
              type,
            }, index) => (
              <DoneRecipeCard
                key={ id }
                alcoholicOrNot={ alcoholicOrNot }
                category={ category }
                date={ doneDate }
                id={ id }
                index={ index }
                image={ image }
                name={ name }
                nationality={ nationality }
                tags={ tags }
                type={ type }
              />
            ))
          }
        </section>
      </main>
    </div>
  );
}
