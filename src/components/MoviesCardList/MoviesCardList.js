import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  likesLoading,
  nameButton,
  ariaLabel,
  handleCreateMovie,
  handleDeleteMovie,
  findMovieInSavedMovie,
}) {

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__group">
      {
        movies.map((movie) => (
          <MoviesCard {...movie} key={movie.movieId}
            likesLoading={likesLoading}
            nameButton={nameButton}
            ariaLabel={ariaLabel}
            handleCreateMovie={handleCreateMovie}
            handleDeleteMovie={handleDeleteMovie}
            findMovieInSavedMovie={findMovieInSavedMovie}
          />
        ))
      }
      </div>
    </section>
  );
}

export default MoviesCardList

