import React, { useContext } from 'react';
import propTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import appContext from '../context/appContext';

export default function Recipes({ recipes, categorys, filterByCategory }) {
  console.log(categorys);
  const { setURL } = useContext(appContext);
  return (
    <section>
      <aside>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => { setURL(''); } }
        >
          All
        </button>
        {
          categorys.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ filterByCategory }
              value={ strCategory }
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
  categorys: propTypes.arrayOf({}),
  filterByCategory: propTypes.func,
}.isRequired;
