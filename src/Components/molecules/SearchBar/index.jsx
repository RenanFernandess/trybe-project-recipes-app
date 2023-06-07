import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { NAME_LENGTH_ERROR, RECIPES_ENDPOINT } from '../../../services/variables';
import RecipeContext from '../../../context';
import fetchRecipes from '../../../helpers/fetchAPI';
import TextInput, { Button, RadioInput } from '../../atoms';
import Form, { Categories } from './ styles';

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
    fetchRecipes(endpoint, (data) => {
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
    <Form>
      <TextInput
        placeholder="Search"
        onChange={ handleChange }
        name="searchTerm"
        value={ searchTerm }
      />
      <Categories>
        <RadioInput
          name="category"
          onChange={ handleChange }
          value="ingredient"
          text="Ingredient"
        />
        <RadioInput
          name="category"
          onChange={ handleChange }
          value="nome"
          text="Name"
        />
        <RadioInput
          name="category"
          onChange={ handleChange }
          value="firstLetter"
          text="First letter"
        />
      </Categories>
      <Button
        onClick={ searchRecipes }
      >
        SEARCH
      </Button>
    </Form>
  );
}

SearchBar.propTypes = {
  title: propTypes.string,
}.isRequired;
