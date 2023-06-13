import React, { useContext } from 'react';
import { RecipeCard } from '../../organisms';
import RecipeContext from '../../../context';
import Container from './styles';

export default function Recipes() {
  const { recipes } = useContext(RecipeContext);

  return (
    <Container>
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
    </Container>
  );
}
