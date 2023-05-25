import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import imageTray from '../images/bandeja.png';
import SearchBar from './SearchBar';
import { PAGES_TITLE } from '../services/variables';

export default function Header({ title }) {
  const history = useHistory();
  const [searchBarBoolean, setSearchBarBoolean] = useState(false);

  const handleSearchBoolean = () => {
    if (searchBarBoolean === false) setSearchBarBoolean(true);
    else setSearchBarBoolean(false);
  };

  return (
    <section className="container-header">
      <img src={ imageTray } alt="bandeja" className="header-image" />
      <h2 className="title-recipes">
        RECIPES
        <span> app</span>
      </h2>
      <h2 className="profile-title" data-testid="page-title">
        {title}
      </h2>
      <div className="recipes-app">
        <section className="btn-profile-image">
          <button
            type="button"
            className="btn-image"
            onClick={ () => {
              history.push('profile');
            } }
          >
            <img
              className="profile-image"
              data-testid="profile-top-btn"
              src={ imageProfile }
              alt="profile"
            />
          </button>
        </section>
        <section className="btn-profile-search">
          {PAGES_TITLE.some((item) => item === title) && (
            <button
              type="button"
              className="btn-search"
              onClick={ handleSearchBoolean }
            >
              <img
                className="profile-search"
                data-testid="search-top-btn"
                src={ imageSearch }
                alt="imagesSearch"
              />
            </button>
          )}
        </section>
        {searchBarBoolean && <SearchBar title={ title } />}
      </div>
    </section>
  );
}
// ou node
Header.propTypes = {
  title: propTypes.string,
}.isRequired;
