/* import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const EMAIL = 'xablau@gmail.com';
const SENHA = '1234567';
// const RECIPE_ID = '52977';
// console.log(RECIPE_ID);

describe('Testa a página de detalhes da receita', () => {
  let returned;
  beforeEach(() => {
    returned = renderWithRouter(<App />);
  });

  test('testa se a página de detalhes possui o url correspondente ao id da receita', async () => {
    const emailField = screen.getByRole('textbox', { name: /email/i });
    const passwordField = screen.getByRole('textbox', { name: /senha/i });
    const enterBtn = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailField, EMAIL);
    userEvent.type(passwordField, SENHA);
    userEvent.click(enterBtn);

    const recipe = await waitFor(() => screen.getByText(/corba/i));
    userEvent.click(recipe);

    const { history } = returned;
    expect(history.location.pathname).toBe('/meals/52977');
    // expect(history.location.pathname).toBe('RECIPE_ID');
  });
});
 */
