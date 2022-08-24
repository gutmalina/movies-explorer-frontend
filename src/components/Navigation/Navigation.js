import {Link} from 'react-router-dom';
import Account from "../Account/Account";

function Navigation({isOpen, handleMenuClose}) {
  const navigation = `navigation ${isOpen ? 'navigation__opened' : ''}`

  return (
    <div className={navigation}>
      <button
        className="navigation__button_close button"
        aria-label="Закрыть"
        onClick={handleMenuClose}>
      </button>
      <ul className="navigation__list">
        <Link
          to="/"
          className="navigation__list_item list link"
          onClick={handleMenuClose}>
            Главная
          </Link>
        <Link
          to="/movies"
          className="navigation__list_item list link"
          onClick={handleMenuClose}>
            Фильмы
          </Link>
        <Link
          to="/saved-movies"
          className="navigation__list_item list link"
          onClick={handleMenuClose}>
            Сохранённые фильмы
          </Link>
      </ul>
      <Account
        handleMenuClose={handleMenuClose}
      />
    </div>
  );
}

export default Navigation
