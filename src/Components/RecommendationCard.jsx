import React from 'react';
import propTypes from 'prop-types';

export default function RecommendationCard({ image, title, index }) {
  return (
    <div
      style={
        { display: 'flex', flexDirection: 'column' }
      }
    >
      <img
        width={ 140 }
        src={ image }
        data-testid={ `${index}-recommendation-card` }
        alt="recommendation-card"
      />
      <p
        data-testid={ `${index}-recommendation-title` }
      >
        {title}
      </p>
    </div>
  );
}
RecommendationCard.propTypes = {
  image: propTypes.string,
  title: propTypes.string,
  index: propTypes.number,
}.isRequired;
