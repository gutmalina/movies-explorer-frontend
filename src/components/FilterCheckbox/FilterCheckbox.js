import {useState} from "react";

function FilterCheckbox() {
  const [checked, setChecked] = useState(false);

  /** изменить состояние checkbox */
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
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
              checked={checked}
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
    </>
  );
}

export default FilterCheckbox;
