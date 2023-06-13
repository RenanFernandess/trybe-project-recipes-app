import React from 'react';
import Header, { FavoriteContent, Footer } from '../../Components';
import { favoriteIcon } from '../../assets';

export default function FavoriteRecipes() {
  return (
    <div>
      <Header
        icon={ favoriteIcon }
        title="Favorite Recipes"
      />
      <FavoriteContent />
      <Footer />
    </div>
  );
}
