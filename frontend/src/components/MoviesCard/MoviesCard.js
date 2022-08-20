import { useState, useEffect } from "react";
import FormMoviesCard from "../FormMoviesCard/FormMoviesCard";

function MoviesCard({
  handleCreateMovie,
  handleDeleteMovie,
  nameButtonSubmit,
  ariaLabel,
  likesLoading,
  findMovieInSavedMovie,
  location,
  ...movie
}) {
  const [isLikes, setIsLikes] = useState(false);

  /** установить лайк или дизлайк карточке */
  useEffect(()=>{
    likesLoading(movie.movieId) ? setIsLikes(true) : setIsLikes (false)
  }, [movie]);

  /** перевести минуты в часы и минуты */
  const toTime = (time) => {
    const h = Math.trunc(time / 60);
    const m = time - (h * 60)
    return h + "ч " + m + "м";
  };

  return (
    <>
      <article className="movies-card">
        {/* <a
          className="movies-card__trailer"
          href={movie.trailerLink}
          target="_blank"
          alt="Трейлер фильма"
          rel="noreferrer"> */}
          <img className="movies-card__img"
            src={movie.image}
            alt={movie.nameRU}/>
        {/* </a> */}
        <FormMoviesCard
          handleCreateMovie={handleCreateMovie}
          handleDeleteMovie={handleDeleteMovie}
          movie={movie}
          nameButton={nameButtonSubmit}
          ariaLabel={ariaLabel}
          isLikes={isLikes}
          setIsLikes={setIsLikes}
          findMovieInSavedMovie={findMovieInSavedMovie}
          location={location}
        />
        <div className="movies-card__duration">
          {
            toTime(movie.duration)
          }
        </div>
      </article>
    </>
  );
}

export default MoviesCard;
