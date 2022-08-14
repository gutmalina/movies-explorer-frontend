import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({location, onSubmit}) {
  return (
    <>
      <section className="saved-movies">
        <SearchForm
          location={location}
          onSubmit={onSubmit}
        />
        <MoviesCardList/>
      </section>
    </>
  );
}

export default SavedMovies;
