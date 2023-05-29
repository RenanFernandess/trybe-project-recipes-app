import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import '../css/SearchBar.css';
import { useHistory } from 'react-router-dom';
import { NAME_LENGTH_ERROR, RECIPES_ENDPOINT } from '../services/variables';
import RecipeContext from '../context';
import fetchAPI from '../helpers/fetchAPI';

export default function SearchBar({ title }) {
  const history = useHistory();
  const { setRecipes } = useContext(RecipeContext);
  const [{ category, searchTerm }, setState] = useState({
    category: 'name',
    searchTerm: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const searchRecipes = () => {
    if (searchTerm.length > 1 && category === 'firstLetter') {
      return global.alert(NAME_LENGTH_ERROR);
    }
    const endpoint = `${RECIPES_ENDPOINT[title][category]}${searchTerm}`;
    fetchAPI(endpoint, (data) => {
      if (data.length === 1) {
        const page = title === 'Meals'
          ? `/meals/${data[0].idMeal}`
          : `/drinks/${data[0].idDrink}`;
        return history.push(page);
      }
      setRecipes(data);
    });
  };

  return (
    <section className="search-bar">
      <form>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search"
          className="search-input"
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
              className="form-check form-check-inline"
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
              className="name form-check form-check-inline"
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
            onClick={ searchRecipes }
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
