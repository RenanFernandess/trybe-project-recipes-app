import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from './mocks/fetchMock';

describe('Testa a page Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = fetchMock;

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
  });

  it('Verifica se possui o titulo Drinks', () => {
    const pageTitle = screen.getByRole('heading', { name: /drinks drinks/i });
    expect(pageTitle).toHaveTextContent(/drinks/i);
  });

  it('Verifica se as receitas são renderizadas', async () => {
    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /abc/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /b-53/i })).toBeInTheDocument();
  });

  it('Verifica se possui um footer com botões para alternar entre a pagina de comidade e bebida', () => {
    const drinksButton = screen.getByRole('button', { name: /drinks button/i });
    const mealsButton = screen.getByRole('button', { name: /meals button/i });
    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
  });

  it('Verifica se possui 6 botões de categorias "All", "Beef", "Breakfast", "Chicken", "Dessert" e "Goat"', async () => {
    expect(await screen.findByRole('button', { name: /all category button all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ordinary drink category button ordinary drink/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cocktail category button cocktail/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /shake category button shake/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /other \/ unknown category button other \/ unknown/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cocoa category button cocoa/i })).toBeInTheDocument();
  });

  it('Verifica se é possível fazer uma busca de recita pelo ingrediente da receita', async () => {
    const searchButton = screen.getByRole('button', { name: /search button/i });
    userEvent.click(searchButton);

    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();

    const searchTextInput = screen.getByRole('textbox');
    const ingredientRadioInput = screen.getByRole('radio', { name: /ingredient/i });
    const search = screen.getByRole('button', { name: /^search$/i });

    userEvent.type(searchTextInput, 'lime');
    userEvent.click(ingredientRadioInput);
    userEvent.click(search);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /gg/i }));

    expect(screen.getByRole('img', { name: /caipirissima/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /caipirinha/i })).toBeInTheDocument();
  });

  it('Verifica se é possível fazer uma busca de recita pelo nome da receita', async () => {
    const searchButton = screen.getByRole('button', { name: /search button/i });
    userEvent.click(searchButton);

    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();

    const searchTextInput = screen.getByRole('textbox');
    const nameRadioInput = screen.getByRole('radio', { name: /name/i });
    const search = screen.getByRole('button', { name: /^search$/i });

    userEvent.type(searchTextInput, 'Amaretto');
    userEvent.click(nameRadioInput);
    userEvent.click(search);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /gg/i }));

    expect(screen.getByRole('img', { name: /amaretto tea/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /amaretto sunset/i })).toBeInTheDocument();
  });

  it('Verifica se é possível fazer uma busca de recita pela primeira letra do nome da receita', async () => {
    const searchButton = screen.getByRole('button', { name: /search button/i });
    userEvent.click(searchButton);

    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();

    const searchTextInput = screen.getByRole('textbox');
    const firstLetterRadioInput = screen.getByRole('radio', { name: /first letter/i });
    const search = screen.getByRole('button', { name: /^search$/i });

    userEvent.type(searchTextInput, 'E');
    userEvent.click(firstLetterRadioInput);
    userEvent.click(search);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /^gg$/i }));

    expect(screen.getByRole('img', { name: /egg cream/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /espresso martini/i })).toBeInTheDocument();
  });

  describe('Testa os botões de busca por categoria', () => {
    it('Testa o botão de categoria ordinary drink', async () => {
      const ordinaryDrinkCategoryButton = await screen.findByRole('button', { name: /ordinary drink category button ordinary drink/i });
      userEvent.click(ordinaryDrinkCategoryButton);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /410 gone/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /a midsummernight dream/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria cocktail', async () => {
      const cocktailCategoryButton = await screen.findByRole('button', { name: /cocktail category button cocktail/i });
      userEvent.click(cocktailCategoryButton);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /57 chevy with a white license plate/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /absolutely fabulous/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria shake', async () => {
      const shakeCategoryButton = await screen.findByRole('button', { name: /shake category button shake/i });
      userEvent.click(shakeCategoryButton);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /^banana strawberry shake$/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /butter baby/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria other / unknown', async () => {
      const otherUnknownCategoryButton = await screen.findByRole('button', { name: /other \/ unknown category button other \/ unknown/i });
      userEvent.click(otherUnknownCategoryButton);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /a piece of ass/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /apple berry smoothie/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria cocoa', async () => {
      const cocoaCategoryButton = await screen.findByRole('button', { name: /cocoa category button cocoa/i });
      userEvent.click(cocoaCategoryButton);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /orange scented hot chocolate/i })).toBeInTheDocument();
    });

    it('Verifica se ao clicar no botão de todas as categorias, todas as receitas são exibidas', async () => {
      const shakeCategoryButton = await screen.findByRole('button', { name: /shake category button shake/i });
      userEvent.click(shakeCategoryButton);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /^banana strawberry shake$/i })).toBeInTheDocument();

      const allCategoriesButton = screen.getByRole('button', { name: /all category button all/i });
      userEvent.click(allCategoriesButton);
      expect(await screen.findByRole('img', { name: /abc/i })).toBeInTheDocument();
    });
  });
});
