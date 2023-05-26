import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from './mocks/fetchMock';

describe('Testa a page Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa se é possível buscar por categoria', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const categoryButton = await screen.findByRole('button', { name: /shake/i });

    expect(screen.queryByText(/banana strawberry shake/i)).toBe(null);

    userEvent.click(categoryButton);

    expect(await screen.findByText(/banana strawberry shake/i)).toBeInTheDocument();
  });
});
