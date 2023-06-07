import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShareButton } from '../../molecules';
import FavoriteButton from '../../FavoriteButton';
import { RecipeInProgressContext } from '../../../context';
import Header, { Title, Div } from './styles';

export default function RecipeHeader() {
  const { recipe } = useContext(RecipeInProgressContext);
  const { id } = useParams();

  const {
    strCategory,
    strAlcoholic,
    strMeal,
    strDrink,
    strDrinkThumb,
    strMealThumb,
  } = recipe;

  return (
    <Header background={ strMealThumb || strDrinkThumb }>
      <Div>
        <p data-testid="recipe-category">
          { strCategory }
          { ' ' }
          { strAlcoholic }
        </p>
        <Div>
          <ShareButton />
          <FavoriteButton
            recipe={ recipe }
            testId="favorite-btn"
            idRecipe={ id }
          />
        </Div>
      </Div>
      <Title>{strMeal || strDrink}</Title>
    </Header>
  );
}
