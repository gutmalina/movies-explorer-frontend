import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  handleFilterMovies,
  movies,
  keyword,
  setKeyword,
  likesLoading,
  handleDeleteMovie,
  location,
  checkbox,
  setCheckbox,
  preloader,
  errorNoMovies,
}) {

  return (
    <section className="saved-movies">
      <SearchForm
        handleFilterMovies={handleFilterMovies}
        keyword={keyword}
        setKeyword={setKeyword}
        checkbox={checkbox}
        setCheckbox={setCheckbox}
        location={location}
        preloader={preloader}
        errorNoMovies={errorNoMovies}
      />
      <MoviesCardList
        movies={movies}
        nameButton="delete"
        ariaLabel="Удалить фильм из сохраненных"
        handleDeleteMovie={handleDeleteMovie}
        likesLoading={likesLoading}
        location={location}
      />
    </section>
  );
}

export default SavedMovies
