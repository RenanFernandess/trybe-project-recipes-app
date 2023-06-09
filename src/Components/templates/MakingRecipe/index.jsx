import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeInProgressContext } from '../../../context';
import { ListIngredientes, RecipeHeader } from '../../organisms';
import { drinkIcon, mealIcon } from '../../../assets';
import {
  RecipeInProgressFooter,
  RecipeInstructions,
  RecipeVideo,
} from '../../molecules';
import Container from './styles';

const PAGE_ICON = {
  meals: mealIcon,
  drinks: drinkIcon,
};

export default function MakingRecipe() {
  const { recipe } = useContext(RecipeInProgressContext);
  const { location: { pathname } } = useHistory();
  const page = pathname.includes('meals') ? 'meals' : 'drinks';
  const { strYoutube, strInstructions } = recipe;

  return (
    <>
      <RecipeHeader icon={ PAGE_ICON[page] } />
      <Container>
        <ListIngredientes />
        <RecipeInstructions text={ strInstructions } />
        { strYoutube && <RecipeVideo url={ strYoutube } />}
      </Container>
      <RecipeInProgressFooter />
    </>
  );
}
