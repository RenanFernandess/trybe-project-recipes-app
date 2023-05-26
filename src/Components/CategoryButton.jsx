import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryButton({ children, testId, onClick, value }) {
  return (
    <button
      type="button"
      className="btn"
      data-testid={ testId }
      onClick={ onClick }
      value={ value }
    >
      { children }
    </button>
  );
}

CategoryButton.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
