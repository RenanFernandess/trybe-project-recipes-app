import React from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getItem } from '../helpers/storage';
import USER from '../services/variables';

export default function Profile({ history: { push } }) {
  const { email } = getItem(USER) || {};

  const logout = () => {
    localStorage.clear();
    push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <main>
        <p data-testid="profile-email">{ email }</p>
        <div>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => { push('/done-recipes'); } }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => { push('/favorite-recipes'); } }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            Logout
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
}.isRequired;
