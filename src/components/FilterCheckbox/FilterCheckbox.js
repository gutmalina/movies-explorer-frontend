function FilterCheckbox({
  checkbox,
  setCheckbox
}) {

  /** изменить состояние checkbox */
  const handleChange = () => {
    setCheckbox(!checkbox);
  };

  return (
    <div className="filter-checkbox">
      <fieldset className="filter-checkbox__form form">
        <label
          htmlFor="short-movie"
          className="filter-checkbox__label">
          <input
            id="filter"
            type="checkbox"
            className="filter-checkbox__invisible"
            value="filter-checkbox"
            checked={checkbox}
            onChange={handleChange}
          />
          <span
            className="filter-checkbox__visible"
            onClick={handleChange}>
          </span>
          <span className="filter-checkbox__text">Короткометражки</span>
        </label>
      </fieldset>
    </div>
  );
}

export default FilterCheckbox;
