import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import appContext from '../context/appContext';
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
    <form>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Digite aqui sua busca"
        onChange={ handleChange }
        name="searchTerm"
        value={ searchTerm }
      />
      <div className="radios-container">
        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="category"
            onChange={ handleChange }
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
            onChange={ handleChange }
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
          Busca
        </button>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  title: propTypes.string,
}.isRequired;
