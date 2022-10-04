import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import '../css/Header.css';
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
    <section>
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
      <section>
        {PAGES_TITLE.some((item) => item === title) && (
          <button
            type="button"
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
      { searchBarBoolean && <SearchBar title={ title } /> }
    </section>

  );
}
// ou nod
Header.propTypes = {
  title: propTypes.string,
}.isRequired;
