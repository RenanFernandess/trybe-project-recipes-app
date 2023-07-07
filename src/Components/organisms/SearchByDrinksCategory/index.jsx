import React, { useContext, useState } from 'react';
import { CategoryButton } from '../../atoms';
import RecipeContext from '../../../context';
import { DRINKS_FILTER_BY_CATEGORY_ENDPOINT } from '../../../services/variables';
import fetchRecipes from '../../../helpers';
import { DRINKS_CATEGORIES_ICONS } from '../../../assets';
import Container from './styles';
import { fetchDrinks } from '../../../helpers/fetchAPI';

const ALL_CATEGORIES = 'All';

export default function SearchByDrinksCategory() {
  const { setRecipes, categories } = useContext(RecipeContext);
  const [category, setCategory] = useState(ALL_CATEGORIES);

  const searchByCategory = (value) => {
    fetchRecipes(`${DRINKS_FILTER_BY_CATEGORY_ENDPOINT}${value}`, setRecipes);
  };

  const setAllCategory = () => {
    setCategory(ALL_CATEGORIES);
    fetchDrinks(setRecipes);
  };

  const toggleCategory = (value) => {
    if (category === value || value === ALL_CATEGORIES) return setAllCategory();
    setCategory(value);
    searchByCategory(value);
  };

  return (
    <Container className="group-btn">
      <CategoryButton
        icon={ DRINKS_CATEGORIES_ICONS.All }
        alt="All category button"
        text="All"
        onClick={ () => { toggleCategory(ALL_CATEGORIES); } }
      />
      {
        categories.map(({ strCategory }) => (
          <CategoryButton
            key={ strCategory }
            text={ strCategory }
            icon={ DRINKS_CATEGORIES_ICONS[strCategory] }
            alt={ `${strCategory} category button` }
            onClick={ () => { toggleCategory(strCategory); } }
          />
        ))
      }
    </Container>
  );
}
