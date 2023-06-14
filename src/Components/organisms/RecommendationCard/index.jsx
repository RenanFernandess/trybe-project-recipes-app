import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CardImage } from '../../atoms';
import ContainerLink, { Text } from './styles';

export default function RecommendationCard({ name, thumb, id }) {
  const { location: { pathname } } = useHistory();
  const TYPE = pathname.includes('meals') ? 'drinks' : 'meals';
  const PATH = `/${TYPE}/${id}`;

  return (
    <ContainerLink to={ PATH }>
      <CardImage
        src={ thumb }
        alt={ name }
      />
      <Text>{ name }</Text>
    </ContainerLink>
  );
}

RecommendationCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
