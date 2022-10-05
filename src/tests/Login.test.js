import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const EMAIL = 'xablau@gmail.com';
const SENHA = '1234567';

describe('Testa a tela de Login', () => {
  it('Verifica se possui um formulario de login', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  it('Verifica se o botão de "Enter" é habilitado se o formulario for valido', () => {
    renderWithRouter(<App />);
    const buttonLogin = screen.getByTestId('login-submit-btn');
    expect(screen.getByRole('button', { name: /enter/i })).toBeDisabled();

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    userEvent.type(email, EMAIL);
    userEvent.type(password, '123456');

    expect(buttonLogin).toBeDisabled();

    userEvent.type(password, '7');

    expect(buttonLogin).not.toBeDisabled();
  });

  it('Verifica se clicar no botão de "Enter" é redirecionado para pagina de Meals', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    userEvent.type(email, EMAIL);
    userEvent.type(password, SENHA);
    userEvent.click(screen.getByRole('button', { name: /enter/i }));

    expect(history.location.pathname).toBe('/meals');
  });
});
