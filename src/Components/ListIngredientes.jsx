import React, { useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeInProgressContext } from '../context';

export default function ListIngredientes() {
  const { id } = useParams();
  const {
    progress,
    setRecipeProgress,
    ingredients,
  } = useContext(RecipeInProgressContext);

  const checkIngredient = useCallback(({ target: { name: index, checked } }) => {
    const prog = [...progress[id]];
    prog[Number(index)] = checked;
    setRecipeProgress(prog);
  }, [progress, setRecipeProgress, id]);

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
              checked={ progress[id][index] }
            />
            { `${ingredient}: ${measure}` }
          </label>
        </li>
      ))}
    </ul>
  );
}
