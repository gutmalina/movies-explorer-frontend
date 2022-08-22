import { useCallback, useRef, useState } from "react";
import Button from "../Button/Button";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";

function SearchForm({
  handleFilterMovies,
  isKeyword,
  setIsKeyword,
  isShortMovie,
  setIsShortMovie,
  onPreloader,
  setIsPreloader,
  onNotFound,
}) {
  const inputRef = useRef(true);

  /** Получить значение введенное в поле input */
  const handleChange = useCallback((evt)=>{
    const { value } = evt.target
    setIsKeyword(value)
  }, [setIsKeyword]);

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    renderPreloader(true)
    handleFilterMovies({
      keyword: isKeyword,
      onRenderPreloader: ()=>{
        renderPreloader(false)
      }
    });
  }

  /** показать preloader во время выволнения запроса */
  const renderPreloader = (isLoading)=>{
    isLoading ? setIsPreloader(true) : setIsPreloader(false);
  };

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
              value={isKeyword || ''}
              required
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
      <Preloader
        disabled={onPreloader}
      />
      <div className="search__container_message container">
        <p className="search__subtitle subtitle">{onNotFound}</p>
      </div>
    </>
  );
}

export default SearchForm;
