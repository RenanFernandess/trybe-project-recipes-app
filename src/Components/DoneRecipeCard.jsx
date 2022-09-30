import React from 'react';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function RecommendationCard({
  image, name, index, category, date, tags, share, nationality, alcoholicOrNot, id, type,
}) {
  const copyBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied(true);
  };

  return (
    <div>
      <img
        width={ 140 }
        src={ image }
        data-testid={ `${index}-horizontal-image` }
        alt="recommendation-card"
      />
      <button
        type="button"
        onClick={ copyBoard }
      >
        <img
          alt="share"
          src={ shareIcon }
        />
      </button>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        {name}
      </p>
      <p>
        { nationality }
      </p>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { category }
        {' '}
        { alcoholicOrNot }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { date }
      </p>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        { share }
      </button>
      <div>
        {
          tags.slice(0, 2).map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          ))
        }
      </div>
    </div>
  );
}
RecommendationCard.propTypes = {
  image: propTypes.string,
  name: propTypes.string,
  index: propTypes.number,
}.isRequired;
