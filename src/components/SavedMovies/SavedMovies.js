import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  handleFilterMovies,
  movies,
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

  const objForRender = !isKeyword && ! isShortMovie ? movies : moviesRender;

  return (
    <>
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
          movies={objForRender}
          nameButtonSubmit="delete"
          ariaLabel="Удалить фильм из сохраненных"
          handleDeleteMovie={handleDeleteMovie}
          likesLoading={likesLoading}
          location={location}
        />
      </section>
    </>
  );
}

export default SavedMovies;
