import {Link} from 'react-router-dom';
import Account from "../Account/Account";

function Navigation({isOpen, onClose}) {
  const navigation = `navigation ${isOpen ? 'navigation__opened' : ''}`

  return (
    <div className={navigation}>
      <button
        className="navigation__button_close button"
        aria-label="Закрыть"
        onClick={onClose}>
      </button>
      <ul className="navigation__list">
        <Link to="/" className="navigation__list_item list link">Главная</Link>
        <Link to="/movies" className="navigation__list_item list link">Фильмы</Link>
        <Link to="/saved-movies" className="navigation__list_item list link">Сохранённые фильмы</Link>
      </ul>
      <Account/>
    </div>
  );
}

export default Navigation;
