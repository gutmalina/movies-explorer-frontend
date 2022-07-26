import {Route, Link, Switch} from 'react-router-dom';
import {useState} from 'react';
import headerLogo from '../../../src/images/header-logo.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';

function Header({
  loggedIn,
  location,
}){
  const [menuNavigationOpen, setMenuNavigationOpen] = useState(false)

  /** Открыть меню */
  const handleMenuOpen = ()=>{
    setMenuNavigationOpen(true)
  }

  /** Закрыть меню */
  const handleMenuClose=()=>{
    setMenuNavigationOpen(false)
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
        {!loggedIn ?
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
          :
          <Route path={["/", "/movies", "/saved-movies", "/profile"]}>
            <BurgerMenu
              handleMenuOpen={handleMenuOpen}
            />
            <Navigation
              menuNavigationOpen={menuNavigationOpen}
              handleMenuClose={handleMenuClose}
            />
          </Route>
        }
      </Switch>
    </header>
  )
};

export default Header
