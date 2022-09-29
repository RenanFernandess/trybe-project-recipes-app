import React from 'react';
import propTypes from 'prop-types';

export default function RecommendationCard({
  image, name, index, category, date, tags, share,
}) {
  return (
    <div
      style={
        { display: 'flex', flexDirection: 'column' }
      }
    >
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
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { category }
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
          tags.map((tag) => (
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
