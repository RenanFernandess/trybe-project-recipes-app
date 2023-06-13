import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CategoryButton } from '../../atoms';
import { allRecipesIcon, drinksIcon, foodsIcon } from '../../../assets';
import Container, { Categories, Cards } from './styles';
import { DoneRecipeCard } from '../../organisms';

export default function FinishedRecipes({ recipes }) {
  const [category, setCategory] = useState('all');

  const filteredRecipes = recipes
    .filter(({ type }) => type === category || category === 'all');

  return (
    <Container>
      <Categories>
        <CategoryButton
          onClick={ () => setCategory('all') }
          icon={ allRecipesIcon }
          alt="All categories button"
          text="All"
        />
        <CategoryButton
          onClick={ () => setCategory('meal') }
          icon={ foodsIcon }
          alt="Meals categories button"
          text="Meals"
        />
        <CategoryButton
          onClick={ () => setCategory('drink') }
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
