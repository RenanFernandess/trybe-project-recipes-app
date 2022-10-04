/* import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import Meals from '../pages/Meals';

describe('Testa pagina Meals', () => {
  beforeEach(() => {
    global.fetch = fetchTotal;
    jest.spyOn(global, 'fetch');
  });

  it('Testa o botão de categoria', async () => {
    renderWithRouter(<Meals />);
    const buttonBeef = screen.getByTestId('Beef-category-filter');
    userEvent.click(buttonBeef);
    expect(buttonBeef).toBe('Beef');
    await waitFor(() => {
      const card = screen.getAllByTestId(/\S-card-name/i);
      expect(card).toHaveLength(12);
    });
  });
});
 */
