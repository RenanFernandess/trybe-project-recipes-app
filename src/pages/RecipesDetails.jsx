import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchAPI, { fetchRecipes } from '../helpers/fetchAPI';
import YouTubeEmbed from '../Components/YouTubeEmbed';
// import saveItem from '../helpers/storage';
import {
  DRINK_DETAILS,
  MEALS_DETAILS,
  DRINKS_ENDPOINT,
  MEALS_ENDPOINT,
  FIRST_SIX,
} from '../services/variables';
import RecommendationCard from '../Components/RecommendationCard';
import shareIcon from '../images/shareIcon.svg';

const regexIngredients = /^stringredient/i;
const regexMeasure = /^strmeasure/i;
export default function RecipesDetails({
  match: { params: { id }, path, url }, history: { location: { pathname }, push },
}) {
  const [recipe, setRecipe] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const checkPath = path === '/meals/:id';
  const RECIPE_ENDPOINT = checkPath ? MEALS_DETAILS : DRINK_DETAILS;
  const RECOMMENDATION_ENDPOINT = checkPath ? DRINKS_ENDPOINT : MEALS_ENDPOINT;
  const [linkCopied, setLinkCopied] = useState(false);
  console.log(pathname);

  useEffect(() => {
    console.log('ok');
    fetchAPI(`${RECIPE_ENDPOINT}${id}`, (result) => {
      setRecipe(result);
      const arrayOfKeys = Object.entries(result[0]);
      const ingredientsArray = arrayOfKeys
        .filter(([key, value]) => regexIngredients.test(key) && value !== '');
      const measureArray = arrayOfKeys
        .filter(([key, value]) => regexMeasure.test(key) && value !== '');
      setIngredients(ingredientsArray);
      setMeasures(measureArray);
    });

    fetchRecipes(RECOMMENDATION_ENDPOINT, setRecommendations, FIRST_SIX);
  }, [RECIPE_ENDPOINT, id, RECOMMENDATION_ENDPOINT]);

  const isRecipeDone = (recipeId) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const checkTrue = doneRecipes.some((doneRecipe) => doneRecipe.id === recipeId);

    return checkTrue;
  };

  const isRecipeInProgress = (recId) => {
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    const inProgressRecipesArray = Object.values(recipes);

    return inProgressRecipesArray
      .some((inProgRecipe) => inProgRecipe.hasOwnProperty.call(inProgRecipe, recId));
  };

  const copyBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setLinkCopied(true);
  };

  return (
    <div>
      <h1>RecipeDetails</h1>

      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ copyBoard }
        >
          <img
            alt="share"
            src={ shareIcon }
          />
        </button>
        {linkCopied && <p>Link copied!</p> }
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorite
        </button>
      </div>

      {recipe?.map((meal, i) => {
        const {
          strMealThumb,
          strDrinkThumb,
          strDrink,
          strMeal,
          strCategory,
          strYoutube,
          strInstructions,
          strAlcoholic,
        } = meal;

        const URL_CODE = checkPath && strYoutube.split('=')[1];

        return (
          <main key={ i }>
            <h2
              data-testid="recipe-title"
            >
              {strMeal || strDrink}
            </h2>
            <img
              src={ strMealThumb || strDrinkThumb }
              width="100"
              alt={ strMeal }
              data-testid="recipe-photo"
              tagname={ strMeal || strDrink }
            />
            <p data-testid="recipe-category">
              { strCategory }
              { ' ' }
              { strAlcoholic }
            </p>
            <article data-testid="instructions">
              <h3>Instruções</h3>
              {strInstructions}
            </article>
            <section>
              <h3>Ingredientes</h3>
              { ingredients.map((ingredient, index) => (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { ingredient }
                  :
                  { measures[index] }
                </p>
              ))}
            </section>
            <section>
              { checkPath && <YouTubeEmbed videoID={ URL_CODE } />}
            </section>
          </main>
        );
      })}
      <div
        style={ {
          display: 'flex',
          gap: '10px',
          padding: '20px',
          width: '80vw',
          overflow: 'scroll',
        } }
      >
        { recommendations.map(({
          strMealThumb,
          strDrinkThumb,
          strMeal,
          strDrink,
          idMeal,
          idDrink,
        }, index) => {
          const image = strMealThumb || strDrinkThumb;
          const title = strMeal || strDrink;
          const idRecipe = idMeal || idDrink;
          return (
            <RecommendationCard
              key={ idRecipe }
              image={ image }
              title={ title }
              id={ idRecipe }
              index={ index }
            />
          );
        })}
      </div>
      {
        !isRecipeDone(id)
          ? (
            <button
              data-testid="start-recipe-btn"
              name="Start Recipe"
              type="button"
              className="start-recipe-btn"
              onClick={ () => push(`${pathname}/in-progress`) }
            >
              {(isRecipeInProgress(id)
                ? 'Continue Recipe' : 'Start Recipe'
              )}
            </button>
          )
          : null
      }
    </div>
  );
}

RecipesDetails.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
