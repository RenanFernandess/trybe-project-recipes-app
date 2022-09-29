import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import {
  DRINKS_CATEGORY_ENDPOINT,
  DRINKS_ENDPOINT,
  DRINKS_FILTER_BY_CATEGOTY_ENDPOINT,
} from '../services/variables';
import { fetchRecipes, fetchCategory } from '../helpers/fetchAPI';
import Footer from '../Components/Footer';
import appContext from '../context/appContext';

export default function Drinks({ history }) {
  const { URL, setURL, searched, setSearched } = useContext(appContext);
  const [drinks, setDrinks] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const END_POINT = URL || DRINKS_ENDPOINT;

  useEffect(() => {
    fetchRecipes(END_POINT, (recipes) => {
      if (recipes.length === 1 && searched) {
        setSearched(false);
        return history.push(`/drinks/${recipes[0].idDrink}`);
      }
      setDrinks(recipes);
    });
    fetchCategory(DRINKS_CATEGORY_ENDPOINT, setCategorys);
  }, [END_POINT, URL, history, searched, setSearched]);

  useEffect(() => () => { setURL(''); }, [setURL]);

  const filterByCategory = (category) => {
    setURL(`${DRINKS_FILTER_BY_CATEGOTY_ENDPOINT}${category}`);
  };

  return (
    <div>
      <Header title="Drinks" />
      <Recipes
        recipes={ drinks }
        categorys={ categorys }
        filterByCategory={ filterByCategory }
      />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
