import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import { DRINKS_ENDPOINT, FIRST_TWELVE } from '../services/variables';
import fetchAPI from '../helpers/fetchAPI';
import Footer from '../Components/Footer';
import appContext from '../context/appContext';

export default function Drinks({ history }) {
  const {
    URL,
  } = useContext(appContext);
  const [drinks, setDrinks] = useState([]);

  const endPoint = URL || DRINKS_ENDPOINT;

  useEffect(() => {
    fetchAPI(endPoint, ({ drinks: result }) => {
      if (!result) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (result.length === 1) {
        const { idDrink } = result[0];
        history.push(`/drinks/${idDrink}`);
      }
      setDrinks(result.slice(0, FIRST_TWELVE));
    });
  }, [endPoint, history]);

  return (
    <div>
      <Header title="Drinks" />
      <Recipes drinks={ drinks } />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
