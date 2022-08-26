import Button from '../Button/Button';

function FormMoviesCard({
  handleCreateMovie,
  handleDeleteMovie,
  movie,
  nameButton,
  ariaLabel,
  isLikes,
  setIsLikes,
  findMovieInSavedMovie,
  location,
}){

  /** поставить лайк, сохранить фильм */
  const addLike = ()=>{

    handleCreateMovie(movie);
    setIsLikes(true);
  }

  /** удалить лайк, удалить фильм из сохраненных */
  const removeLike = ()=>{
    if(location === "/saved-movies"){
      handleDeleteMovie(movie);
      setIsLikes(false);
    }else{
      handleDeleteMovie(findMovieInSavedMovie(movie.movieId));
      setIsLikes(false);
    }
  }

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    if(isLikes) {
      removeLike();
     } else {
      addLike();
     }
  };

  return(
    <form
      name="movie-card-form"
      className="movie-card__form form"
      onClick={handleSubmit}
      >
      <fieldset className="movie-card__fieldset fieldset">
        <h2 className="movie-card__title title">
          {movie.nameRU}
        </h2>
        <Button
          name={nameButton}
          type="submit"
          aria-label={ariaLabel}
          className={`card__button button card__button_${nameButton}`}
          theme="movie-card"
          isLikes={isLikes}>
        </Button>
      </fieldset>
    </form>
  )
};

export default FormMoviesCard
