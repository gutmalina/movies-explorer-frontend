import { useRef, useCallback } from "react";
import Button from "../Button/Button";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import { MESSAGE_ERROR_NOWORD } from "../../utils/constants";
import { useState } from "react";

function SearchForm({
  keyword,
  setKeyword,
  checkbox,
  setCheckbox,
  preloader,
  errorNoMovies,
  handleFilterMovies,
}) {
  const inputRef = useRef(true)
  const [inputValid, setInputValid] = useState(true)
  const error = `${!inputValid ? MESSAGE_ERROR_NOWORD  : errorNoMovies}`

  /** Получить значение введенное в поле input */
  const handleChange = useCallback((evt)=>{
    const { value } = evt.target
    setKeyword(value)
  }, [setKeyword])

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    setInputValid(true)
    if(keyword === ''){
      return setInputValid(false)
    }
    handleFilterMovies(keyword);
  }

  return (
    <>
      <div className="search">
        <div className="search__wrap">
          <form
            className="search__form form"
            onSubmit={handleSubmit}>
            <div className="search__img"></div>
            <input
              id="search"
              name="word"
              type="text"
              className="search__input input"
              placeholder="Фильм"
              autoFocus
              minLength='1'
              onChange={handleChange}
              value={keyword || ''}
              ref={inputRef}
            />
            <Button
              name="search"
              type="submit"
              aria-label="Найти фильм"
              theme="search"
              content="Найти"
            />
            <div className="search__decor"></div>
          </form>
          <FilterCheckbox
            checkbox={checkbox}
            setCheckbox={setCheckbox}
          />
        </div>
      </div>
      <Preloader
        disabled={preloader}
      />
      <div className="search__container_message container">
        <p className="search__subtitle subtitle">
          {error}
        </p>
      </div>
    </>
  );
}

export default SearchForm;
