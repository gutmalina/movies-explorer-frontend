import headerLogo from '../../../src/images/header-logo.svg';
import {Route, Link, Switch} from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Account from '../Account/Account';

function Header(){
  return(
    <>
      <header className="header">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Логотип проекта"
        />
        <Switch>
          <Route exact path="/">
            <div className='header__menu'>
              <Link to="/signup" className="header__menu_link link">Регистрация</Link>
              <Link to="/signin" className="header__menu_link link">
                <button type='button'className='header__menu-button button'>Войти</button>
              </Link>
            </div>
          </Route>
          <Route path="/movies">
            <BurgerMenu/>
            <div className="header__links">
              <div className="header__links_movies">
                <Link to="/movies" className="header__link link">Фильмы</Link>
                <Link to="/saved-movies" className="header__link link">Сохранённые фильмы</Link>
              </div>
              <Link to="/profile" className="header__account link">
                <Account/>
              </Link>
            </div>
          </Route>
        </Switch>
      </header>
    </>
  )
};

export default Header;
