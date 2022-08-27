import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  handleFilterMovies,
  moviesRender,
  isKeyword,
  setIsKeyword,
  likesLoading,
  handleDeleteMovie,
  location,
  isShortMovie,
  setIsShortMovie,
  onPreloader,
  setIsPreloader,
  onNotFound,
}) {

  return (
    <section className="saved-movies">
      <SearchForm
        handleFilterMovies={handleFilterMovies}
        isKeyword={isKeyword}
        setIsKeyword={setIsKeyword}
        isShortMovie={isShortMovie}
        setIsShortMovie={setIsShortMovie}
        location={location}
        onPreloader={onPreloader}
        setIsPreloader={setIsPreloader}
        onNotFound={onNotFound}
      />
      <MoviesCardList
        movies={moviesRender}
        nameButtonSubmit="delete"
        ariaLabel="Удалить фильм из сохраненных"
        handleDeleteMovie={handleDeleteMovie}
        likesLoading={likesLoading}
        location={location}
      />
    </section>
  );
}

export default SavedMovies
