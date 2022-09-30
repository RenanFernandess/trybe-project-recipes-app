import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import Meals from '../pages/Meals';
// import Drinks from '../pages/Drinks';
// import App from '../App';

describe('Testa pagina Meals', () => {
  beforeEach(() => {
    global.fetch = fetchTotal;
    jest.spyOn(global, 'fetch');
  });

  it('Testa o botão de categoria', async () => {
    renderWithRouter(<Meals />);
    expect(screen.getByTestId('Beed-category-filter').toBe('Beef');
    userEvent.click(buttonBeef);
    await waitFor(() => {
      const card = screen.getAllByTestId(/\Scard-name/i);
      expect(card).toHaveLength(12);
    });
  });
});
