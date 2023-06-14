import React, { useEffect, useContext, useState } from 'react';
import Header, {
  Recipes,
  Footer,
  SearchByDrinksCategory,
  AwaitReady,
} from '../../Components';
import RecipeContext from '../../context';
import { cupIcon } from '../../assets';
import { fetchDrinksAndCategories } from '../../helpers/fetchAPI';

export default function Drinks() {
  const { setRecipes, setCategories } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrinksAndCategories(({ recipes, categories }) => {
      setRecipes(recipes);
      setCategories(categories);
      setLoading(false);
    });
  }, [setRecipes, setCategories]);

  return (
    <div>
      <Header
        title="Drinks"
        icon={ cupIcon }
        enableSearchButton
      />
      <AwaitReady ready={ loading }>
        <SearchByDrinksCategory />
        <Recipes />
      </AwaitReady>
      <Footer />
    </div>
  );
}
