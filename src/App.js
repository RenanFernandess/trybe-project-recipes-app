import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import idDaReceita from './pages/idDaReceita';
import Favorites from './pages/Favorites';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/meals/:id" component={ idDaReceita } />
      <Route path="/drinks/:id" component={ idDaReceita } />
      <Route path="/meals/:id/in-progress" component={ idDaReceita } />
      <Route path="/drinks/:id/in-progress" component={ idDaReceita } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default App;
