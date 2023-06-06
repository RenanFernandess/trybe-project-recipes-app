import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import USER, { DRINKS_TOKEN, MEALSTOKEN } from '../../../services/variables';
import saveItem from '../../../helpers/storage';
import TextInput, { Button } from '../../atoms';
import Form from './styles';

const MIN_PASSWORD_CHARACTERS = 6;
const REGEXP_EMAIL = /\S+@\S+\.\S+/;

export default function LoginForm() {
  const [{ email, password }, setLogin] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

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
    <Form>
      <TextInput
        type="email"
        placeholder="Email"
        name="email"
        value={ email }
        onChange={ handleChange }
      />
      <TextInput
        placeholder="Password"
        type="password"
        name="password"
        value={ password }
        onChange={ handleChange }
      />
      <Button
        disabled={ !isValid }
        onClick={ saveUser }
      >
        Enter
      </Button>
    </Form>
  );
}
