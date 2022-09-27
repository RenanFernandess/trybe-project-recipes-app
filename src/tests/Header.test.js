import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { meals } from '../../cypress/mocks/meals';
import Meals from '../pages/Meals';

describe('Testa o Header', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(() => jest.clearAllMocks());

  it('Testa se o Header possui um título, botão de busca e botão de perfil', () => {
    renderWithRouter(<Meals />);
    expect(screen.getByRole('img', { name: /imagessearch/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /meals/i })).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de busca, a barra de busca aparece na tela, e ao clicar novamente, ela desaparece', () => {
    renderWithRouter(<Meals />);
    userEvent.click(screen.getByRole('img', { name: /imagessearch/i }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    userEvent.click(screen.getByRole('img', { name: /imagessearch/i }));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
  it('Testa se ao selecionar um input de categoria, é realizado um fetch com o endpoint correto', () => {
    renderWithRouter(<Meals />);
    expect(screen.getByRole('radio', {
      name: /ingredientes/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /primeira letra/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /ingredientes/i })).toBeInTheDocument();

    userEvent.click(screen.getByRole('img', { name: /imagessearch/i }));

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    userEvent.type(screen.getByRole('textbox'));
  });

  it('Testa se ao clicar no botão de perfil, o usuário é redirecionado para a paǵina de perfil', () => {
    const { history } = renderWithRouter(<Meals />);
    userEvent.click(screen.getByRole('img', { name: /profile/i }));
    expect(history.location.pathname).toBe('/profile');
  });
});
