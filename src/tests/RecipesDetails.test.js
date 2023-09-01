import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from './mocks/fetchMock';
import { MEAL_BUREK_MOCK } from './mocks/meals/mealsMock';

describe('Testa a pagina RecipeDetails', () => {
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

  it('Verifica se a pagina possui um header com o titulo da receita', async () => {
    const title = await screen.findByRole('heading', { name: /burek/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Burek');
  });

  it('Verifica se possui um botão para compartilhar a receita e outro para favoritar', async () => {
    const shareButton = await screen.findByRole('button', { name: /share button/i });
    const favoriteButton = screen.getByRole('button', { name: /favorite button/i });
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });

  it('Verifica se possui a categoria da receita', async () => {
    const category = await screen.findByText(/side/i);
    expect(category).toBeInTheDocument();
    expect(category).toHaveTextContent('Side');
  });

  it('Verifica se possui uma lista de ingredientes e o titulo ingredients', async () => {
    const ingredientsTitle = await screen.findByRole('heading', { name: /ingredients/i });
    expect(ingredientsTitle).toBeInTheDocument();
    expect(ingredientsTitle).toHaveTextContent('Ingredients');

    const ingredients = screen.getAllByRole('listitem');
    expect(ingredients).toHaveLength(6);
    expect(ingredients[0]).toHaveTextContent('Filo Pastry: 1 Packet');
    expect(ingredients[1]).toHaveTextContent('Minced Beef: 150g');
    expect(ingredients[2]).toHaveTextContent('Onion: 150g');
    expect(ingredients[3]).toHaveTextContent('Oil: 40g');
    expect(ingredients[4]).toHaveTextContent('Salt: Dash');
    expect(ingredients[5]).toHaveTextContent('Pepper: Dash');
  });

  it('Verifica se possui instruções de preparo', async () => {
    const instructionsTitle = await screen.findByRole('heading', { name: /instructions/i });
    expect(instructionsTitle).toBeInTheDocument();
    expect(instructionsTitle).toHaveTextContent('Instructions');

    const instructions = screen.getByText(/^Fry the finely chopped onions and minced meat in oil/i);
    expect(instructions).toBeInTheDocument();
    expect(instructions).toHaveTextContent(MEAL_BUREK_MOCK.meals[0].strInstructions);
  });

  it('Verifica se possui um video com a receita', async () => {
    const videoTitle = await screen.findByRole('heading', { name: /video/i });
    expect(videoTitle).toBeInTheDocument();
    expect(videoTitle).toHaveTextContent('Video');

    const video = screen.getByTitle(/embedded youtube/i);
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', 'https://www.youtube.com/embed/YsJXZwE5pdY');
  });

  it('Verifica se possui uma lista de receitas de bebidas recomendadas', async () => {
    const recommendedTitle = await screen.findByRole('heading', { name: /recommended/i });
    expect(recommendedTitle).toBeInTheDocument();
    expect(recommendedTitle).toHaveTextContent('Recommended');

    const recommended = screen.getAllByRole('link');
    expect(recommended).toHaveLength(6);
    expect(recommended[0]).toHaveTextContent(/GG/i);
    expect(recommended[1]).toHaveTextContent(/A1/i);
    expect(recommended[2]).toHaveTextContent(/Ace/i);
    expect(recommended[3]).toHaveTextContent(/747/i);
    expect(recommended[4]).toHaveTextContent(/Kir/i);
    expect(recommended[5]).toHaveTextContent(/ABC/i);
  });

  it('Verifica se possui um botão para iniciar o preparo da receita', async () => {
    const startRecipeButton = await screen.findByRole('button', { name: /start recipe/i });
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Start Recipe');
  });

  it('Verifica se clicar no botão de iniciar receita redireciona para a pagina de preparo', async () => {
    const startRecipeButton = await screen.findByRole('button', { name: /start recipe/i });
    expect(startRecipeButton).toBeInTheDocument();

    userEvent.click(startRecipeButton);
    const { history } = renderReturned;
    expect(history.location.pathname).toBe('/meals/53060/in-progress');
  });

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
