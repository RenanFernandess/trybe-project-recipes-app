import React from 'react';
import propTypes from 'prop-types';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';

const PAGES_TITLE = ['Meals', 'Drinks'];
export default function Header({ title }) {
  return (

    <div>
      <h2
        className="profile-title"
        data-testid="page-title"
      >
        {title}
      </h2>
      <img
        className="profile-image"
        data-testid="profile-top-btn"
        src={ imageProfile }
        alt="profile"
      />
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
