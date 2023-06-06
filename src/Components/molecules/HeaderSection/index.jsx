import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { SmallLogo, ButtonIcon } from '../../atoms';
import { profileIcon, searchIcon } from '../../../assets';
import Container, { Title, Div } from './styles';

export default function HeaderSection({ enableSearchButton, setSearchBarIsActive }) {
  const history = useHistory();

  return (
    <Container>
      <Div>
        <SmallLogo />
        <Title>
          RECIPES
          <span>app</span>
        </Title>
      </Div>
      <Div>
        {enableSearchButton && (
          <ButtonIcon
            alt="Search button"
            icon={ searchIcon }
            onClick={ setSearchBarIsActive }
          />
        )}
        <ButtonIcon
          onClick={ () => history.push('profile') }
          alt="profile"
          icon={ profileIcon }
        />
      </Div>
    </Container>
  );
}

HeaderSection.propTypes = {
  enableSearchButton: PropTypes.bool.isRequired,
  setSearchBarIsActive: PropTypes.func.isRequired,
};
