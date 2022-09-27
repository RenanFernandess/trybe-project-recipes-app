import React, { useState, useEffect, useContext } from 'react';
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
} from '../services/variables';

export default function Meals() {
  const { URL } = useContext(appContext);
  const [categorys, setCategorys] = useState([]);
  const [meals, setMeals] = useState([]);
  const endPoint = URL || MEALS_ENDPOINT;

  useEffect(() => {
    fetchAPI(endPoint, ({ meals: result }) => {
      setMeals(result.slice(0, FIRST_TWELVE));
    });
    fetchAPI(MEALS_CATEGORY_ENDPOINT, ({ meals: result }) => {
      setCategorys(result.slice(0, FIRST_FIVE));
    });
  }, [endPoint]);

  return (
    <div>
      <Header title="Meals" />
      <Recipes
        recipes={ meals }
        categorys={ categorys }
      />
      <Footer />
    </div>
  );
}
