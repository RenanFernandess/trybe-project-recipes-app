import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <nav>

        <button type="button" onClick={ () => history.push('/drinks') }>
          <img
            data-testid="drinks-bottom-btn"
            src="../images/drinkIcon.svg"
            alt="Drinks Icon"
          />
        </button>

        <button type="button" onClick={ () => history.push('/meals') }>
          <img
            data-testid="meals-bottom-btn"
            src="../images/mealIcon.svg"
            alt="Meals Icon"
          />
        </button>

      </nav>
    </footer>
  );
}
