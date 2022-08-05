function FilterCheckbox() {
  return (
    <>
      <div className="filter-checkbox">
        <fieldset className="filter-checkbox__form form">
          <label
            htmlFor="short-movie"
            className="filter-checkbox__label">
            <input id="filter"
              type="checkbox"
              className="filter-checkbox__input filter-checkbox__type-hidden" />
            <span className="filter-checkbox__item"></span>
            <span className="filter-checkbox__item-text">Короткометражки</span>
          </label>
        </fieldset>
      </div>
    </>
  );
}

export default FilterCheckbox;
