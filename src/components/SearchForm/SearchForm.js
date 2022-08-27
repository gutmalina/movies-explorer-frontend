import { useFormWithValidation } from "../Hooks/useForm";
import Button from "../Button/Button";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import { MESSAGE_ERROR_NOWORD } from "../../utils/constants";
import { useState } from "react";

function SearchForm({
  handleFilterMovies,
  isKeyword,
  isShortMovie,
  setIsShortMovie,
  onPreloader,
  setIsPreloader,
  onNotFound,
}) {
  const { values, handleChange} = useFormWithValidation({})
  const [inputValid, setInputValid] = useState(true)
  const {word} = values
  const error = `${!inputValid ? MESSAGE_ERROR_NOWORD  : onNotFound}`

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    setInputValid(true)
    if(word === ''){
      return setInputValid(false)
    }
    renderPreloader(true)
    handleFilterMovies({
      keyword: word,
      onRenderPreloader: ()=>{
        renderPreloader(false)
      }
    });
  }

  /** показать preloader во время выволнения запроса */
  const renderPreloader = (isLoading)=>{
    isLoading ? setIsPreloader(true) : setIsPreloader(false);
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
              value={values.word || isKeyword}
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
            isShortMovie={isShortMovie}
            setIsShortMovie={setIsShortMovie}
          />
        </div>
      </div>
      <Preloader
        disabled={onPreloader}
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
