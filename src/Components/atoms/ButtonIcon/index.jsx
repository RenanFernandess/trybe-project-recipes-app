import React from 'react';
import PropTypes from 'prop-types';
import Button from './styles';

export default function ButtonIcon({ onClick, icon, alt, ...res }) {
  return (
    <Button
      { ...res }
      type="button"
      onClick={ onClick }
    >
      <img src={ icon } alt={ alt } />
    </Button>
  );
}

ButtonIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
};
