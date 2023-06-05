import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from './styles';

export default function Button({ children, onClick, ...res }) {
  return (
    <PrimaryButton
      { ...res }
      type="button"
      onClick={ onClick }
    >
      { children }
    </PrimaryButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
