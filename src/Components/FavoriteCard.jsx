import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

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
  const [linkCopied, setLinkCopied] = useState(false);

  const copyBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied(true);
  };

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
          <button
            type="button"
            onClick={ copyBoard }
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
            <img
              alt="share"
              src={ shareIcon }
            />
          </button>
          {linkCopied && <p>Link copied!</p> }
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
