import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MakingRecipe } from '../../Components';
import { RecipeInProgressContext } from '../../context';

export default function RecipeInProgress() {
  const { id } = useParams();
  const { location: { pathname }, push } = useHistory();
  const { RECIPE_ID } = useContext(RecipeInProgressContext);
  const SAME_RECIPE = id === RECIPE_ID;

  useEffect(() => {
    if (!SAME_RECIPE) {
      const RECIPE_DETAILS_PATH = pathname.match(/\/[A-z]+\/[0-9]+/ig)[0];
      push(RECIPE_DETAILS_PATH);
    }
  }, [SAME_RECIPE, pathname, push]);

  return (
    <div>
      { SAME_RECIPE && <MakingRecipe /> }
    </div>
  );
}
