import { useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Button from '../Button/Button';

function Movies({
  movies,
  renderCount,
  setRenderCount,
  nextRenderCount,
  likesLoading,
  keyword,
  setKeyword,
  checkbox,
  setCheckbox,
  preloader,
  errorNoMovies,
  inactivButtonElse,
  setInactivButtonElse,
  handleCreateMovie,
  handleDeleteMovie,
  handleFilterMovies,
  findMovieInSavedMovie,
}) {
  const theme = `${inactivButtonElse ? 'else-inactive' : 'else'}`

  /** скрыть кнопку ЕЩЕ когда отрисуется все фильмы */
  useEffect(()=>{
    console.log('movies', movies)
    movies.length <= renderCount ? setInactivButtonElse(true) : setInactivButtonElse(false)
  }, [movies.length])



  /** первая отрисовка массива фильмов */
  const handleFirstRender =()=>{
    return movies.slice(0, renderCount)
  }

  /** все следующие отрисовки фильмов */
  const handleNextRender =()=>{
    setRenderCount(prevState=> prevState + nextRenderCount)
  }

  /** увеличить количество фильмов для показа */
  const handleElse =(evt)=>{
    evt.preventDefault();
    handleNextRender()
  }

  return (
    <section className="movies">
      <SearchForm
        keyword={keyword}
        setKeyword={setKeyword}
        checkbox={checkbox}
        setCheckbox={setCheckbox}
        preloader={preloader}
        errorNoMovies={errorNoMovies}
        handleFilterMovies={handleFilterMovies}
      />
      <MoviesCardList
        movies={handleFirstRender() || []}
        likesLoading={likesLoading}
        nameButton="like"
        ariaLabel="Поставить лайк"
        handleCreateMovie={handleCreateMovie}
        handleDeleteMovie={handleDeleteMovie}
        findMovieInSavedMovie={findMovieInSavedMovie}
      />
      <form
        className="movies__form form"
        onSubmit={handleElse}>
        <Button
          name="else"
          type="submit"
          aria-label="Показать ещё фильмы"
          theme={theme}
          content="Ещё">
        </Button>
      </form>
    </section>
  );
}

export default Movies
