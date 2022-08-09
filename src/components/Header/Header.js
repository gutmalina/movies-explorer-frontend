import {Route, Link, Switch} from 'react-router-dom';
import headerLogo from '../../../src/images/header-logo.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';

function Header({onNavigation, isOpen, onClose, location}){
  const headerVisible = [
    "/",
    "/movies",
    "/saved-movies"
  ];

  const headerTypeSign = [
    "/signup",
    "/signin"
  ];

  const classNameHeader = `header ${
    headerVisible.includes(location) ? "header__visible" :
    headerTypeSign.includes(location) ? "header__type_form_sign header__visible" :
    location === "/profile" ? "header__type_form_profile header__visible" : ""
  }`;


  return(
    <header className={classNameHeader}>
      <Link to="/">
        <img
          className="header__logo link"
          src={headerLogo}
          alt="Логотип проекта"
        />
      </Link>
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
  )
};

export default Header;
