import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { DoneRecipes } from '../pages';
import storageGetItemMock from './mocks/storageGetItemMock';

describe('Test a pagina DoneRecipes', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = storageGetItemMock;

    renderWithRouter(<DoneRecipes />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se a pagina possui o titulo Done Recipe.', () => {
    const TITLE = screen.getByRole('heading', { name: /done recipes done recipes/i });

    expect(TITLE).toBeInTheDocument();
    expect(TITLE).toHaveTextContent(/Done Recipe/i);
  });

  it('Verifica se possui test botões "All", "Meals" e "Drinks" para filtrar por tipo da receita.', () => {
    const BUTTON_ALL = screen.getByRole('button', { name: /all categories button all/i });
    const BUTTON_MEALS = screen.getByRole('button', { name: /meals categories button meals/i });
    const BUTTON_DRINKS = screen.getByRole('button', { name: /drinks categories button drinks/i });

    expect(BUTTON_ALL).toBeInTheDocument();
    expect(BUTTON_MEALS).toBeInTheDocument();
    expect(BUTTON_DRINKS).toBeInTheDocument();
  });

  it('Verifica se renderiza os cartões das receitas.', () => {
    expect(screen.getByText(/egg cream/i)).toBeInTheDocument();
    expect(screen.getByText(/bistek/i)).toBeInTheDocument();
    expect(screen.getByText(/banana daiquiri/i)).toBeInTheDocument();
    expect(screen.getByText(/orange scented hot chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/mango orange smoothie/i)).toBeInTheDocument();
    expect(screen.getByText(/lasagne/i)).toBeInTheDocument();
    expect(screen.getByText(/smoked haddock kedgeree/i)).toBeInTheDocument();
    expect(screen.getByText(/beef stroganoff/i)).toBeInTheDocument();
    expect(screen.getByText(/ayam percik/i)).toBeInTheDocument();
    expect(screen.getByText(/chicken handi/i)).toBeInTheDocument();
    expect(screen.getByText(/tamiya/i)).toBeInTheDocument();
  });

  it('Verifica se ao clica no botão "Meals" de filtrar por tipo comida aparece somente as receitas de comida.', () => {
    const BUTTON_MEALS = screen.getByRole('button', { name: /meals categories button meals/i });

    userEvent.click(BUTTON_MEALS);

    expect(screen.getByText(/bistek/i)).toBeInTheDocument();
    expect(screen.getByText(/lasagne/i)).toBeInTheDocument();

    expect(screen.queryByText(/egg cream/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/banana daiquiri/i)).not.toBeInTheDocument();
  });

  it('Verifica se ao clica no botão "Drinks" de filtrar por tipo bebida aparece somente as receitas de bebida.', () => {
    const BUTTON_DRINKS = screen.getByRole('button', { name: /drinks categories button drinks/i });

    userEvent.click(BUTTON_DRINKS);

    expect(screen.getByText(/egg cream/i)).toBeInTheDocument();
    expect(screen.getByText(/banana daiquiri/i)).toBeInTheDocument();

    expect(screen.queryByText(/bistek/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/lasagne/i)).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão "All" que limpa o filtro mostra receitas de comida e bebida', () => {
    const BUTTON_MEALS = screen.getByRole('button', { name: /meals categories button meals/i });
    const BUTTON_ALL = screen.getByRole('button', { name: /all categories button all/i });

    userEvent.click(BUTTON_MEALS);

    expect(screen.getByText(/lasagne/i)).toBeInTheDocument();
    expect(screen.queryByText(/egg cream/i)).not.toBeInTheDocument();

    userEvent.click(BUTTON_ALL);

    expect(screen.getByText(/lasagne/i)).toBeInTheDocument();
    expect(screen.getByText(/egg cream/i)).toBeInTheDocument();

    const BUTTON_DRINKS = screen.getByRole('button', { name: /drinks categories button drinks/i });

    userEvent.click(BUTTON_DRINKS);

    expect(screen.getByText(/banana daiquiri/i)).toBeInTheDocument();
    expect(screen.queryByText(/bistek/i)).not.toBeInTheDocument();

    userEvent.click(BUTTON_ALL);

    expect(screen.getByText(/lasagne/i)).toBeInTheDocument();
    expect(screen.getByText(/egg cream/i)).toBeInTheDocument();
  });
});
