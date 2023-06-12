import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CategoryButton } from '../../atoms';
import { allRecipesIcon, drinksIcon, foodsIcon } from '../../../assets';
import Container, { Categories, Cards } from './styles';
import { DoneRecipeCard } from '../../organisms';

export default function FinishedRecipes({ recipes }) {
  const [category, setCategory] = useState('All');

  const filterRecipes = ({ target: { name } }) => { setCategory(name); };

  const filteredRecipes = recipes
    .filter(({ type }) => type === category || category === 'All');

  return (
    <Container>
      <Categories>
        <CategoryButton
          onClick={ filterRecipes }
          icon={ allRecipesIcon }
          alt="All categories button"
          text="All"
        />
        <CategoryButton
          onClick={ filterRecipes }
          icon={ foodsIcon }
          alt="Meals categories button"
          text="Meals"
        />
        <CategoryButton
          onClick={ filterRecipes }
          icon={ drinksIcon }
          alt="Drinks categories button"
          text="Drinks"
        />
      </Categories>
      <Cards>
        {
          filteredRecipes.map(({
            alcoholicOrNot,
            category: cat,
            doneDate,
            id,
            image,
            name,
            nationality,
            tags,
            type,
          }, index) => (
            <DoneRecipeCard
              key={ id }
              alcoholicOrNot={ alcoholicOrNot }
              category={ cat }
              date={ doneDate }
              id={ id }
              index={ index }
              image={ image }
              name={ name }
              nationality={ nationality }
              tags={ tags }
              type={ type }
            />
          ))
        }
      </Cards>
    </Container>
  );
}

FinishedRecipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
