import React, { useContext } from 'react';
import { RecipeInProgressContext } from '../../../context';
import List, { Container, Title } from './styles';
import { Ingredient } from '../../molecules';

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
    <Container>
      <Title>Ingredients</Title>
      <List>
        { ingredients.map(({ ingredient, measure }, index) => (
          <Ingredient
            key={ `${index}${ingredient}` }
            ingredient={ ingredient }
            measure={ measure }
            index={ index }
            checked={ progress[index] }
            checkIngredient={ checkIngredient }
          />
        ))}
      </List>
    </Container>
  );
}
