import React from 'react';
import PropTypes from 'prop-types';
import Text from './styles';

export default function RecipeCategory({ icon, category }) {
  return (
    <Text>
      <img src={ icon } alt="Recipe category" />
      { category }
    </Text>
  );
}

RecipeCategory.propTypes = {
  icon: PropTypes.node.isRequired,
  category: PropTypes.string.isRequired,
};
