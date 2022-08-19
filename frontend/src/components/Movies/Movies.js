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
}) {

  /** увеличить количество фильмов для показа */
  const handleElse =(evt)=>{
    evt.preventDefault();
    onClickElse();
  };

  // const theme = `${movies.length <= onCount ? 'else-inactive' : 'else'}`;

  return (
    <>
      <section className="movies">
        <SearchForm
          handleFilterMovies={handleFilterMovies}
          isKeyword={isKeyword}
          setIsKeyword={setIsKeyword}
          isShortMovie={isShortMovie}
          setIsShortMovie={setIsShortMovie}
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
            theme={'else'}
            contentButton="Ещё">
          </Button>
        </form>
      </section>
    </>
  );
}

export default Movies;
