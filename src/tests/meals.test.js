import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetchMock from './mocks/fetchMock';

describe('Testa a pagina Meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = fetchMock;

    const { history } = renderWithRouter(<App />);
    history.push('/meals');
  });

  it('Verifica se possui o titulo Meals', () => {
    const PAGE_TITLE = screen.getByRole('heading', { name: /meals meals/i });
    expect(PAGE_TITLE).toHaveTextContent(/meals/i);
  });

  it('Verifica se as receitas são renderizadas', async () => {
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /tamiya/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /timbits/i })).toBeInTheDocument();
  });

  it('Verifica se possui 6 botões de categorias "All", "Beef", "Breakfast", "Chicken", "Dessert" e "Goat"', async () => {
    expect(await screen.findByRole('button', { name: /all category button all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /beef category button beef/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /breakfast category button breakfast/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /chicken category button chicken/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dessert category button dessert/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /goat category button goat/i })).toBeInTheDocument();
  });

  it('Verifica se é possível fazer uma busca de recita pelo ingrediente da receita', async () => {
    const SEARCH_BUTTON = screen.getByRole('button', { name: /search button/i });
    userEvent.click(SEARCH_BUTTON);

    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();

    const SEARCH_TEXT_INPUT = screen.getByRole('textbox');
    const INGREDIENTE_RADIO_INPUT = screen.getByRole('radio', { name: /ingredient/i });
    const SEARCH = screen.getByRole('button', { name: /^SEARCH$/i });

    userEvent.type(SEARCH_TEXT_INPUT, 'lime');
    userEvent.click(INGREDIENTE_RADIO_INPUT);
    userEvent.click(SEARCH);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));

    expect(screen.getByRole('img', { name: /bbq pork sloppy joes/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /key lime pie/i })).toBeInTheDocument();
  });

  it('Verifica se é possível fazer uma busca de recita pelo nome da receita', async () => {
    const SEARCH_BUTTON = screen.getByRole('button', { name: /search button/i });
    userEvent.click(SEARCH_BUTTON);

    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();

    const SEARCH_TEXT_INPUT = screen.getByRole('textbox');
    const NAME_RADIO_INPUT = screen.getByRole('radio', { name: /name/i });
    const SEARCH = screen.getByRole('button', { name: /^SEARCH$/i });

    userEvent.type(SEARCH_TEXT_INPUT, 'fish');
    userEvent.click(NAME_RADIO_INPUT);
    userEvent.click(SEARCH);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));

    expect(screen.getByRole('img', { name: /fish fofos/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /portuguese fish stew \(caldeirada de peixe\)/i })).toBeInTheDocument();
  });

  it('Verifica se é possível fazer uma busca de recita pela primeira letra do nome da receita', async () => {
    const SEARCH_BUTTON = screen.getByRole('button', { name: /search button/i });
    userEvent.click(SEARCH_BUTTON);

    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();

    const SEARCH_TEXT_INPUT = screen.getByRole('textbox');
    const FIRST_LETTER_RADIO_INPUT = screen.getByRole('radio', { name: /first letter/i });
    const SEARCH = screen.getByRole('button', { name: /^SEARCH$/i });

    userEvent.type(SEARCH_TEXT_INPUT, 'H');
    userEvent.click(FIRST_LETTER_RADIO_INPUT);
    userEvent.click(SEARCH);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));

    expect(screen.getByRole('img', { name: /honey balsamic chicken with crispy broccoli & potatoes/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /honey teriyaki salmon/i })).toBeInTheDocument();
  });
});
