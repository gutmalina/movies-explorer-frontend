import { useCallback, useRef } from "react";
import Button from "../Button/Button";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  handleFilterMovies,
  isKeyword,
  setIsKeyword,
  isShortMovie,
  setIsShortMovie,
}) {
  const inputRef = useRef(true);

  /** Получить значение введенное в поле input для последующего submit*/
  const handleChange = useCallback((evt)=>{
    const { value } = evt.target
    setIsKeyword(prevState=>({...prevState, value}))
  }, [setIsKeyword]);

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    handleFilterMovies(isKeyword.value);
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
            ref={inputRef}
            type="text"
            className="search__input input"
            placeholder="Фильм"
            autoFocus
            onChange={handleChange}
            value={isKeyword.value || ''}
          />
          <Button
            name="search"
            type="submit"
            aria-label="Найти фильм"
            theme="search"
            contentButton="Найти"
          />
          <div className="search__decor"></div>
        </form>
        <FilterCheckbox
          isShortMovie={isShortMovie}
          setIsShortMovie={setIsShortMovie}
        />
      </div>
    </div>

    </>
  );
}

export default SearchForm;
