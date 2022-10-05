import React from 'react';
import { useHistory } from 'react-router-dom';
import DRINK_INCON from '../images/drinkIcon.svg';
import '../css/Recipes.css';
import MEAL_INCON from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <nav className="footer-container">

        <button type="button" onClick={ () => history.push('/drinks') }>
          <img
            data-testid="drinks-bottom-btn"
            src={ DRINK_INCON }
            alt="Drinks Icon"
          />
        </button>

        <button type="button" onClick={ () => history.push('/meals') }>
          <img
            data-testid="meals-bottom-btn"
            src={ MEAL_INCON }
            alt="Meals Icon"
          />
        </button>

      </nav>
    </footer>
  );
}
