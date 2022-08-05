import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

/* Установить текущий год дя footer */
const getYear=()=>{
  return new Date().getFullYear();
}

function App() {
  return (
    <div className="body">
      <div className="page">
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/movies">
            <Movies />
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies />
          </Route>
        </Switch>
        <Footer date={getYear()} />
      </div>
    </div>
  );
}

export default App;
