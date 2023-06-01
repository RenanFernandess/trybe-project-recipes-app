import React, { useCallback, useContext } from 'react';
import { RecipeInProgressContext } from '../context';

export default function ListIngredientes() {
  const {
    progress,
    setRecipeProgress,
    ingredients,
  } = useContext(RecipeInProgressContext);

  const checkIngredient = useCallback(({ target: { name: index, checked } }) => {
    const prog = [...progress];
    prog[Number(index)] = checked;
    setRecipeProgress(prog);
  }, [progress, setRecipeProgress]);

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
