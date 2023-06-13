import React, { useContext, useState } from 'react';
import { CategoryButton } from '../../atoms';
import { allRecipesIcon, drinksIcon, foodsIcon } from '../../../assets';
import Container, { Cards, Categories } from './styles';
import { FavoriteCard } from '../../organisms';
import { FavoritesContext } from '../../../context';

export default function FavoriteContent() {
  const { favorites } = useContext(FavoritesContext);
  const [category, setCategory] = useState('all');

  const filteredRecipes = favorites
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
            id,
            image,
            name,
            nationality,
            type,
          }) => (
            <FavoriteCard
              key={ id }
              alcoholicOrNot={ alcoholicOrNot }
              category={ cat }
              id={ id }
              image={ image }
              name={ name }
              nationality={ nationality }
              type={ type }
            />
          ))
        }
      </Cards>
    </Container>
  );
}
