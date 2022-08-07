import { initialCards } from "../../utils/initialCards";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Route } from "react-router-dom";

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
        <Route path="/movies">
          <button
            type="button"
            className="movies-card-list__button button">Ещё
          </button>
        </Route>
      </section>
    </>
  );
}

export default MoviesCardList;

