import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import App from '../App';
import fetchMock from './mocks/fetchMock';

describe('Testa a pagina RecipeInProgress', () => {
  let renderReturned;

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = fetchMock;

    renderReturned = renderWithRouter(<App />);
    const { history } = renderReturned;
    history.push('/meals/53060');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Verifica se tem um botão para finalizar a receita desativado', async () => {
    userEvent.click(await screen.findByRole('button', { name: /start recipe/i }));
    const button = await screen.findByRole('button', { name: /finish recipe/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Testa se contem todos os ingredientes ', async () => {
    userEvent.click(await screen.findByRole('button', { name: /start recipe/i }));

    expect(screen.getByRole('checkbox', { name: /filo pastry: 1 packet/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /minced beef: 150g/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /onion: 150g/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /oil: 40g/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /salt: dash/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /pepper: dash/i })).toBeInTheDocument();
  });

  it('Testa se é possível selecionar todos os ingredientes', async () => {
    userEvent.click(await screen.findByRole('button', { name: /start recipe/i }));

    const ingredient1 = screen.getByRole('checkbox', { name: /filo pastry: 1 packet/i });
    const ingredient2 = screen.getByRole('checkbox', { name: /minced beef: 150g/i });
    const ingredient3 = screen.getByRole('checkbox', { name: /onion: 150g/i });
    const ingredient4 = screen.getByRole('checkbox', { name: /oil: 40g/i });
    const ingredient5 = screen.getByRole('checkbox', { name: /salt: dash/i });
    const ingredient6 = screen.getByRole('checkbox', { name: /pepper: dash/i });

    expect(ingredient1).not.toBeChecked();
    expect(ingredient2).not.toBeChecked();
    expect(ingredient3).not.toBeChecked();
    expect(ingredient4).not.toBeChecked();
    expect(ingredient5).not.toBeChecked();
    expect(ingredient6).not.toBeChecked();

    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);
    userEvent.click(ingredient5);
    userEvent.click(ingredient6);

    expect(ingredient1).toBeChecked();
    expect(ingredient2).toBeChecked();
    expect(ingredient3).toBeChecked();
    expect(ingredient4).toBeChecked();
    expect(ingredient5).toBeChecked();
    expect(ingredient6).toBeChecked();
  });

  it(
    `Testa se apos selecionar todos os ingredientes o botão de finalizar
      receita e habilitado`,
    async () => {
      userEvent.click(await screen.findByRole('button', { name: /start recipe/i }));

      const button = await screen.findByRole('button', { name: /finish recipe/i });

      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();

      userEvent.click(screen.getByRole('checkbox', { name: /filo pastry: 1 packet/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /minced beef: 150g/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /onion: 150g/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /oil: 40g/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /salt: dash/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /pepper: dash/i }));

      expect(button).not.toBeDisabled();
    },
  );

  it(
    `Testa se ao clicar no botão de finalizar a receita é redirecionado para a pagina
    DoneRecipes`,
    async () => {
      userEvent.click(await screen.findByRole('button', { name: /start recipe/i }));

      const button = await screen.findByRole('button', { name: /finish recipe/i });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();

      userEvent.click(screen.getByRole('checkbox', { name: /filo pastry: 1 packet/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /minced beef: 150g/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /onion: 150g/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /oil: 40g/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /salt: dash/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /pepper: dash/i }));

      expect(button).not.toBeDisabled();
      userEvent.click(button);

      expect(await screen.findByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    },
  );

  it('Verifica se é possível favoritar a receita', async () => {
    const favoriteButton = await screen.findByRole('button', { name: /favorite button/i });
    expect(favoriteButton).toBeInTheDocument();

    userEvent.click(favoriteButton);
    const { history } = renderReturned;
    history.push('/favorite-recipes');

    expect(history.location.pathname).toBe('/favorite-recipes');

    const favoriteRecipe = await screen.findByText(/burek/i);

    expect(favoriteRecipe).toBeInTheDocument();
  });
});
