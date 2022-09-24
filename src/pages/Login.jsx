import React, { useState } from 'react';
import propTypes from 'prop-types';
import saveItem from '../helpers/storage';
import USER, { DRINKS_TOKEN, MEALSTOKEN } from '../services/variables';

const MIN_PASSWORD_CHARACTERS = 6;
const REGEXP_EMAIL = /\S+@\S+\.\S+/;

export default function Login({ history }) {
  const [{ email, password }, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isValid = (password.length > MIN_PASSWORD_CHARACTERS) && REGEXP_EMAIL.test(email);

  const saveUser = () => {
    saveItem(USER, { email });
    saveItem(MEALSTOKEN, 1);
    saveItem(DRINKS_TOKEN, 1);
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email-input">
        Email
        <input
          type="email"
          data-testid="email-input"
          name="email"
          id="email-input"
          value={ email }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          type="text"
          data-testid="password-input"
          name="password"
          id="password-input"
          value={ password }
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isValid }
        onClick={ saveUser }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
}.isRequired;
