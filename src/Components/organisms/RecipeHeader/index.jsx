import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ShareButton, FavoriteButton } from '../../molecules';
import { RecipeInProgressContext } from '../../../context';
import Header, { Title, Div } from './styles';
import { RecipeCategory } from '../../atoms';
import { recipeMap } from '../../../helpers';

export default function RecipeHeader({ icon }) {
  const { location: { pathname } } = useHistory();
  const { recipe } = useContext(RecipeInProgressContext);
  const URL = pathname.includes('in-progress') ? pathname.match(/\/[A-z]+\/[0-9]+/ig)[0] : pathname;

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
      <RecipeCategory
        icon={ icon }
        category={ `${strCategory} ${strAlcoholic || ''}` }
      />
      <Title>{strMeal || strDrink}</Title>
      <Div>
        <ShareButton url={ URL } />
        { strCategory && <FavoriteButton recipe={ recipeMap(recipe) } /> }
      </Div>
    </Header>
  );
}

RecipeHeader.propTypes = {
  icon: PropTypes.node.isRequired,
};
