import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
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
              id,
              category,
              name,
              image,
              tags,
              doneDate,
            }, index) => (
              <DoneRecipeCard
                key={ id }
                name={ name }
                index={ index }
                id={ id }
                image={ image }
                category={ category }
                date={ doneDate }
                tags={ tags }
              />
            ))
          }
        </section>
      </main>
      <Footer />
    </div>
  );
}
