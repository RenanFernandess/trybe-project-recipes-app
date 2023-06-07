import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ShareButton, FavoriteButton } from '../../molecules';
import { RecipeInProgressContext } from '../../../context';
import Header, { Title, Div } from './styles';
import { RecipeCategory } from '../../atoms';

export default function RecipeHeader({ icon }) {
  const { recipe } = useContext(RecipeInProgressContext);

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
        category={ `${strCategory} ${strAlcoholic}` }
      />
      <Title>{strMeal || strDrink}</Title>
      <Div>
        <ShareButton />
        <FavoriteButton recipe={ recipe } />
      </Div>
    </Header>
  );
}

RecipeHeader.propTypes = {
  icon: PropTypes.node.isRequired,
};
