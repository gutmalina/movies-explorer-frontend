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
      </section>
    </>
  );
}

export default MoviesCardList;

