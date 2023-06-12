import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonLeftIcon } from '../../atoms';
import { doneRecipesIcon, favoriteIcon, logoutIcon } from '../../../assets';
import Container, { Line } from './styles';

export default function ProfileNav() {
  const { push } = useHistory();

  const logout = () => {
    localStorage.clear();
    push('/');
  };

  return (
    <Container>
      <ButtonLeftIcon
        text="Done Recipes"
        icon={ doneRecipesIcon }
        alt="Done recipes button"
        onClick={ () => { push('/done-recipes'); } }
      />
      <Line />
      <ButtonLeftIcon
        text="Favorite Recipes"
        icon={ favoriteIcon }
        alt="Favorite recipes button"
        onClick={ () => { push('/favorite-recipes'); } }
      />
      <Line />
      <ButtonLeftIcon
        text="Logout"
        icon={ logoutIcon }
        alt="Logout button"
        onClick={ logout }
      />
    </Container>
  );
}
