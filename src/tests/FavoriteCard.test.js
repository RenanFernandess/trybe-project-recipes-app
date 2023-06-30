import React from 'react';
import { screen, within } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { FavoriteCard } from '../Components/organisms';
import { FavoritesProvider } from '../context';

describe('Testa o FavoriteCard', () => {
  beforeEach(() => {
    renderWithRouter(
      <FavoritesProvider>
        <FavoriteCard
          alcoholicOrNot="Non alcoholic"
          category="Other / Unknown"
          id="12668"
          image="https://www.thecocktaildb.com/images/media/drink/mvis731484430445.jpg"
          name="Egg Cream"
          nationality=""
          type="drink"
        />
      </FavoritesProvider>,
    );
  });

  it('Verifica se possui a imagem da receita', () => {
    const IMAGE = screen.getByRole('img', { name: /egg cream image/i });
    expect(IMAGE).toBeInTheDocument();
  });

  it('Verifica se possui o titulo da receita', () => {
    const RECIPE_TITLE = screen.getByText(/egg cream/i);

    expect(RECIPE_TITLE).toBeInTheDocument();
  });

  it('Verifica se possui a categoria da receita', () => {
    const LINK = screen.getByRole('link', { name: /egg cream other \/ unknown non alcoholic/i });
    const CATEGORY = within(LINK).getByText(/other \/ unknown non alcoholic/i);

    expect(CATEGORY).toBeInTheDocument();
  });

  it('Verifica se possui um botão de compartilhar', () => {
    const SHARE_BUTTON = screen.getByRole('button', { name: /share button/i });
    expect(SHARE_BUTTON).toBeInTheDocument();
  });

  it('Verifica se possui um botão para favoritar a receita', () => {
    const FAVORITE_BUTTON = screen.getByRole('img', { name: /favorite button/i });
    expect(FAVORITE_BUTTON).toBeInTheDocument();
  });
});
