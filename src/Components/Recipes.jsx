import React from 'react';
import propTypes from 'prop-types';
import RecipeCard from './RecipeCard';

export default function Recipes({ meals, drinks }) {
  const recipes = meals || drinks;

  console.log(recipes);
  return (
    <section>
      {
        recipes.map(({
          strMealThumb,
          strDrinkThumb,
          strMeal,
          strDrink,
        }, index) => {
          const thumb = strMealThumb || strDrinkThumb;
          const name = strMeal || strDrink;

          return (
            <RecipeCard
              key={ name }
              name={ name }
              thumb={ thumb }
              index={ index }
            />
          );
        })
      }
    </section>
  );
}

Recipes.propTypes = {
  meals: propTypes.arrayOf({}),
}.isRequired;
