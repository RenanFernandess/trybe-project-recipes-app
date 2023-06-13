import React from 'react';
import PropTypes from 'prop-types';
import Title, { Container } from './styles';

export default function HorizontalCardTitle({ title, nationality, category }) {
  return (
    <Container>
      <Title>{title}</Title>
      <p>
        { nationality }
        { nationality && ' - ' }
        { category }
      </p>
    </Container>
  );
}

HorizontalCardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
