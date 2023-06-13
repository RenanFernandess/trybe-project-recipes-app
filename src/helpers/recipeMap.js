export default function recipeMap(recipe) {
  const {
    strArea,
    strCategory,
    idMeal,
    idDrink,
    strAlcoholic,
    strMeal,
    strDrink,
    strDrinkThumb,
    strMealThumb,
    strTags,
  } = recipe;

  return {
    alcoholicOrNot: strAlcoholic || '',
    category: strCategory,
    id: idMeal || idDrink,
    image: strMealThumb || strDrinkThumb,
    name: strMeal || strDrink,
    nationality: strArea || '',
    type: strMeal ? 'meal' : 'drink',
    tags: strTags && [strTags.split(', ')],
  };
}
