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
    const APP_TITLE = screen.getByRole('heading', { name: /recipes/i });

    expect(APP_TITLE).toBeInTheDocument();
    expect(APP_TITLE).toHaveTextContent(/recipesapp/i);
  });

  it('Verifica se possui um botão com ícone de lupa', () => {
    const SEARCH_BUTTON = screen.getByRole('button', { name: /search button/i });
    const SEARCH_ICON = within(SEARCH_BUTTON).getByRole('img', { name: /search button/i });

    expect(SEARCH_ICON).toBeInTheDocument();
  });

  it('Verifica se possui um botão ícone de perfil', () => {
    const PROFILE_BUTTON = screen.getByRole('button', { name: /profile/i });
    const PROFILE_ICON = within(PROFILE_BUTTON).getByRole('img', { name: /profile/i });

    expect(PROFILE_ICON).toBeInTheDocument();
  });

  it('Verifica se possui o titulo da pagina', () => {
    const PAGE_TITLE = screen.getByRole('heading', { name: /meals meals/i });

    expect(PAGE_TITLE).toBeInTheDocument();
    expect(PAGE_TITLE).toHaveTextContent(/meals/i);
  });

  describe('Verifica se ao clicar o botão com ícone de lupa mostra a barra de pesquisa', () => {
    beforeEach(() => {
      const SEARCH_BUTTON = screen.getByRole('button', { name: /search button/i });
      userEvent.click(SEARCH_BUTTON);
    });

    it('A barra de pesquisa deve ter um campo de texto', () => {
      const INPUT_TEXT = screen.getByRole('textbox');

      expect(INPUT_TEXT).toBeInTheDocument();
      expect(INPUT_TEXT).toHaveAttribute('placeholder', 'Search');
    });

    it('Verifica se possui tres inputs radios "Name", "Ingrediente" e "First letter" para selecionar o tipo de busca', () => {
      const INGREDIENT_INPUT = screen.getByRole('radio', { name: /ingredient/i });
      const NAME_INPUT = screen.getByRole('radio', { name: /name/i });
      const FIRST_LETTER = screen.getByRole('radio', { name: /first letter/i });

      expect(INGREDIENT_INPUT).toBeInTheDocument();
      expect(NAME_INPUT).toBeInTheDocument();
      expect(FIRST_LETTER).toBeInTheDocument();
    });

    it('Verifica se possui um botão de pesquisa', () => {
      const SEARCH_BUTTON = screen.getByRole('button', { name: /^SEARCH$/i });

      expect(SEARCH_BUTTON).toBeInTheDocument();
    });
  });

  it('Verifica se ao clicar no botão com ícone de perfil redireciona para a pagina de perfil', () => {
    const { history } = renderReturn;

    const PROFILE_BUTTON = screen.getByRole('button', { name: /profile/i });

    userEvent.click(PROFILE_BUTTON);

    const PAGE_TITLE = screen.getByRole('heading', { name: /profile profile/i });

    expect(PAGE_TITLE).toBeInTheDocument();
    expect(PAGE_TITLE).toHaveTextContent(/profile/i);
    expect(history.location.pathname).toBe('/profile');
  });

  describe('testa se o botão com ícone de lupa aparece nas paginas corretas', () => {
    it('Verifica se aparece na pagina /meals', () => {
      const SEARCH_BUTTON = screen.queryByRole('button', { name: /search button/i });

      expect(SEARCH_BUTTON).toBeInTheDocument();
    });
    it('Verifica se aparece na pagina /drinks', () => {
      const { history } = renderReturn;
      history.push('/drinks');

      const SEARCH_BUTTON = screen.queryByRole('button', { name: /search button/i });

      expect(SEARCH_BUTTON).toBeInTheDocument();
    });
    it('Verifica se não aparece na pagina /favorite-recipes', () => {
      const { history } = renderReturn;
      history.push('/favorite-recipes');

      const SEARCH_BUTTON = screen.queryByRole('button', { name: /search button/i });

      expect(SEARCH_BUTTON).not.toBeInTheDocument();
    });
    it('Verifica se não aparece na pagina /done-recipes', () => {
      const { history } = renderReturn;
      history.push('/done-recipes');

      const SEARCH_BUTTON = screen.queryByRole('button', { name: /search button/i });

      expect(SEARCH_BUTTON).not.toBeInTheDocument();
    });
  });
});
