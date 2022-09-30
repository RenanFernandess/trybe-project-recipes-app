import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { act } from 'react-dom/test-utils';
import Header from '../Components/Header';
import appContext from '../context/appContext';
import Footer from '../Components/Footer';
import Recipes from '../Components/Recipes';
import fetchAPI from '../helpers/fetchAPI';
import {
  MEALS_ENDPOINT,
  FIRST_TWELVE,
  MEALS_CATEGORY_ENDPOINT,
  FIRST_FIVE,
  MEALS_FILTER_BY_CATEGOTY_ENDPOINT,
  NO_RECIPES_ERROR,
} from '../services/variables';

export default function Meals({ history }) {
  const { URL, setURL, searched, setSearched } = useContext(appContext);
  const [categorys, setCategorys] = useState([]);
  const [meals, setMeals] = useState([]);
  const END_POINT = URL || MEALS_ENDPOINT;

  useEffect(() => {
    fetchAPI(END_POINT, ({ meals: recipes }) => {
      const result = recipes || [];
      if (!result.length) {
        return global.alert(NO_RECIPES_ERROR);
      }
      if (result.length === 1 && searched) {
        setSearched(false);
        const [{ idMeal }] = result;
        history.push(`/meals/${idMeal}`);
      }
      const LAST_INDEX = (result.length < FIRST_TWELVE) ? result.length : FIRST_TWELVE;
      // https:// reactjs.org/docs/test-utils.html#act estava dando warning, e agora está ok depois que coloquei o act
      act(() => {
        const lastIndex = result.slice(0, LAST_INDEX);
        setMeals(lastIndex);
      });
    });
    fetchAPI(MEALS_CATEGORY_ENDPOINT, ({ meals: result }) => {
      act(() => {
        const resultado = result.slice(0, FIRST_FIVE);
        setCategorys(resultado);
      });
    });
    // console.log('resultado', resultado);
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
