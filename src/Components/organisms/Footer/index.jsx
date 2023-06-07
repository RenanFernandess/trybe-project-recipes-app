import React from 'react';
import { useHistory } from 'react-router-dom';
import { dishIcon, cupIcon } from '../../../assets';
import { ButtonIcon } from '../../atoms';
import Container from './styled';

export default function Footer() {
  const history = useHistory();
  return (
    <Container>
      <ButtonIcon
        onClick={ () => history.push('/drinks') }
        icon={ cupIcon }
        alt="Drinks button"
      />
      <ButtonIcon
        onClick={ () => history.push('/meals') }
        icon={ dishIcon }
        alt="Meals button"
      />
    </Container>
  );
}
