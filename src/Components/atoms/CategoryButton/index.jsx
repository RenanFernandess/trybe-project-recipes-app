import React from 'react';
import PropTypes from 'prop-types';
import Button, { Text } from './styles';

export default function CategoryButton({ onClick, icon, alt, text, ...res }) {
  return (
    <Button
      { ...res }
      type="button"
      name={ text }
      onClick={ onClick }
    >
      <img src={ icon } alt={ alt } />
      <Text>{ text }</Text>
    </Button>
  );
}

CategoryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
