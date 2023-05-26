import React, { useContext } from 'react';
import RecipeCard from './RecipeCard';
import '../css/Recipes.css';
import RecipeContext from '../context';
import SearchByCategory from './SearchByCategory';

export default function Recipes() {
  const { recipes } = useContext(RecipeContext);

  return (
    <div>
      <SearchByCategory />
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
