import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

describe('Testa o Header', () => {
  beforeEach(() => {
    global.fetch = fetchTotal;
    jest.spyOn(global, 'fetch');
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
  it('Se é chamado quando clicado no radio Name paginas são chamadas corretamente.', async () => {
    const { history } = renderWithRouter(<Meals />);
    // botão search o simbolo de pesquisar
    const searchTop = screen.getByRole('button', { name: /imagessearch/i });
    expect(searchTop).toBeInTheDocument();
    userEvent.click(searchTop);
    // expect(screen.getByRole('textbox')).toBeCalled();
    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'Arrabiata');
    // depois vou clicar no input name
    const radioName = screen.getByTestId('name-search-radio');
    userEvent.click(radioName);
    await waitFor(() => {
      const busca = screen.getByText(/nome/i);
      userEvent.click(busca);

      expect(history.location.pathname).toBe('/meals/:id');
    });
    // depois disso ele teria que ir para Recipe Details
    // const recipesDet = screen.getByRole('heading', { name: /recipesdetails/i,});
    // const link = 'http://localhost:3000/meals/52771';
    // expect(recipesDet).toBe(link);
  });
  it('Se é chamado as paginas corretamente.', () => {
    renderWithRouter(<Drinks />);
  });
});
