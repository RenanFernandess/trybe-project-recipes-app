import React from 'react';
import ShareButton from '../Components/ShareButton';

export default function RecipeInProgress() {
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
