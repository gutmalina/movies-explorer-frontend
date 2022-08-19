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
  onCount,
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
        />
        <MoviesCardList
          movies={objForRender}
          nameButtonSubmit="delete"
          ariaLabel="Удалить фильм из сохраненных"
          handleDeleteMovie={handleDeleteMovie}
          likesLoading={likesLoading}
          location={location}
          onCount={onCount}
        />
      </section>
    </>
  );
}

export default SavedMovies;
