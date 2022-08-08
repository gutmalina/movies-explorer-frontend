import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({location}) {
  return (
    <>
      <section className="movies">
        <SearchForm
          location={location}
        />
        <MoviesCardList/>
        <button
          type="button"
          className="movies-card-list__button button">Ещё
        </button>
      </section>
    </>
  );
}

export default Movies;
