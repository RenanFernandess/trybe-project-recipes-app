import React, { useContext } from 'react';
import { RecipeInProgressContext } from '../../../context';

export default function ListIngredientes() {
  const {
    progress,
    setRecipeProgress,
    ingredients,
  } = useContext(RecipeInProgressContext);

  const checkIngredient = ({ target: { name: index, checked } }) => {
    const prog = [...progress];
    prog[Number(index)] = checked;
    setRecipeProgress(prog);
  };

  return (
    <ul>
      { ingredients.map(({ ingredient, measure }, index) => (
        <li key={ `${index}${ingredient}` }>
          <label
            htmlFor={ ingredient }
            name={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ ingredient }
              name={ index }
              onChange={ checkIngredient }
              checked={ progress[index] }
            />
            { `${ingredient}: ${measure}` }
          </label>
        </li>
      ))}
    </ul>
  );
}
