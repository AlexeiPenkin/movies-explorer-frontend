import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { Profile } from '../Profile/Profile';
import { SavedMovies } from '../SavedMovies/SavedMovies';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export const App = () => {
return (
  <Switch>
    <div className='page'>
      <Route exact path='/'>
        <Main />
      </Route>
      
      <Route path='/movies'>
        <Movies />
      </Route>
      
      <Route path='/saved-movies'>
        <SavedMovies />
      </Route>
      
      <Route path='/profile'>
        <Profile />
      </Route>
      
      <Route path='/signin'>
        <Login />
      </Route>
      
      <Route path='/signup'>
        <Register />
      </Route>
    </div>
    <Route path='/*'>
      <PageNotFound />
    </Route>
  </Switch>
  
  )
}
