import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import appContext from '../context/appContext';
import Footer from '../Components/Footer';
import Recipes from '../Components/Recipes';
import fetchAPI from '../helpers/fetchAPI';
import { MEALS_ENDPOINT, FIRST_TWELVE } from '../services/variables';

export default function Meals({ history }) {
  const {
    URL,
  } = useContext(appContext);

  const [meals, setMeals] = useState([]);

  const endPoint = URL || MEALS_ENDPOINT;

  useEffect(() => {
    fetchAPI(endPoint, ({ meals: result }) => {
      if (!result) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } if (result.length === 1) {
        const { idMeal } = result[0];
        history.push(`/meals/${idMeal}`);
      }
      setMeals(result.slice(0, FIRST_TWELVE));
    });
  }, [endPoint, history]);

  return (
    <div>
      <Header title="Meals" />
      <Footer />
      <Recipes meals={ meals } />
    </div>
  );
}

Meals.propTypes = {
  history: propTypes.instanceOf(Object),
}.isRequired;
