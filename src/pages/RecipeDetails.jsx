import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchAPI, { fetchRecipes } from '../helpers/fetchAPI';
import YouTubeEmbed from '../Components/YouTubeEmbed';
import {
  DRINK_DETAILS, MEALS_DETAILS, DRINKS_ENDPOINT, MEALS_ENDPOINT,
  FIRST_SIX, FAVORITE_RECIPES, INGREDIENTS_NUMBER, DONE_RECIPES, IN_PROGRESS_RECIPES,
} from '../services/variables';
import RecommendationCard from '../Components/RecommendationCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import saveItem, { getItem } from '../helpers/storage';

export default function RecipeDetails({
  match: { params: { id }, path, url }, history: { location: { pathname }, push },
}) {
  const getFavRecipes = getItem(FAVORITE_RECIPES) || [];
  const [{ recipe, ingredients }, setRecipe] = useState(
    { recipe: [], ingredients: [] },
  );
  const [recommendations, setRecommendations] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(getFavRecipes
    .some((favRecipe) => favRecipe.id === id));
  const checkPath = path === '/meals/:id';
  const RECIPE_ENDPOINT = checkPath ? MEALS_DETAILS : DRINK_DETAILS;
  const RECOMMENDATION_ENDPOINT = checkPath ? DRINKS_ENDPOINT : MEALS_ENDPOINT;

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
        recipe: [result],
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

  const saveFavoriteRecipe = () => {
    if (isFavorite) {
      const newFavLS = getFavRecipes.filter((favRecipe) => favRecipe.id !== id);
      saveItem(FAVORITE_RECIPES, newFavLS);
      return setIsFavorite(false);
    }
    const [{
      strArea, strCategory,
      idMeal, idDrink, strAlcoholic, strMeal,
      strDrink, strDrinkThumb, strMealThumb,
    }] = recipe;
    const favStorageFormat = {
      id: idMeal || idDrink,
      type: checkPath ? 'meal' : 'drink',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
    };
    const union = [...getFavRecipes, favStorageFormat];
    saveItem(FAVORITE_RECIPES, union);
    setIsFavorite(true);
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
          onClick={ saveFavoriteRecipe }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          { isFavorite ? (
            <img alt="not-favorite" src={ blackHeartIcon } />
          ) : (
            <img alt="not-favorite" src={ whiteHeartIcon } />)}
          Favorite
        </button>
      </div>

      {recipe?.map((meal, i) => {
        const {
          strMealThumb, strDrinkThumb, strDrink,
          strMeal, strCategory, strYoutube,
          strInstructions, strAlcoholic,
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
                </p>
              ))}
            </section>
            <article>
              { checkPath && <YouTubeEmbed videoID={ URL_CODE } />}
            </article>
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
          strMealThumb, strDrinkThumb,
          strMeal, strDrink,
          idMeal, idDrink,
        }, index) => {
          const idRecipe = idMeal || idDrink;
          return (
            <RecommendationCard
              key={ idRecipe }
              image={ strMealThumb || strDrinkThumb }
              title={ strMeal || strDrink }
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

RecipeDetails.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
