import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import {useState} from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { name } from '../../../src/utils/constants';


function App() {
  const { pathname } = useLocation();
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);

  /** Открыть попапы */
  const handleNavigationMenuClick = ()=>{
    setIsNavigationMenuOpen(true)
  }

  /** Закрыть попап */
  const closeAllPopups=()=>{
    setIsNavigationMenuOpen(false)
  }

  /* Установить текущий год дя footer */
  const getYear=()=>{
  return new Date().getFullYear();
  }

  return (
    <div className="body">
      <div className="page">
        <Header
          onNavigation={handleNavigationMenuClick}
          isOpen={isNavigationMenuOpen}
          onClose={closeAllPopups}
          location={pathname}
        />
        <Switch>
          <Route exact path="/">
            <Main
              location={pathname}
            />
          </Route>
          <Route exact path="/movies">
            <Movies
              location={pathname}
            />
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies
              location={pathname}
            />
          </Route>
          <Route exact path="/profile">
            <Profile
              title={`Привет, ${name}!`}
              location={pathname}
            />
          </Route>
          <Route exact path="/signup">
            <Register
              title="Добро пожаловать!"
              location={pathname}
            />
          </Route>
          <Route exact path="/signin">
            <Login
              title="Рады видеть!"
              location={pathname}
            />
          </Route>
          <Route exact path="*">
            <NotFound/>
          </Route>
        </Switch>
        <Footer
          date={getYear()}
          location={pathname}
        />
      </div>
    </div>
  );
}

export default App;
