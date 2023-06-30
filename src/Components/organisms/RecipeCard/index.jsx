import React from 'react';
import PropTypes from 'prop-types';
import { CardImage } from '../../atoms';
import ContainerLink, { Text } from './styles';

export default function RecipeCard({ name, thumb, id }) {
  return (
    <ContainerLink to={ ({ pathname }) => `${pathname}/${id}` }>
      <CardImage
        src={ thumb }
        alt={ name }
      />
      <Text>{ name }</Text>
    </ContainerLink>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
