import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import '../css/Recipes.css';
import appContext from '../context/appContext';

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
    <div>
      <aside className="group-btn">
        <button
          type="button"
          className="btn"
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
              className="btn"
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
      <section className="card-container">
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
      </section>
    </div>
  );
}

Recipes.propTypes = {
  meals: propTypes.arrayOf({}),
  categorys: propTypes.arrayOf({}),
  filterByCategory: propTypes.func,
}.isRequired;
