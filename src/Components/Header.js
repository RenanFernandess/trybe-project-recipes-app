import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';

const PAGES_TITLE = ['Meals', 'Drinks'];
export default function Header({ title }) {
  const history = useHistory();
  return (
    <div>
      <h2
        className="profile-title"
        data-testid="page-title"
      >
        {title}
      </h2>
      <button
        type="button"
        onClick={ () => { history.push('/profile'); } }
      >
        <img
          className="profile-image"
          data-testid="profile-top-btn"
          src={ imageProfile }
          alt="profile"
        />
      </button>
      {PAGES_TITLE.some((item) => item === title) && (
        <img
          className="profile-search"
          data-testid="search-top-btn"
          src={ imageSearch }
          alt="imagesSearch"
        />
      )}

    </div>

  );
}
// ou nod
Header.propTypes = {
  title: propTypes.string,
}.isRequired;
