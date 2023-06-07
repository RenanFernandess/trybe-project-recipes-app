import React from 'react';
import PropTypes from 'prop-types';
import Text, { Title } from './styles';

export default function RecipeInstructions({ text }) {
  return (
    <article>
      <Title>Instructions</Title>
      <Text>{ text }</Text>
    </article>
  );
}

RecipeInstructions.propTypes = {
  text: PropTypes.string.isRequired,
};
