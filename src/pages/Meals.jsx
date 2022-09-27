import React, { useState, useEffect, useContext } from 'react';
import Header from '../Components/Header';
import appContext from '../context/appContext';
import Footer from '../Components/Footer';
import Recipes from '../Components/Recipes';
import fetchAPI from '../helpers/fetchAPI';
import { MEALS_ENDPOINT, FIRST_TWELVE } from '../services/variables';

export default function Meals() {
  const {
    URL,
  } = useContext(appContext);

  const [meals, setMeals] = useState([]);

  const endPoint = URL || MEALS_ENDPOINT;

  useEffect(() => {
    fetchAPI(endPoint, ({ meals: result }) => {
      setMeals(result.slice(0, FIRST_TWELVE));
    });
  }, [endPoint]);

  return (
    <div>
      <Header title="Meals" />
      <Footer />
      <Recipes meals={ meals } />
    </div>
  );
}
