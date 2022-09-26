import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
// import appContext from '../context/appContext';
import Recipes from '../Components/Recipes';
import fetchAPI from '../hooks/useFetchAPI';
import { MEALS_ENDPOINT, FIRST_TWELVE } from '../services/variables';

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchAPI(MEALS_ENDPOINT, ({ meals: result }) => {
      setMeals(result.slice(0, FIRST_TWELVE));
    });
  }, []);

  return (
    <div>
      <Header title="Meals" />
      <Recipes meals={ meals } />
    </div>
  );
}
