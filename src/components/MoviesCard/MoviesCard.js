import { useState, useEffect } from "react";
import FormMoviesCard from "../FormMoviesCard/FormMoviesCard";

function MoviesCard({
  likesLoading,
  nameButton,
  ariaLabel,
  handleCreateMovie,
  handleDeleteMovie,
  findMovieInSavedMovie,
  ...movie
}) {
  const [isLikes, setIsLikes] = useState(false)

  /** установить лайк или дизлайк карточке */
  useEffect(()=>{
    likesLoading(movie.movieId) ? setIsLikes(true) : setIsLikes (false)
  }, [movie])

  /** перевести минуты в часы и минуты */
  const toTime = (time) => {
    const h = Math.trunc(time / 60);
    const m = time - (h * 60)
    return h + "ч " + m + "м";
  }

  /** показать трейлер фильма */
  const handleClickOnVideo = ()=>{
    window.open(movie.trailerLink)
  }

  return (
    <article className="movies-card">
      <img className="movies-card__img"
        src={movie.image}
        alt={movie.nameRU}
        onClick={handleClickOnVideo}
        target="_blank"
      />
      <FormMoviesCard
        movie={movie}
        isLikes={isLikes}
        setIsLikes={setIsLikes}
        nameButton={nameButton}
        ariaLabel={ariaLabel}
        handleCreateMovie={handleCreateMovie}
        handleDeleteMovie={handleDeleteMovie}
        findMovieInSavedMovie={findMovieInSavedMovie}
      />
      <div className="movies-card__duration">
        {
          toTime(movie.duration)
        }
      </div>
    </article>
  );
}

export default MoviesCard
