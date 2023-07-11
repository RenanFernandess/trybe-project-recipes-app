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
    const pageTitle = screen.getByRole('heading', { name: /profile profile/i });
    expect(pageTitle).toHaveTextContent(/profile/i);
  });

  it('Verifica se possui o e-mail da pessoa usuária', () => {
    const EMAIL = screen.getByText(/jose_receitas@gmail.com/i);
    expect(EMAIL).toHaveTextContent('jose_receitas@gmail.com');
  });

  it('Verifica se possui um footer com botões para alternar entre a pagina de comidade e bebida', () => {
    const drinksButton = screen.getByRole('button', { name: /drinks button/i });
    const mealsButton = screen.getByRole('button', { name: /meals button/i });
    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
  });

  it('Verifica se possui um botão com o texto "Done Recipe" que oa ser clicado redireciona para a pagina de receitas feitas', () => {
    const button = screen.getByRole('button', { name: /done recipes button done recipes/i });
    expect(button).toHaveTextContent(/done recipes/i);

    userEvent.click(button);

    const doneRecipesTitle = screen.getByRole('heading', { name: /done recipes done recipes/i });
    expect(doneRecipesTitle).toBeInTheDocument();
  });

  it('Verifica se possui um botão com o texto "Favorite Recipe" que oa ser clicado redireciona para a pagina de receitas favoritas', () => {
    const button = screen.getByRole('button', { name: /favorite recipes button favorite recipes/i });
    expect(button).toHaveTextContent(/Favorite Recipe/i);

    userEvent.click(button);

    const favoriteRecipesTitle = screen.getByRole('heading', { name: /favorite recipes favorite recipes/i });
    expect(favoriteRecipesTitle).toBeInTheDocument();
  });

  it('Verifica se possui um botão com o texto "Logout" que oa ser clicado redireciona para a pagina de login', () => {
    const button = screen.getByRole('button', { name: /logout button logout/i });
    expect(button).toHaveTextContent(/logout/i);

    userEvent.click(button);

    const loginPageTitle = screen.getByRole('heading', { name: /login/i });
    expect(loginPageTitle).toBeInTheDocument();
  });
});
