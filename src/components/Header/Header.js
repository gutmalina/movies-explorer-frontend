import headerLogo from '../../../src/images/header-logo.svg';
import {Route, Link, Switch} from 'react-router-dom';

function Header(){
  return(
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
              <button type='button' className='header__menu-button button'>Войти</button>
            </Link>
          </div>
        </Route>
      </Switch>
      {/* <div className="header__burger">
        <div className="header__burger_item"></div>
        <div className="header__burger_item"></div>
        <div className="header__burger_item"></div>
      </div> */}
    </header>
  )
};

export default Header;
