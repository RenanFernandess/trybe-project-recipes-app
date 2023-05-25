import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

export default function RecommendationCard({
  image, name, index, category, date, tags, nationality, alcoholicOrNot, id, type,
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
        <ShareButton
          testId={ `${index}-horizontal-share-btn` }
          url={ `/${type}s/${id}` }
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { nationality }
          { ' - ' }
          { category }
          {' '}
          { alcoholicOrNot }
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          { date }
        </p>
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
      </section>
    </div>
  );
}
RecommendationCard.propTypes = {
  image: propTypes.string,
  name: propTypes.string,
  index: propTypes.number,
}.isRequired;
