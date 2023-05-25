import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import RecipeInProgress from '../pages/RecipeInProgress';
import mealsMock from './mocks/mealsMock';
import App from '../App';

describe('Testa a pagina RecipeInProgress', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsMock),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Testa se há o título ', async () => {
    renderWithRouter(<RecipeInProgress />);
    expect(await screen.findByText(/recipe in progress/i)).toHaveTextContent(/recipe in progress/i);
  });

  it('Testa se tem um botão para finalizar a receita desativado', async () => {
    renderWithRouter(<RecipeInProgress />);

    const button = await screen.findByRole('button', { name: /finish recipe/i });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Testa se contem todos os ingredientes ', async () => {
    renderWithRouter(<RecipeInProgress />);
    expect(await screen.findByText(/recipe in progress/i)).toBeInTheDocument();

    expect(screen.getByRole('checkbox', { name: /lentils: 1 cup/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /onion: 1 large/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /carrots: 1 large/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /tomato puree: 1 tbs/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /cumin: 2 tsp/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /paprika: 1 tsp/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /mint: 1\/2 tsp/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /thyme: 1\/2 tsp/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /black pepper: 1\/4 tsp/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /red pepper flakes: 1\/4 tsp/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /vegetable stock: 4 cups/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /water: 1 cup/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /sea salt: pinch/i })).toBeInTheDocument();
  });

  it('Testa se é possível selecionar todos os ingredientes', async () => {
    renderWithRouter(<RecipeInProgress />);
    expect(await screen.findByText(/recipe in progress/i)).toBeInTheDocument();

    const ingredient1 = screen.getByRole('checkbox', { name: /lentils: 1 cup/i });
    const ingredient2 = screen.getByRole('checkbox', { name: /onion: 1 large/i });
    const ingredient3 = screen.getByRole('checkbox', { name: /carrots: 1 large/i });
    const ingredient4 = screen.getByRole('checkbox', { name: /tomato puree: 1 tbs/i });
    const ingredient5 = screen.getByRole('checkbox', { name: /cumin: 2 tsp/i });
    const ingredient6 = screen.getByRole('checkbox', { name: /paprika: 1 tsp/i });
    const ingredient7 = screen.getByRole('checkbox', { name: /mint: 1\/2 tsp/i });
    const ingredient8 = screen.getByRole('checkbox', { name: /thyme: 1\/2 tsp/i });
    const ingredient9 = screen.getByRole('checkbox', { name: /black pepper: 1\/4 tsp/i });
    const ingredient10 = screen.getByRole('checkbox', { name: /red pepper flakes: 1\/4 tsp/i });
    const ingredient11 = screen.getByRole('checkbox', { name: /vegetable stock: 4 cups/i });
    const ingredient12 = screen.getByRole('checkbox', { name: /water: 1 cup/i });
    const ingredient13 = screen.getByRole('checkbox', { name: /sea salt: pinch/i });

    expect(ingredient1).not.toBeChecked();
    expect(ingredient2).not.toBeChecked();
    expect(ingredient3).not.toBeChecked();
    expect(ingredient4).not.toBeChecked();
    expect(ingredient5).not.toBeChecked();
    expect(ingredient6).not.toBeChecked();
    expect(ingredient7).not.toBeChecked();
    expect(ingredient8).not.toBeChecked();
    expect(ingredient9).not.toBeChecked();
    expect(ingredient10).not.toBeChecked();
    expect(ingredient11).not.toBeChecked();
    expect(ingredient12).not.toBeChecked();
    expect(ingredient13).not.toBeChecked();

    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);
    userEvent.click(ingredient5);
    userEvent.click(ingredient6);
    userEvent.click(ingredient7);
    userEvent.click(ingredient8);
    userEvent.click(ingredient9);
    userEvent.click(ingredient10);
    userEvent.click(ingredient11);
    userEvent.click(ingredient12);
    userEvent.click(ingredient13);

    expect(ingredient1).toBeChecked();
    expect(ingredient2).toBeChecked();
    expect(ingredient3).toBeChecked();
    expect(ingredient4).toBeChecked();
    expect(ingredient5).toBeChecked();
    expect(ingredient6).toBeChecked();
    expect(ingredient7).toBeChecked();
    expect(ingredient8).toBeChecked();
    expect(ingredient9).toBeChecked();
    expect(ingredient10).toBeChecked();
    expect(ingredient11).toBeChecked();
    expect(ingredient12).toBeChecked();
    expect(ingredient13).toBeChecked();
  });

  it(
    `Testa se apos selecionar todos os ingredientes o botão de finalizar
      receita e habilitado`,
    async () => {
      renderWithRouter(<RecipeInProgress />);
      const button = await screen.findByRole('button', { name: /finish recipe/i });

      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();

      userEvent.click(screen.getByRole('checkbox', { name: /lentils: 1 cup/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /onion: 1 large/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /carrots: 1 large/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /tomato puree: 1 tbs/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /cumin: 2 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /paprika: 1 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /mint: 1\/2 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /thyme: 1\/2 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /black pepper: 1\/4 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /red pepper flakes: 1\/4 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /vegetable stock: 4 cups/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /water: 1 cup/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /sea salt: pinch/i }));

      expect(button).not.toBeDisabled();
    },
  );

  it(
    `Testa se ao clicar no botão de finalizar a receita é redirecionado para a pagina 
    DoneRecipes`,
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/meals/52977/in-progress');
      const button = await screen.findByRole('button', { name: /finish recipe/i });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();

      userEvent.click(screen.getByRole('checkbox', { name: /lentils: 1 cup/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /onion: 1 large/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /carrots: 1 large/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /tomato puree: 1 tbs/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /cumin: 2 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /paprika: 1 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /mint: 1\/2 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /thyme: 1\/2 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /black pepper: 1\/4 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /red pepper flakes: 1\/4 tsp/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /vegetable stock: 4 cups/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /water: 1 cup/i }));
      userEvent.click(screen.getByRole('checkbox', { name: /sea salt: pinch/i }));

      expect(button).not.toBeDisabled();
      userEvent.click(button);

      expect(await screen.findByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    },
  );
});
