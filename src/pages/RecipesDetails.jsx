import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchAPI from '../helpers/fetchAPI';
import YouTubeEmbed from '../Components/YouTubeEmbed';
import {
  DRINK_DETAILS, MEALS_DETAILS, DRINKS_ENDPOINT, MEALS_ENDPOINT,
  FIRST_SIX, REGEX_INGREDIENT, REGEX_MEASURE,
} from '../services/variables';
import RecommendationCard from '../Components/RecommendationCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipesDetails({ match, history }) {
  const [recipe, setRecipe] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { params: { id }, path, url } = match;
  const checkPath = path === '/meals/:id';
  const RECIPE_ENDPOINT = checkPath ? MEALS_DETAILS : DRINK_DETAILS;
  const RECOMMENDATION_ENDPOINT = checkPath ? DRINKS_ENDPOINT : MEALS_ENDPOINT;
  const { location: { pathname } } = history;
  const getFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  const checkFavorite = (favId) => {
    const checkTrue = getFavRecipes.some((favRecipe) => favRecipe.id === favId);
    setIsFavorite(checkTrue);
  };

  useEffect(() => {
    fetchAPI(`${RECIPE_ENDPOINT}${id}`, ({ meals, drinks }) => {
      const result = meals || drinks;
      setRecipe(result);
      const arrayOfKeys = Object.entries(result[0]);
      const ingredientsArray = arrayOfKeys
        .filter(([key, value]) => REGEX_INGREDIENT.test(key) && value !== '');
      const measureArray = arrayOfKeys
        .filter(([key, value]) => REGEX_MEASURE.test(key) && value !== '');
      setIngredients(ingredientsArray);
      setMeasures(measureArray);
    });
    fetchAPI(RECOMMENDATION_ENDPOINT, ({ meals, drinks }) => {
      const result = meals || drinks;
      setRecommendations(result.slice(0, FIRST_SIX));
    });
    checkFavorite(id);
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

  const saveFavoriteRecipe = () => {
    if (isFavorite) {
      const newFavLS = getFavRecipes
        .filter((favRecipe) => favRecipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavLS));
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
    const saveRecipe = localStorage
      .setItem('favoriteRecipes', JSON
        .stringify(union));
    setIsFavorite(true);
    return saveRecipe;
  };

  return (
    <div>
      <h1>RecipesDetails</h1>
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
          strMealThumb, strDrinkThumb,
          strMeal, strDrink,
          idMeal, idDrink,
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
              onClick={ () => history.push(`${pathname}/in-progress`) }
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
