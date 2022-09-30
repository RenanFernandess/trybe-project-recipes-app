import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import '../css/Header.css';
import appContext from '../context/appContext';

const PAGES_TITLE = ['Meals', 'Drinks'];

const NAME_LENGTH_ERROR = 'Your search must have only 1 (one) character';

export const URLS_BY_PAGE = {
  Meals: {
    nome(name) {
      // console.log('name, header', name);
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    },
    ingredient(name) {
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
    },
    firstLetter(name) {
      if (name.length > 1) {
        return global.alert(NAME_LENGTH_ERROR);
      }
      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
    },
  },
  Drinks: {
    nome(name) {
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    },
    ingredient(name) {
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`;
    },
    firstLetter(name) {
      if (name.length > 1) {
        return global.alert(NAME_LENGTH_ERROR);
      }
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`;
    },
  },
};

export default function Header({ title }) {
  const history = useHistory();

  const [searchBarBoolean, setSearchBarBoolean] = useState(false);
  const [radioSearch, setRadioSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    setURL,
    setSearched,
  } = useContext(appContext);
  const handleSearchBoolean = () => {
    if (searchBarBoolean === false) {
      setSearchBarBoolean(true);
    } else {
      setSearchBarBoolean(false);
    }
  };

  const handleRadioChange = ({ target: { name, value } }) => {
    setRadioSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputChange = ({ target: { value } }) => {
    setSearchTerm((prevState) => ({ ...prevState, name: value }));
  };

  const setSearchCategory = () => {
    const { category } = radioSearch;
    const { name } = searchTerm;
    const getEndPoint = URLS_BY_PAGE[title][category];
    setSearched(true);
    setURL(getEndPoint(name));
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
      <section>
        { searchBarBoolean
        && <input
          type="text"
          data-testid="search-input"
          placeholder="Digite aqui sua busca"
          onChange={ handleInputChange }
          name="search-term"
          // value={ searchTerm }
        /> }
      </section>
      <section className="radios-container">
        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="category"
            onChange={ handleRadioChange }
            value="ingredient"
          />
          Ingredientes
        </label>
        <label htmlFor="nome">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="nome"
            name="category"
            onChange={ handleRadioChange }
            value="nome"
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter"
            name="category"
            onChange={ handleRadioChange }
            value="firstLetter"
          />
          Primeira letra
        </label>
        <button
          type="submit"
          data-testid="exec-search-btn"
          id="button"
          name="search-button"
          className="search-button"
          onClick={ setSearchCategory }
        >
          Busca
        </button>
      </section>
    </section>

  );
}
// ou nod
Header.propTypes = {
  title: propTypes.string,
}.isRequired;
