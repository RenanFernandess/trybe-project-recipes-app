import React from 'react';
import propTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

export default function RecipeCard({ name, thumb, index, id }) {
  const { location: { pathname } } = useHistory();
  return (
    <Link to={ `${pathname}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          width={ 150 }
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
    </Link>
  );
}

RecipeCard.propTypes = {
  name: propTypes.string,
  thumb: propTypes.string,
  index: propTypes.number,
  id: propTypes.number,
}.isRequired;
