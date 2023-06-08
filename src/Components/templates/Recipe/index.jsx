import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeInProgressContext } from '../../../context';
import { RecipeHeader, RecipeRecommendations } from '../../organisms';
import { drinkIcon, mealIcon } from '../../../assets';
import {
  RecipeFooter,
  RecipeIngredients,
  RecipeInstructions,
  RecipeVideo,
} from '../../molecules';
import Container from './styles';

const PAGE_ICON = {
  meals: mealIcon,
  drinks: drinkIcon,
};

export default function Recipe() {
  const { recipe, ingredients } = useContext(RecipeInProgressContext);
  const { location: { pathname } } = useHistory();

  const { strYoutube, strInstructions } = recipe;
  const page = pathname.includes('meals') ? 'meals' : 'drinks';

  return (
    <>
      <RecipeHeader icon={ PAGE_ICON[page] } />
      <Container>
        <RecipeIngredients ingredients={ ingredients } />
        <RecipeInstructions text={ strInstructions } />
        { strYoutube && <RecipeVideo url={ strYoutube } />}
        <RecipeRecommendations page={ page } />
      </Container>
      <RecipeFooter />
    </>
  );
}
