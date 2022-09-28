import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import {
  DRINKS_CATEGORY_ENDPOINT,
  DRINKS_ENDPOINT,
  DRINKS_FILTER_BY_CATEGOTY_ENDPOINT,
  FIRST_FIVE,
  FIRST_TWELVE,
  NO_RECIPES_ERROR,
} from '../services/variables';
import fetchAPI from '../helpers/fetchAPI';
import Footer from '../Components/Footer';
import appContext from '../context/appContext';

export default function Drinks({ history }) {
  const { URL, setURL, searched, setSearched } = useContext(appContext);
  const [drinks, setDrinks] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const END_POINT = URL || DRINKS_ENDPOINT;

  useEffect(() => {
    fetchAPI(END_POINT, ({ drinks: recipes }) => {
      const result = recipes || [];
      if (!result.length) {
        return global.alert(NO_RECIPES_ERROR);
      }
      if (result.length === 1 && searched) {
        setSearched(false);
        const [{ idDrink }] = result;
        history.push(`/drinks/${idDrink}`);
      }
      const LAST_INDEX = (result.length < FIRST_TWELVE) ? result.length : FIRST_TWELVE;
      setDrinks(result.slice(0, LAST_INDEX));
    });
    fetchAPI(DRINKS_CATEGORY_ENDPOINT, ({ drinks: result }) => {
      setCategorys(result.slice(0, FIRST_FIVE));
    });
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
