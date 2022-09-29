import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import appContext from '../context/appContext';
import { RecipesContainer } from '../styles/styles';

const ALL = 'All';
export default function Recipes({ recipes, categorys, filterByCategory }) {
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
      <RecipesContainer>
        {
          recipes.map(({
            strMealThumb,
            strDrinkThumb,
            strMeal,
            strDrink,
            idMeal,
            idDrink,
          }, index) => {
            const thumb = strMealThumb || strDrinkThumb;
            const name = strMeal || strDrink;
            const id = idMeal || idDrink;

            return (
              <RecipeCard
                key={ id }
                name={ name }
                thumb={ thumb }
                index={ index }
                id={ id }
              />
            );
          })
        }
      </RecipesContainer>
    </section>
  );
}

Recipes.propTypes = {
  meals: propTypes.arrayOf({}),
  categorys: propTypes.arrayOf({}),
  filterByCategory: propTypes.func,
}.isRequired;
