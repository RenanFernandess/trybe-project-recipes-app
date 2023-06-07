import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CardImage } from '../../atoms';
import ContainerLink, { Text } from './styles';

export default function RecipeCard({ name, thumb, id }) {
  const { location: { pathname } } = useHistory();
  return (
    <ContainerLink to={ `${pathname}/${id}` }>
      <CardImage
        src={ thumb }
        alt={ name }
      />
      <Text>{ name }</Text>
    </ContainerLink>
  );
}
RecipeCard.propTypes = {
  name: propTypes.string,
  thumb: propTypes.string,
  index: propTypes.number,
  id: propTypes.number,
}.isRequired;
