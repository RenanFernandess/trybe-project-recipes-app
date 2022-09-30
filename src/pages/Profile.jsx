import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getItem } from '../helpers/storage';
import USER from '../services/variables';

export default function Profile() {
  const { email } = getItem(USER) || {};
  return (
    <div>
      <Header title="Profile" />
      <main>
        <p data-testid="profile-email">{ email }</p>
        <div>
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
