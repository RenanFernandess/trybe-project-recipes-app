import React from 'react';
import PropTypes from 'prop-types';
import Title, { Category, Container } from './styles';

export default function HorizontalCardTitle({ title, nationality, category }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Category>
        { nationality }
        { nationality && ' - ' }
        { category }
      </Category>
    </Container>
  );
}

HorizontalCardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
