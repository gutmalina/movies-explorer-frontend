import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({location}) {
  return (
    <>
      <section className="saved-movies">
        <SearchForm
          location={location}
        />
        <MoviesCardList/>
      </section>
    </>
  );
}

export default SavedMovies;
