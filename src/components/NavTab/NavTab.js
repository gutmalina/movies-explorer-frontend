import {Link} from 'react-router-dom';

function NavTab() {
  return (
    <>
      <section className="navtab">
        <Link
          to="/#about-project"
          className="navtab__link">
          <button
            type="button"
            className="navtab__button button">
              Узнать больше
          </button>
        </Link>
      </section>
    </>
  );
}

export default NavTab
