function Menu(){
  return(
    <div className="menu">
      <button
        className="menu__button_close"
        aria-label="Закрыть">
      </button>
      <ul className="menu__list">
        <li className="menu__list_item">Главная</li>
        <li className="menu__list_item">Фильмы</li>
        <li className="menu__list_item">Сохранённые фильмы</li>
      </ul>
      <div className="menu__profile">
        <p className="menu__subtitle">Аккаунт</p>
        <div className="menu__icon"></div>
      </div>
    </div>
  )
};

export default Menu;
