import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const EMAIL = 'xablau@gmail.com';
const SENHA = '1234567';
const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';

describe('Testa a tela de Login', () => {
  it('Verifica se possui um formulario de login', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const login = screen.getByTestId('login-submit-btn');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });

  it('Verifica se o botão de "Enter" é habilitado se o formulario for valido', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('button', { name: /enter/i })).toBeDisabled();

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '123456');
    expect(password).toHaveValue('123456');
    expect(email).toHaveValue(EMAIL);
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enter/i })).toBeDisabled();

    userEvent.type(password, '7');

    expect(screen.getByRole('button', { name: /enter/i })).not.toBeDisabled();
  });

  it('Verifica se clicar no botão de "Enter" é redirecionado para pagina de Meals', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, EMAIL);
    userEvent.type(password, SENHA);
    userEvent.click(screen.getByRole('button', { name: /enter/i }));

    expect(history.location.pathname).toBe('/meals');
  });
});
