import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Button from '../Button/Button';

function Movies({
  handleFilterMovies,
  movies,
  onClickElse,
  handleCreateMovie,
  handleDeleteMovie,
  onCount,
  isKeyword,
  setIsKeyword,
  likesLoading,
  findMovieInSavedMovie,
  isShortMovie,
  setIsShortMovie,
  onPreloader,
  setIsPreloader,
  onNotFound,
  onInactivElse
}) {

  /** увеличить количество фильмов для показа */
  const handleElse =(evt)=>{
    evt.preventDefault();
    onClickElse();
  };

  // const theme = `${movies.length <= onCount ? 'else-inactive' : 'else'}`;
  const theme = `${onInactivElse ? 'else-inactive' : 'else'}`

  return (
    <>
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
          movies={movies || []}
          nameButtonSubmit="like"
          ariaLabel="Поставить лайк"
          handleCreateMovie={handleCreateMovie}
          handleDeleteMovie={handleDeleteMovie}
          likesLoading={likesLoading}
          findMovieInSavedMovie={findMovieInSavedMovie}
          onCount={onCount}
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
    </>
  );
}

export default Movies;
