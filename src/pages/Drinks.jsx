import React, { useState, useEffect, useContext } from 'react';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import { DRINKS_ENDPOINT, FIRST_TWELVE } from '../services/variables';
import fetchAPI from '../helpers/fetchAPI';
import Footer from '../Components/Footer';
import appContext from '../context/appContext';

export default function Drinks() {
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
      setDrinks(result.slice(0, FIRST_TWELVE));
    });
  }, [endPoint]);

  return (
    <div>
      <Header title="Drinks" />
      <Recipes drinks={ drinks } />
      <Footer />
    </div>
  );
}
