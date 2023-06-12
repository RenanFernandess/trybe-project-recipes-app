import React from 'react';
import PropTypes from 'prop-types';
import Img from './styles';

export default function HorizontalCardImage({ src, alt, ...res }) {
  return (
    <Img
      { ...res }
      src={ src }
      alt={ alt }
    />
  );
}

HorizontalCardImage.propTypes = {
  src: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
};
