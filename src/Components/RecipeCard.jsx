import React from 'react';
import propTypes from 'prop-types';

export default function RecipeCard({ name, thumb, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ thumb }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { name }
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  name: propTypes.string,
  thumb: propTypes.string,
  index: propTypes.number,
}.isRequired;
