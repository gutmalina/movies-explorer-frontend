import {Route, Link, Switch} from 'react-router-dom';
import headerLogo from '../../../src/images/header-logo.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';

function Header({onNavigation, isOpen, onClose, location}){
  const pathHeaderActive = [
    "/",
    "/movies",
    "/saved-movies"
  ];

  const pathHeaderTypeSign = [
    "/signup",
    "/signin"
  ];

  const classNameHeader = `header ${
    pathHeaderActive.includes(location) ? "header__active" :
    pathHeaderTypeSign.includes(location) ? "header__type_form_sign header__active" :
    location === "/profile" ? "header__type_form_profile header__active" : ""
  }`;


  return(
    <>
      <header className={classNameHeader}>
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
          <Route path={["/movies", "/saved-movies", "/profile"]}>
            <BurgerMenu
              onClick={onNavigation}
              location={location}
            />
            <Navigation
              isOpen={isOpen}
              onClose={onClose}
            />
          </Route>
        </Switch>
      </header>
    </>
  )
};

export default Header;
