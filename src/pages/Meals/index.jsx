import React, { useEffect, useContext, useState } from 'react';
import Header, {
  AwaitReady,
  Footer,
  Recipes,
  SearchByMealsCategory,
} from '../../Components';
import RecipeContext from '../../context';
import { dishIcon } from '../../assets';
import { fetchMealsAndCategories } from '../../helpers/fetchAPI';

export default function Meals() {
  const { setRecipes, setCategories } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMealsAndCategories(({ recipes, categories }) => {
      setRecipes(recipes);
      setCategories(categories);
      setLoading(false);
    });
  }, [setRecipes, setCategories]);

  return (
    <div>
      <Header
        title="Meals"
        icon={ dishIcon }
        enableSearchButton
      />
      <AwaitReady ready={ loading }>
        <SearchByMealsCategory />
        <Recipes />
      </AwaitReady>
      <Footer />
    </div>
  );
}
