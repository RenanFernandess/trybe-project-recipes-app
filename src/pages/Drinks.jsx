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
} from '../services/variables';
import fetchAPI from '../helpers/fetchAPI';
import Footer from '../Components/Footer';
import appContext from '../context/appContext';

export default function Drinks({ history }) {
  const { URL, setURL } = useContext(appContext);
  const [drinks, setDrinks] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const END_POINT = URL || DRINKS_ENDPOINT;

  useEffect(() => {
    fetchAPI(END_POINT, ({ drinks: recipes }) => {
      const result = recipes || [];
      if (!result.length) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (result.length === 1) {
        const { idDrink } = result[0];
        history.push(`/drinks/${idDrink}`);
      }
      const LAST_INDEX = (result.length < FIRST_TWELVE) ? result.length : FIRST_TWELVE;
      setDrinks(result.slice(0, LAST_INDEX));
    });
    fetchAPI(DRINKS_CATEGORY_ENDPOINT, ({ drinks: result }) => {
      setCategorys(result.slice(0, FIRST_FIVE));
    });
  }, [END_POINT, URL, history]);

  useEffect(() => () => { setURL(''); }, [setURL]);

  const filterByCategory = ({ target: { value } }) => {
    setURL(`${DRINKS_FILTER_BY_CATEGOTY_ENDPOINT}${value}`);
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
