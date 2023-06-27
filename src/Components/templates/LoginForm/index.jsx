import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import USER, { DRINKS_TOKEN, MEALSTOKEN } from '../../../services/variables';
import saveItem from '../../../helpers/storage';
import TextInput, { Button } from '../../atoms';
import Form from './styles';

const MIN_PASSWORD_CHARACTERS = 6;
const REGEXP_EMAIL = /\S+@\S+\.\S+/;

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const buttonIsDisabled = (password.length > MIN_PASSWORD_CHARACTERS)
    && REGEXP_EMAIL.test(email);

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
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <TextInput
        placeholder="Password"
        type="password"
        name="password"
        value={ password }
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <Button
        disabled={ !buttonIsDisabled }
        onClick={ saveUser }
      >
        Enter
      </Button>
    </Form>
  );
}
