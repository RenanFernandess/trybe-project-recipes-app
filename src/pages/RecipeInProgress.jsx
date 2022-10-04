import React from 'react';
import propTypes from 'prop-types';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';

export default function RecipeInProgress({
  match: { params: { id }, url },
}) {
  return (
    <main>
      <img
        src=""
        alt=""
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        title
      </h1>
      <div>
        <ShareButton
          testId="share-btn"
          url={ url }
        />
        <FavoriteButton
          checkPath={ false }
          recipe={ {} }
          testId="favorite-btn"
          idRecipe={ id }
        />
      </div>
      <section>
        <p data-testid="recipe-category">
          texto da categoria
        </p>
        <div data-testid="instructions">
          instruções
        </div>
      </section>
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish recipe
        </button>
      </div>
    </main>
  );
}

RecipeInProgress.propTypes = {
  match: propTypes.shape({
    path: propTypes.string,
    url: propTypes.string,
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};
