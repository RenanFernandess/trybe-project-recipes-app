import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';

describe('Testa o Header', () => {
  let returned;
  beforeEach(() => {
    returned = renderWithRouter(<Meals />);
  });
  it('Testa se o Header possui um título, botão de busca e botão de perfil', () => {
    expect(screen.getByRole('img', { name: /imagessearch/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /meals/i })).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de busca, a barra de busca aparece na tela, e ao clicar novamente, ela desaparece', () => {
    userEvent.click(screen.getByRole('img', { name: /imagessearch/i }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    userEvent.click(screen.getByRole('img', { name: /imagessearch/i }));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de perfil, o usuário é redirecionado para a paǵina de perfil', () => {
    const { history } = returned;
    userEvent.click(screen.getByRole('img', { name: /profile/i }));
    expect(history.location.pathname).toBe('/profile');
  });
});
