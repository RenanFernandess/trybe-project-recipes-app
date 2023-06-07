import React from 'react';
import PropTypes from 'prop-types';
import Text, { Container, Title } from './styles';

export default function RecipeInstructions({ text }) {
  return (
    <Container>
      <Title>Instructions</Title>
      <Text>{ text }</Text>
    </Container>
  );
}

RecipeInstructions.propTypes = {
  text: PropTypes.string.isRequired,
};
