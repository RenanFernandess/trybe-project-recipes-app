import React, { useState, useContext } from 'react';
import '../css/Header.css';
import appContext from '../context/appContext';

export default function SearchBar() {
  const [radioSearch, setRadioSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { setURL, setSearched } = useContext(appContext);

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
    <form>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Digite aqui sua busca"
        onChange={ handleInputChange }
        name="search-term"
      />
      <div className="radios-container">
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
      </div>
    </form>
  );
}
