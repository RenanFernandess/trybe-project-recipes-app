import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import fetchAPI from '../helpers/fetchAPI';

import '../css/Header.css';

const PAGES_TITLE = ['Meals', 'Drinks'];
export default function Header({ title }) {
  const history = useHistory();
  const [searchBarBoolean, setSearchBarBoolean] = useState(false);
  const [radioSearch, setRadioSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const fetchSearchFilter = () => {
    const { category } = radioSearch;
    const { name } = searchTerm;
    switch (category) {
    case 'nome':
      return fetchAPI(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`, (data) => {
        console.log(data);
      });
    case 'ingredient':
      return fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`, (data) => {
        console.log(data);
      });
    case 'first-letter':
      if (name.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      return fetchAPI(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`, (data) => {
        console.log(data);
      });

    default:
      return null;
    }
  };

  console.log(radioSearch);

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
            value="first-letter"
          />
          Primeira letra
        </label>
        <button
          type="submit"
          data-testid="exec-search-btn"
          id="button"
          name="search-button"
          className="search-button"
          onClick={ fetchSearchFilter }
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
