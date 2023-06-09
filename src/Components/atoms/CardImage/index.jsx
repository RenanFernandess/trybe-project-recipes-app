import React from 'react';
import PropTypes from 'prop-types';
import Img from './styles';

export default function CardImage({ src, alt, ...res }) {
  return (
    <Img
      { ...res }
      src={ src }
      alt={ alt }
    />
  );
}

CardImage.propTypes = {
  src: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
};
