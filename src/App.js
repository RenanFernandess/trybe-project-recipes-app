import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login, {
  DoneRecipes,
  Drinks,
  FavoriteRecipes,
  Meals,
  Profile,
  RecipeDetails,
  RecipeInProgress,
} from './pages';
import { RecipeInProgressProvider } from './context';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <RecipeInProgressProvider>
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      </RecipeInProgressProvider>
    </Switch>
  );
}

export default App;
