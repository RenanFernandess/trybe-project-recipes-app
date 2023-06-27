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
    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/password/i);
    const login = screen.getByRole('button', { name: /enter/i });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });

  it('Verifica se o botão de "Enter" é habilitado se o formulario for valido', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('button', { name: /enter/i })).toBeDisabled();

    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/password/i);

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
    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/password/i);

    userEvent.type(email, EMAIL);
    userEvent.type(password, SENHA);
    userEvent.click(screen.getByRole('button', { name: /enter/i }));

    const mealsTitle = screen.getByRole('heading', { name: /meals meals/i });

    expect(history.location.pathname).toBe('/meals');
    expect(mealsTitle).toBeInTheDocument();
  });
});
