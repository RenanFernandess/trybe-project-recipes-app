import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchAPI, { fetchRecipes } from '../helpers/fetchAPI';
import YouTubeEmbed from '../Components/YouTubeEmbed';
import {
  DRINK_DETAILS, MEALS_DETAILS, DRINKS_ENDPOINT, MEALS_ENDPOINT,
  FIRST_SIX, INGREDIENTS_NUMBER, DONE_RECIPES, IN_PROGRESS_RECIPES,
} from '../services/variables';
import RecommendationCard from '../Components/RecommendationCard';
import shareIcon from '../images/shareIcon.svg';
import { getItem } from '../helpers/storage';
import FavoriteButton from '../Components/FavoriteButton';

export default function RecipeDetails({
  match: { params: { id }, path, url }, history: { location: { pathname }, push },
}) {
  const [{ recipe, ingredients }, setRecipe] = useState(
    { recipe: {}, ingredients: [] },
  );
  const [recommendations, setRecommendations] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const checkPath = path === '/meals/:id';
  const RECIPE_ENDPOINT = checkPath ? MEALS_DETAILS : DRINK_DETAILS;
  const RECOMMENDATION_ENDPOINT = checkPath ? DRINKS_ENDPOINT : MEALS_ENDPOINT;
  const {
    strCategory,
    strAlcoholic, strMeal,
    strDrink, strDrinkThumb, strMealThumb,
    strYoutube, strInstructions,
  } = recipe;
  console.log('strYoutube: ', strYoutube);
  const URL_CODE = strYoutube && strYoutube.split('=')[1];

  useEffect(() => {
    fetchAPI(`${RECIPE_ENDPOINT}${id}`, ([result]) => {
      const ingredientsArray = Array(INGREDIENTS_NUMBER).fill(undefined)
        .reduce((Acc, _, ind) => {
          const number = ind + 1;
          const ingredient = result[`strIngredient${number}`];
          const measure = result[`strMeasure${number}`];
          if (ingredient) return [...Acc, `${ingredient}: ${measure}`];
          return Acc;
        }, []);
      console.log('test: ', ingredientsArray);
      setRecipe({
        recipe: result,
        ingredients: ingredientsArray,
      });
    });
    fetchRecipes(RECOMMENDATION_ENDPOINT, setRecommendations, FIRST_SIX);
  }, [RECIPE_ENDPOINT, id, RECOMMENDATION_ENDPOINT]);

  const isRecipeDone = (recipeId) => {
    const doneRecipes = getItem(DONE_RECIPES) || [];
    const checkTrue = doneRecipes.some((doneRecipe) => doneRecipe.id === recipeId);
    return checkTrue;
  };

  const isRecipeInProgress = (recId) => {
    const recipes = getItem(IN_PROGRESS_RECIPES) || {};
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
      <header>
        <h1>RecipeDetails</h1>
      </header>
      <main>
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
          <FavoriteButton
            checkPath={ checkPath }
            recipe={ recipe }
            testId="favorite-btn"
            idRecipe={ id }
          />
        </div>
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
            </p>
          ))}
        </section>
        <article>
          { strYoutube && <YouTubeEmbed videoID={ URL_CODE } />}
        </article>
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
            strMealThumb: mealThumb,
            strDrinkThumb: drinkThumb,
            strMeal: meal,
            strDrink: drink,
            idMeal: mealId,
            idDrink: drinkId,
          }, index) => {
            const idRecipe = mealId || drinkId;
            return (
              <RecommendationCard
                key={ idRecipe }
                image={ mealThumb || drinkThumb }
                title={ meal || drink }
                id={ idRecipe }
                index={ index }
              />
            );
          })}
        </div>
      </main>
      <footer>
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
      </footer>
    </div>
  );
}

RecipeDetails.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
