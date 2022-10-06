import React from 'react';
import propTypes from 'prop-types';
import '../css/Recipes.css';
import { Link, useHistory } from 'react-router-dom';

export default function RecipeCard({ name, thumb, index, id }) {
  const { location: { pathname } } = useHistory();
  return (
    <div className="card">
      <Link to={ `${pathname}/${id}` } className="link">
        <div
          className="card-full"
          data-bs-ride="true"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            className="card-img"
            width={ 150 }
            src={ thumb }
            alt={ name }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
            className="card-title"
          >
            { name }
          </p>
        </div>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  name: propTypes.string,
  thumb: propTypes.string,
  index: propTypes.number,
  id: propTypes.number,
}.isRequired;
