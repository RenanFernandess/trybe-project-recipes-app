import React, { useState, useEffect, useContext } from 'react';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import {
  DRINKS_CATEGORY_ENDPOINT,
  DRINKS_ENDPOINT,
  FIRST_FIVE,
  FIRST_TWELVE,
} from '../services/variables';
import fetchAPI from '../helpers/fetchAPI';
import Footer from '../Components/Footer';
import appContext from '../context/appContext';

export default function Drinks() {
  const { URL } = useContext(appContext);
  const [drinks, setDrinks] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const endPoint = URL || DRINKS_ENDPOINT;

  useEffect(() => {
    fetchAPI(endPoint, ({ drinks: result }) => {
      setDrinks(result.slice(0, FIRST_TWELVE));
    });
    fetchAPI(DRINKS_CATEGORY_ENDPOINT, ({ drinks: result }) => {
      setCategorys(result.slice(0, FIRST_FIVE));
    });
  }, [endPoint]);

  return (
    <div>
      <Header title="Drinks" />
      <Recipes
        recipes={ drinks }
        categorys={ categorys }
      />
      <Footer />
    </div>
  );
}
