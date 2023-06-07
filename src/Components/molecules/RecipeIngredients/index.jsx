import React from 'react';
import PropTypes from 'prop-types';
import List, { Container, Title } from './styles';

export default function RecipeIngredients({ ingredients }) {
  return (
    <Container>
      <Title>Ingredients</Title>
      <List>
        { ingredients.map(({ ingredient, measure }, index) => (
          <li key={ `${index}${ingredient}` }>
            { `${ingredient}: ${measure}` }
          </li>
        ))}
      </List>
    </Container>
  );
}

RecipeIngredients.propTypes = {
  ingredients: PropTypes.arrayOf().isRequired,
};
