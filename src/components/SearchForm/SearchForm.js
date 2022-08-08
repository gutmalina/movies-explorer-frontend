import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({location}) {
  return (
    <>
    <div className="search">
      <div className="search__wrap">
        <filsed className="search__form form">
          <div className="search__img"></div>
          <input id="search"
            type="text"
            className="search__input input"
            placeholder="Фильм"
            autoFocus
          />
          <ButtonSubmit
            name="search"
            contentButton="Найти"
            location={location}
          />
          <div className="search__decor"></div>
        </filsed>
        <FilterCheckbox/>
      </div>
    </div>

    </>
  );
}

export default SearchForm;
