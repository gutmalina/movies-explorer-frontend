import {NavLink} from 'react-router-dom';
import Account from "../Account/Account";

function Navigation({
  menuNavigationOpen,
  handleMenuClose
}) {
  const navigation = `navigation ${menuNavigationOpen ? 'navigation__opened' : ''}`

  return (
    <div className={navigation}>
      <button
        className="navigation__button_close button"
        aria-label="Закрыть"
        onClick={handleMenuClose}>
      </button>
      <ul className="navigation__list">
        <NavLink
          exact
          to="/"
          className="navigation__list_item list link"
          activeClassName='navigation__list_item-active'
          onClick={handleMenuClose}>
            Главная
          </NavLink>
        <NavLink
          to="/movies"
          className="navigation__list_item list link"
          activeClassName='navigation__list_item-active'
          onClick={handleMenuClose}>
            Фильмы
          </NavLink>
        <NavLink
          to="/saved-movies"
          className="navigation__list_item list link"
          activeClassName='navigation__list_item-active'
          onClick={handleMenuClose}>
            Сохранённые фильмы
          </NavLink>
      </ul>
      <Account
        handleMenuClose={handleMenuClose}
      />
    </div>
  );
}

export default Navigation
