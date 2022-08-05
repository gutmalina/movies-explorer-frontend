function MoviesCard({...card}) {

/** перевести минуты в часы и минуты */
  const toTime = (time) => {
    const h = Math.trunc(time / 60);
    const m = time - (h * 60)
    return h + "ч " + m + "м";
  }

  return (
    <>
      <article className="card">
        <img className="card__img"
          src={card.image}
          alt={card.nameRu}/>
        <div className="card__caption">
          <h2 className="card__title-nameRu title">{card.nameRu}</h2>
          <button
            type="button"
            aria-label="Поставить лайк"
            className="card__button card__button_like button card__button_like_inactive">
          </button>
        </div>
        <div className="card__duration">
          {
            toTime(card.duration)
          }
        </div>
      </article>
    </>
  );
}

export default MoviesCard;
