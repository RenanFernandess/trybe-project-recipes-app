import React from 'react';
import PropTypes from 'prop-types';
import Img from './styles';

export default function RecipeImage({ src, alt, ...res }) {
  return (
    <Img
      { ...res }
      src={ src }
      alt={ alt }
    />
  );
}

RecipeImage.propTypes = {
  src: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
};
