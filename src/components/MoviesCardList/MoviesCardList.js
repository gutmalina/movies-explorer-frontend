import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  nameButtonSubmit,
  ariaLabel,
  handleCreateMovie,
  handleDeleteMovie,
  likesLoading,
  findMovieInSavedMovie,
  location,
}) {

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__group">
      {
        movies.map((movie) => (
          <MoviesCard {...movie} key={movie.movieId}
            nameButtonSubmit={nameButtonSubmit}
            ariaLabel={ariaLabel}
            handleCreateMovie={handleCreateMovie}
            handleDeleteMovie={handleDeleteMovie}
            likesLoading={likesLoading}
            findMovieInSavedMovie={findMovieInSavedMovie}
            location={location}
          />
        ))
      }
      </div>
    </section>
  );
}

export default MoviesCardList

