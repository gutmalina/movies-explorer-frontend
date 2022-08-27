import { useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Button from '../Button/Button';

function Movies({
  handleFilterMovies,
  movies,
  handleCreateMovie,
  handleDeleteMovie,
  isKeyword,
  setIsKeyword,
  likesLoading,
  findMovieInSavedMovie,
  isShortMovie,
  setIsShortMovie,
  onPreloader,
  setIsPreloader,
  onNotFound,
  onInactivElse,
  setIsInactivButtonElse,
  isFirstRenderCount,
  setIsFirstRenderCount,
  isNextRenderCount,
}) {

  const theme = `${onInactivElse ? 'else-inactive' : 'else'}`

  /** скрыть кнопку ЕЩЕ когда отрисуется все фильмы */
  useEffect(()=>{
    movies.length <= isFirstRenderCount ? setIsInactivButtonElse(true) : setIsInactivButtonElse(false)
  }, [isFirstRenderCount])

  /** первая отрисовка массива фильмов */
  const handleFirstRender =()=>{
    return movies.slice(0, isFirstRenderCount)
  }

  /** все следующие отрисовки фильмов */
  const handleNextRender =()=>{
    setIsFirstRenderCount(prevState=> prevState + isNextRenderCount)
  }

  /** увеличить количество фильмов для показа */
  const handleElse =(evt)=>{
    evt.preventDefault();
    handleNextRender()
  }

  return (
    <section className="movies">
      <SearchForm
        handleFilterMovies={handleFilterMovies}
        isKeyword={isKeyword}
        setIsKeyword={setIsKeyword}
        isShortMovie={isShortMovie}
        setIsShortMovie={setIsShortMovie}
        onPreloader={onPreloader}
        setIsPreloader={setIsPreloader}
        onNotFound={onNotFound}
      />
      <MoviesCardList
        movies={handleFirstRender() || []}
        nameButtonSubmit="like"
        ariaLabel="Поставить лайк"
        handleCreateMovie={handleCreateMovie}
        handleDeleteMovie={handleDeleteMovie}
        likesLoading={likesLoading}
        findMovieInSavedMovie={findMovieInSavedMovie}
        isFirstRenderCount={isFirstRenderCount}
      />
      <form
        className="movies__form form"
        onSubmit={handleElse}>
        <Button
          name="else"
          type="submit"
          aria-label="Показать ещё фильмы"
          theme={theme}
          contentButton="Ещё">
        </Button>
      </form>
    </section>
  );
}

export default Movies
