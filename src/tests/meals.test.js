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
    const pageTitle = screen.getByRole('heading', { name: /meals meals/i });
    expect(pageTitle).toHaveTextContent(/meals/i);
  });

  it('Verifica se as receitas são renderizadas', async () => {
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /tamiya/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /timbits/i })).toBeInTheDocument();
  });

  it('Verifica se possui um footer com botões para alternar entre a pagina de comidade e bebida', () => {
    const drinksButton = screen.getByRole('button', { name: /drinks button/i });
    const mealsButton = screen.getByRole('button', { name: /meals button/i });

    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
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
    const searchButton = screen.getByRole('button', { name: /search button/i });
    userEvent.click(searchButton);

    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();

    const searchTextInput = screen.getByRole('textbox');
    const ingredientRadioInput = screen.getByRole('radio', { name: /ingredient/i });
    const search = screen.getByRole('button', { name: /^search$/i });

    userEvent.type(searchTextInput, 'lime');
    userEvent.click(ingredientRadioInput);
    userEvent.click(search);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));

    expect(screen.getByRole('img', { name: /bbq pork sloppy joes/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /key lime pie/i })).toBeInTheDocument();
  });

  it('Verifica se é possível fazer uma busca de recita pelo nome da receita', async () => {
    const searchButton = screen.getByRole('button', { name: /search button/i });
    userEvent.click(searchButton);

    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();

    const searchTextInput = screen.getByRole('textbox');
    const nameRadioInput = screen.getByRole('radio', { name: /name/i });
    const search = screen.getByRole('button', { name: /^search$/i });

    userEvent.type(searchTextInput, 'fish');
    userEvent.click(nameRadioInput);
    userEvent.click(search);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));

    expect(screen.getByRole('img', { name: /fish fofos/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /portuguese fish stew \(caldeirada de peixe\)/i })).toBeInTheDocument();
  });

  it('Verifica se é possível fazer uma busca de recita pela primeira letra do nome da receita', async () => {
    const searchButton = screen.getByRole('button', { name: /search button/i });
    userEvent.click(searchButton);

    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();

    const searchTextInput = screen.getByRole('textbox');
    const firstLetterRadioInput = screen.getByRole('radio', { name: /first letter/i });
    const search = screen.getByRole('button', { name: /^search$/i });

    userEvent.type(searchTextInput, 'H');
    userEvent.click(firstLetterRadioInput);
    userEvent.click(search);

    await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));

    expect(screen.getByRole('img', { name: /honey balsamic chicken with crispy broccoli & potatoes/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /honey teriyaki salmon/i })).toBeInTheDocument();
  });

  describe('Testa os botões de busca por categoria', () => {
    it('Testa o botão de categoria beef', async () => {
      const beefCategoryButton = await screen.findByRole('button', { name: /beef category button beef/i });
      userEvent.click(beefCategoryButton);
      await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));
      expect(screen.getByRole('img', { name: /beef asado/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /beef stroganoff/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria breakfast', async () => {
      const breakfastCategoryButton = await screen.findByRole('button', { name: /breakfast category button breakfast/i });
      userEvent.click(breakfastCategoryButton);
      await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));
      expect(screen.getByRole('img', { name: /full english breakfast/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /smoked haddock kedgeree/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria chicken', async () => {
      const chickenCategoryButton = await screen.findByRole('button', { name: /chicken category button chicken/i });
      userEvent.click(chickenCategoryButton);
      await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));
      expect(screen.getByRole('img', { name: /ayam percik/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /chicken enchilada casserole/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria dessert', async () => {
      const dessertCategoryButton = await screen.findByRole('button', { name: /dessert category button dessert/i });
      userEvent.click(dessertCategoryButton);
      await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));
      expect(screen.getByRole('img', { name: /blackberry fool/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /carrot cake/i })).toBeInTheDocument();
    });

    it('Testa o botão de categoria goat', async () => {
      const goatCategoryButton = await screen.findByRole('button', { name: /goat category button goat/i });
      userEvent.click(goatCategoryButton);
      await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));
      expect(screen.getByRole('img', { name: /mbuzi choma \(roasted goat\)/i })).toBeInTheDocument();
    });

    it('Verifica se ao clicar no botão de todas as categorias, todas as receitas são exibidas', async () => {
      const beefCategoryButton = await screen.findByRole('button', { name: /beef category button beef/i });
      userEvent.click(beefCategoryButton);
      await waitForElementToBeRemoved(screen.queryByRole('img', { name: /corba/i }));
      expect(screen.getByRole('img', { name: /beef asado/i })).toBeInTheDocument();

      const allCategoriesButton = screen.getByRole('button', { name: /all category button all/i });
      userEvent.click(allCategoriesButton);
      expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();
    });
  });
});
