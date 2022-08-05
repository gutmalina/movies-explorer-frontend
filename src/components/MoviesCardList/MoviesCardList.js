import { initialCards } from "../../utils/initialCards";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <>
      <section className="movies-card-list">
        <div className="movies-card-list__group">
        {
          initialCards.map((card) => (
            <MoviesCard {...card} key={card._id}
            />
          ))
        }
        </div>
        <button
          type="button"
          className="movies-card-list__button button">Ещё
        </button>
      </section>
    </>
  );
}

export default MoviesCardList;

