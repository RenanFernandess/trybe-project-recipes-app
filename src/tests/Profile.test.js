import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import storageGetItemMock from './mocks/storageGetItemMock';

describe('Testa a pagina Profile', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = storageGetItemMock;

    const { history } = renderWithRouter(<App />);
    history.push('/profile');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se possui o titulo Profile', () => {
    const PAGE_TITLE = screen.getByRole('heading', { name: /profile profile/i });
    expect(PAGE_TITLE).toHaveTextContent(/profile/i);
  });

  it('Verifica se possui o e-mail da pessoa usuária', () => {
    const EMAIL = screen.getByText(/jose_receitas@gmail.com/i);
    expect(EMAIL).toHaveTextContent('jose_receitas@gmail.com');
  });

  it('Verifica se possui um footer com botões para alternar entre a pagina de comidade e bebida', () => {
    const DRINKS_BUTTON = screen.getByRole('button', { name: /drinks button/i });
    const MEALS_BUTTON = screen.getByRole('button', { name: /meals button/i });
    expect(DRINKS_BUTTON).toBeInTheDocument();
    expect(MEALS_BUTTON).toBeInTheDocument();
  });

  it('Verifica se possui um botão com o texto "Done Recipe" que oa ser clicado redireciona para a pagina de receitas feitas', () => {
    const BUTTON = screen.getByRole('button', { name: /done recipes button done recipes/i });
    expect(BUTTON).toHaveTextContent(/done recipes/i);

    userEvent.click(BUTTON);

    const DONE_RECIPES_TITLE = screen.getByRole('heading', { name: /done recipes done recipes/i });
    expect(DONE_RECIPES_TITLE).toBeInTheDocument();
  });

  it('Verifica se possui um botão com o texto "Favorite Recipe" que oa ser clicado redireciona para a pagina de receitas favoritas', () => {
    const BUTTON = screen.getByRole('button', { name: /favorite recipes button favorite recipes/i });
    expect(BUTTON).toHaveTextContent(/Favorite Recipe/i);

    userEvent.click(BUTTON);

    const FAVORITE_RECIPES_TITLE = screen.getByRole('heading', { name: /favorite recipes favorite recipes/i });
    expect(FAVORITE_RECIPES_TITLE).toBeInTheDocument();
  });

  it('Verifica se possui um botão com o texto "Logout" que oa ser clicado redireciona para a pagina de login', () => {
    const BUTTON = screen.getByRole('button', { name: /logout button logout/i });
    expect(BUTTON).toHaveTextContent(/logout/i);

    userEvent.click(BUTTON);

    const LOGIN_TITLE = screen.getByRole('heading', { name: /login/i });
    expect(LOGIN_TITLE).toBeInTheDocument();
  });
});
