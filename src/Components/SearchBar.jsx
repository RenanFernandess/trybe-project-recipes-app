import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import appContext from '../context/appContext';
import '../css/SearchBar.css';
import { NAME_LENGTH_ERROR, URLS_BY_PAGE } from '../services/variables';

export default function SearchBar({ title }) {
  const { setURL, setSearched } = useContext(appContext);
  const [{ category, searchTerm }, setState] = useState({
    category: 'name',
    searchTerm: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const setSearchCategory = () => {
    if (searchTerm.length > 1 && category === 'firstLetter') {
      return global.alert(NAME_LENGTH_ERROR);
    }
    const getEndPoint = `${URLS_BY_PAGE[title][category]}${searchTerm}`;
    setURL(getEndPoint);
    setSearched(true);
  };

  return (
    <section className="search-bar">
      <form>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search"
          className="search-input"// search-input
          onChange={ handleChange }
          name="searchTerm"
          value={ searchTerm }
        />
        <div className="radios-container">
          <label htmlFor="ingredient" className="form-check-label">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient"
              className="form-check form-check-inline"// ingredients
              name="category"
              onChange={ handleChange }
              value="ingredient"
            />
            Ingredientes
          </label>
          <label htmlFor="nome" className="form-check-label">
            <input
              type="radio"
              data-testid="name-search-radio"
              id="nome"
              className="name form-check form-check-inline" // name
              name="category"
              onChange={ handleChange }
              value="nome"
            />
            Nome
          </label>
          <label htmlFor="first-letter" className="form-check-label">
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="first-letter"
              className="first-letter"
              name="category"
              onChange={ handleChange }
              value="firstLetter"
            />
            Primeira letra
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            id="button"
            name="search-button"
            className="search-button"
            onClick={ setSearchCategory }
          >
            <div className="search">Busca</div>
          </button>
        </div>
      </form>
    </section>
  );
}

SearchBar.propTypes = {
  title: propTypes.string,
}.isRequired;
