import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { getItem } from '../helpers/storage';
import { DONE_RECIPES } from '../services/variables';
import DoneRecipeCard from '../Components/DoneRecipeCard';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const savedRecipes = getItem(DONE_RECIPES) || [];
    setRecipes(savedRecipes);
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <main>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            type="button"
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
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
