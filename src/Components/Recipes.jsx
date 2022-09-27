import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import appContext from '../context/appContext';

const ALL = 'All';
export default function Recipes({ recipes, categorys, filterByCategory }) {
  console.log('recipes: ', recipes);
  const [category, setCategory] = useState(ALL);
  const { setURL } = useContext(appContext);

  const toggleCategory = ({ target: { value } }) => {
    if (category === value || value === ALL) {
      setCategory(ALL);
      return setURL('');
    }
    setCategory(value);
    filterByCategory(value);
  };

  return (
    <section>
      <aside>
        <button
          type="button"
          data-testid="All-category-filter"
          value="All"
          onClick={ toggleCategory }
        >
          All
        </button>
        {
          categorys.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ toggleCategory }
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
