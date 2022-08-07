import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {useState} from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import { name } from '../../../src/utils/constants';


function App() {
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
        />
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
          <Route exact path="/profile">
            <Profile
              title={`Привет, ${name}!`}
            />
          </Route>
          <Route exact path="/signup">
            <Register
              title="Добро пожаловать!"
            />
          </Route>
          <Route exact path="/signin">
            <Login
              title="Рады видеть!"
            />
          </Route>
        </Switch>
        <Footer date={getYear()} />
      </div>
    </div>
  );
}

export default App;
