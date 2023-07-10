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
    const PAGE_TITLE = screen.getByRole('heading', { name: /drinks drinks/i });
    expect(PAGE_TITLE).toHaveTextContent(/drinks/i);
  });

  it('Verifica se as receitas são renderizadas', async () => {
    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /abc/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /b-53/i })).toBeInTheDocument();
  });

  it('Verifica se possui um footer com botões para alternar entre a pagina de comidade e bebida', () => {
    const DRINKS_BUTTON = screen.getByRole('button', { name: /drinks button/i });
    const MEALS_BUTTON = screen.getByRole('button', { name: /meals button/i });
    expect(DRINKS_BUTTON).toBeInTheDocument();
    expect(MEALS_BUTTON).toBeInTheDocument();
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
    const SEARCH_BUTTON = screen.getByRole('button', { name: /search button/i });
    userEvent.click(SEARCH_BUTTON);

    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();

    const SEARCH_TEXT_INPUT = screen.getByRole('textbox');
    const INGREDIENTE_RADIO_INPUT = screen.getByRole('radio', { name: /ingredient/i });
    const SEARCH = screen.getByRole('button', { name: /^SEARCH$/i });

    userEvent.type(SEARCH_TEXT_INPUT, 'lime');
    userEvent.click(INGREDIENTE_RADIO_INPUT);
    userEvent.click(SEARCH);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /gg/i }));

    expect(screen.getByRole('img', { name: /caipirissima/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /caipirinha/i })).toBeInTheDocument();
  });

  it('Verifica se é possível fazer uma busca de recita pelo nome da receita', async () => {
    const SEARCH_BUTTON = screen.getByRole('button', { name: /search button/i });
    userEvent.click(SEARCH_BUTTON);

    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();

    const SEARCH_TEXT_INPUT = screen.getByRole('textbox');
    const NAME_RADIO_INPUT = screen.getByRole('radio', { name: /name/i });
    const SEARCH = screen.getByRole('button', { name: /^SEARCH$/i });

    userEvent.type(SEARCH_TEXT_INPUT, 'Amaretto');
    userEvent.click(NAME_RADIO_INPUT);
    userEvent.click(SEARCH);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /gg/i }));

    expect(screen.getByRole('img', { name: /amaretto tea/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /amaretto sunset/i })).toBeInTheDocument();
  });

  it('Verifica se é possível fazer uma busca de recita pela primeira letra do nome da receita', async () => {
    const SEARCH_BUTTON = screen.getByRole('button', { name: /search button/i });
    userEvent.click(SEARCH_BUTTON);

    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();

    const SEARCH_TEXT_INPUT = screen.getByRole('textbox');
    const FIRST_LETTER_RADIO_INPUT = screen.getByRole('radio', { name: /first letter/i });
    const SEARCH = screen.getByRole('button', { name: /^SEARCH$/i });

    userEvent.type(SEARCH_TEXT_INPUT, 'E');
    userEvent.click(FIRST_LETTER_RADIO_INPUT);
    userEvent.click(SEARCH);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /^gg$/i }));

    expect(screen.getByRole('img', { name: /egg cream/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /espresso martini/i })).toBeInTheDocument();
  });

  describe('Testa os botões de busca por categoria', () => {
    it('Testa o botão de categoria ordinary drink', async () => {
      const ORDINARY_DRINK_BUTTON = await screen.findByRole('button', { name: /ordinary drink category button ordinary drink/i });
      userEvent.click(ORDINARY_DRINK_BUTTON);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /410 gone/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /a midsummernight dream/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria cocktail', async () => {
      const COCKTAIL_BUTTON = await screen.findByRole('button', { name: /cocktail category button cocktail/i });
      userEvent.click(COCKTAIL_BUTTON);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /57 chevy with a white license plate/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /absolutely fabulous/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria shake', async () => {
      const SHAKE_BUTTON = await screen.findByRole('button', { name: /shake category button shake/i });
      userEvent.click(SHAKE_BUTTON);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /^banana strawberry shake$/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /butter baby/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria other / unknown', async () => {
      const OTHER_UNKNOWN_BUTTON = await screen.findByRole('button', { name: /other \/ unknown category button other \/ unknown/i });
      userEvent.click(OTHER_UNKNOWN_BUTTON);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /a piece of ass/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /apple berry smoothie/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria cocoa', async () => {
      const COCOA_BUTTON = await screen.findByRole('button', { name: /cocoa category button cocoa/i });
      userEvent.click(COCOA_BUTTON);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /orange scented hot chocolate/i })).toBeInTheDocument();
    });

    it('Verifica se ao clicar no botão de todas as categorias, todas as receitas são exibidas', async () => {
      const SHAKE_BUTTON = await screen.findByRole('button', { name: /shake category button shake/i });
      userEvent.click(SHAKE_BUTTON);
      await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /abc/i }));
      expect(screen.getByRole('img', { name: /^banana strawberry shake$/i })).toBeInTheDocument();

      const ALL_CATEGORY_BUTTON = screen.getByRole('button', { name: /all category button all/i });
      userEvent.click(ALL_CATEGORY_BUTTON);
      expect(await screen.findByRole('img', { name: /abc/i })).toBeInTheDocument();
    });
  });
});
