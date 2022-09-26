import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import { DRINKS_ENDPOINT, FIRST_TWELVE } from '../services/variables';
import fetchAPI from '../helpers/fetchAPI';
import Footer from '../Components/Footer';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetchAPI(DRINKS_ENDPOINT, ({ drinks: result }) => {
      setDrinks(result.slice(0, FIRST_TWELVE));
    });
  }, []);

  return (
    <div>
      <Header title="Drinks" />
      <Recipes drinks={ drinks } />
      <Footer />
    </div>
  );
}
