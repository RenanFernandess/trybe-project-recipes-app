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
  MEALS_FILTER_BY_CATEGOTY_ENDPOINT,
} from '../services/variables';

export default function Meals() {
  const { URL, setURL } = useContext(appContext);
  const [categorys, setCategorys] = useState([]);
  const [meals, setMeals] = useState([]);
  const END_POINT = URL || MEALS_ENDPOINT;

  useEffect(() => {
    fetchAPI(END_POINT, ({ meals: recipes }) => {
      const result = recipes || [];
      const LAST_INDEX = (result.length < FIRST_TWELVE) ? result.length : FIRST_TWELVE;
      setMeals(result.slice(0, LAST_INDEX));
    });
    fetchAPI(MEALS_CATEGORY_ENDPOINT, ({ meals: result }) => {
      setCategorys(result.slice(0, FIRST_FIVE));
    });
  }, [END_POINT, URL]);

  useEffect(() => () => { setURL(''); }, [setURL]);

  const filterByCategory = ({ target: { value } }) => {
    setURL(`${MEALS_FILTER_BY_CATEGOTY_ENDPOINT}${value}`);
  };

  return (
    <div>
      <Header title="Meals" />
      <Recipes
        recipes={ meals }
        categorys={ categorys }
        filterByCategory={ filterByCategory }
      />
      <Footer />
    </div>
  );
}
