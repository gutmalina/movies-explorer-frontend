import {Route, Link, Switch} from 'react-router-dom';
import {useState} from 'react';
import headerLogo from '../../../src/images/header-logo.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';

function Header({
  location
}){
  const [isMenuNavigationOpen, setIsMenuNavigationOpen] = useState(false)

  /** Открыть меню */
  const handleMenuOpen = ()=>{
    setIsMenuNavigationOpen(true)
  }

  /** Закрыть меню */
  const handleMenuClose=()=>{
    setIsMenuNavigationOpen(false)
  }

  const headerMovies = [
    "/movies",
    "/saved-movies"
  ]

  const headerTypeSign = [
    "/signup",
    "/signin"
  ]

  const classNameHeader = `header ${
    location === "/" ? "header__visible" :
    headerMovies.includes(location) ? "header__type_form_movies header__visible" :
    headerTypeSign.includes(location) ? "header__type_form_sign header__visible" :
    location === "/profile" ? "header__type_form_profile header__visible" : ""
  }`


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
            <Link
              to="/signup"
              className="header__menu_link link">
                Регистрация
            </Link>
            <Link
              to="/signin"
              className="header__menu_link link">
              <button
                type='button'
                className='header__menu-button button'>
                  Войти
              </button>
            </Link>
          </div>
        </Route>
        <Route path={["/movies", "/saved-movies", "/profile"]}>
          <BurgerMenu
            handleMenuOpen={handleMenuOpen}
            location={location}
          />
          <Navigation
            isOpen={isMenuNavigationOpen}
            handleMenuClose={handleMenuClose}
          />
        </Route>
      </Switch>
    </header>
  )
};

export default Header
