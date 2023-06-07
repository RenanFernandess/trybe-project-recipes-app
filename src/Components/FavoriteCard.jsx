import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { ShareButton } from './molecules';

export default function FavoriteCard({
  image,
  name,
  index,
  category,
  nationality,
  alcoholicOrNot,
  id,
  type,
  isFavorite,
  removeFavorite,
}) {
  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          width={ 140 }
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          alt="recommendation-card"
        />
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </p>
      </Link>
      <section>
        <div>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => { removeFavorite(id); } }
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          >
            { isFavorite ? (
              <img
                alt="favorite"
                src={ blackHeartIcon }
              />
            ) : (
              <img
                alt="not-favorite"
                src={ whiteHeartIcon }
              />)}
          </button>
          <ShareButton
            testId={ `${index}-horizontal-share-btn` }
            url={ `/${type}s/${id}` }
          />
        </div>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { nationality }
          { ' - ' }
          { category }
          {' '}
          { alcoholicOrNot }
        </p>
      </section>
    </div>
  );
}
FavoriteCard.propTypes = {
  image: propTypes.string,
  name: propTypes.string,
  index: propTypes.number,
  id: propTypes.string,
}.isRequired;
