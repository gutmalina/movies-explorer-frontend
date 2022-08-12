import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({location, onSubmit}) {
  return (
    <>
    <div className="search">
      <div className="search__wrap">
        <form
          className="search__form form"
          onSubmit={onSubmit}>
          <div className="search__img"></div>
          <input id="search"
            type="text"
            className="search__input input"
            placeholder="Фильм"
            autoFocus
            required
          />
          <ButtonSubmit
            name="search"
            contentButton="Найти"
            location={location}
          />
          <div className="search__decor"></div>
        </form>
        <FilterCheckbox/>
      </div>
    </div>

    </>
  );
}

export default SearchForm;
