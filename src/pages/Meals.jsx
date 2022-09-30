import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import appContext from '../context/appContext';
import Footer from '../Components/Footer';
import Recipes from '../Components/Recipes';
import { fetchRecipes, fetchCategory } from '../helpers/fetchAPI';
import {
  MEALS_ENDPOINT,
  MEALS_CATEGORY_ENDPOINT,
  MEALS_FILTER_BY_CATEGOTY_ENDPOINT,
} from '../services/variables';

export default function Meals({ history }) {
  const { URL, setURL, searched, setSearched } = useContext(appContext);
  const [categorys, setCategorys] = useState([]);
  const [meals, setMeals] = useState([]);
  const END_POINT = URL || MEALS_ENDPOINT;

  useEffect(() => {
    fetchRecipes(END_POINT, (result) => {
      if (result.length === 1 && searched) {
        setSearched(false);
        return history.push(`/meals/${result[0].idMeal}`);
      }
      setMeals(result);
    });
    fetchCategory(MEALS_CATEGORY_ENDPOINT, setCategorys);
  }, [END_POINT, URL, history, searched, setSearched]);

  useEffect(() => () => { setURL(''); }, [setURL]);

  const filterByCategory = (category) => {
    setURL(`${MEALS_FILTER_BY_CATEGOTY_ENDPOINT}${category}`);
  };

  return (
    <div>
      <Header title="Meals" />
      <Recipes
        recipes={ meals }
        categorys={ categorys }
        filterByCategory={ filterByCategory }
      />
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
