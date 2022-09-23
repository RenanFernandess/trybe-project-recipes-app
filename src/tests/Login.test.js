import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a tela de Login', () => {
  let returned;
  beforeEach(() => {
    returned = renderWithRouter(<App />);
  });

  it('Verifica se possui um formulario de login', () => {
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /senha/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument();
  });

  it('Verifica se o botão de "Enter" é habilitado se o formulario for valido', () => {
    expect(screen.getByRole('button', { name: /enter/i })).toBeDisabled();

    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByRole('textbox', { name: /senha/i });

    userEvent.type(email, 'xablau@gmail.com');
    userEvent.type(password, '123456');

    expect(screen.getByRole('button', { name: /enter/i })).toBeDisabled();

    userEvent.type(password, '7');

    expect(screen.getByRole('button', { name: /enter/i })).not.toBeDisabled();
  });

  it('Verifica se clicar no botão de "Enter" é redirecionado para pagina de Meals', () => {
    const { history } = returned;
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByRole('textbox', { name: /senha/i });

    userEvent.type(email, 'xablau@gmail.com');
    userEvent.type(password, '1234567');
    userEvent.click(screen.getByRole('button', { name: /enter/i }));

    expect(history.location.pathname).toBe('/meals');
  });
});
