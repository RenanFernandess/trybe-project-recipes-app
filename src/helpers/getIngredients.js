export default function getIngredients(recipe) {
  const INGREDIENTS_NUMBER = 20;
  return Array(INGREDIENTS_NUMBER)
    .fill(undefined)
    .reduce((Acc, _, ind) => {
      const number = ind + 1;
      const ingredient = recipe[`strIngredient${number}`];
      const measure = recipe[`strMeasure${number}`];
      if (ingredient) return [...Acc, { ingredient, measure }];
      return Acc;
    }, []);
}
