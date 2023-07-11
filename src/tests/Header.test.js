import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetchMock from './mocks/fetchMock';

describe('Test o componente Header', () => {
  let renderReturn;

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = fetchMock;

    renderReturn = renderWithRouter(<App />);
    const { history } = renderReturn;
    history.push('/meals');
  });

  it('Verifica se possui um elemento header com o titulo Recipesapp', () => {
    const appTitle = screen.getByRole('heading', { name: /recipes/i });

    expect(appTitle).toBeInTheDocument();
    expect(appTitle).toHaveTextContent(/recipesapp/i);
  });

  it('Verifica se possui um botão com ícone de lupa', () => {
    const searchButton = screen.getByRole('button', { name: /search button/i });
    const searchIcon = within(searchButton).getByRole('img', { name: /search button/i });

    expect(searchIcon).toBeInTheDocument();
  });

  it('Verifica se possui um botão ícone de perfil', () => {
    const profileButton = screen.getByRole('button', { name: /profile/i });
    const profileIcon = within(profileButton).getByRole('img', { name: /profile/i });

    expect(profileIcon).toBeInTheDocument();
  });

  it('Verifica se possui o titulo da pagina', () => {
    const pageTitle = screen.getByRole('heading', { name: /meals meals/i });

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/meals/i);
  });

  describe('Verifica se ao clicar o botão com ícone de lupa mostra a barra de pesquisa', () => {
    beforeEach(() => {
      const searchButton = screen.getByRole('button', { name: /search button/i });
      userEvent.click(searchButton);
    });

    it('A barra de pesquisa deve ter um campo de texto', () => {
      const inputText = screen.getByRole('textbox');

      expect(inputText).toBeInTheDocument();
      expect(inputText).toHaveAttribute('placeholder', 'Search');
    });

    it('Verifica se possui tres inputs radios "Name", "Ingrediente" e "First letter" para selecionar o tipo de busca', () => {
      const ingredientInput = screen.getByRole('radio', { name: /ingredient/i });
      const nameInput = screen.getByRole('radio', { name: /name/i });
      const firstLetterInput = screen.getByRole('radio', { name: /first letter/i });

      expect(ingredientInput).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
      expect(firstLetterInput).toBeInTheDocument();
    });

    it('Verifica se possui um botão de pesquisa', () => {
      const searchButton = screen.getByRole('button', { name: /^search$/i });

      expect(searchButton).toBeInTheDocument();
    });
  });

  it('Verifica se ao clicar no botão com ícone de perfil redireciona para a pagina de perfil', () => {
    const { history } = renderReturn;

    const profileButton = screen.getByRole('button', { name: /profile/i });

    userEvent.click(profileButton);

    const pageTitle = screen.getByRole('heading', { name: /profile profile/i });

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/profile/i);
    expect(history.location.pathname).toBe('/profile');
  });

  describe('testa se o botão com ícone de lupa aparece nas paginas corretas', () => {
    it('Verifica se aparece na pagina /meals', () => {
      const searchButton = screen.queryByRole('button', { name: /search button/i });

      expect(searchButton).toBeInTheDocument();
    });
    it('Verifica se aparece na pagina /drinks', () => {
      const { history } = renderReturn;
      history.push('/drinks');

      const searchButton = screen.queryByRole('button', { name: /search button/i });

      expect(searchButton).toBeInTheDocument();
    });
    it('Verifica se não aparece na pagina /favorite-recipes', () => {
      const { history } = renderReturn;
      history.push('/favorite-recipes');

      const searchButton = screen.queryByRole('button', { name: /search button/i });

      expect(searchButton).not.toBeInTheDocument();
    });
    it('Verifica se não aparece na pagina /done-recipes', () => {
      const { history } = renderReturn;
      history.push('/done-recipes');

      const searchButton = screen.queryByRole('button', { name: /search button/i });

      expect(searchButton).not.toBeInTheDocument();
    });
  });
});
