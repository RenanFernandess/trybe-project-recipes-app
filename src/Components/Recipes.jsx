import React from 'react';
import propTypes from 'prop-types';
import RecipeCard from './RecipeCard';

export default function Recipes({ recipes, categorys }) {
  console.log(categorys);
  return (
    <section>
      <aside>
        {
          categorys.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          ))
        }
      </aside>
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
    </section>
  );
}

Recipes.propTypes = {
  meals: propTypes.arrayOf({}),
}.isRequired;
