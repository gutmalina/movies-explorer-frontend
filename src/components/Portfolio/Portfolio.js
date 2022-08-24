import {
  LINK_SITE_STATIC,
  LINK_SITE_ADAPTIVE,
  LINK_SITE_ONE_PAGE,
  NAME_SITE_STATIC,
  NAME_SITE_ADAPTIVE,
  NAME_SITE_ONE_PAGE,
} from '../../../src/utils/constants';

function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <h2 className="portfolio__title title">
          Портфолио
        </h2>
        <ul className="portfolio__container container">
          <li className="portfolio__list list">
            <a
              className="portfolio__link link"
              href={LINK_SITE_STATIC}
              target="_blank"
              rel="noreferrer">
              <p className="portfolio__subtitle subtitle">
                {NAME_SITE_STATIC}
              </p>
              <div className="portfolio__img"></div>
            </a>
          </li>
          <li className="portfolio__list list">
            <a
              className="portfolio__link link"
              href={LINK_SITE_ADAPTIVE}
              target="_blank"
              rel="noreferrer">
              <p className="portfolio__subtitle subtitle">
                {NAME_SITE_ADAPTIVE}
              </p>
              <div className="portfolio__img"></div>
            </a>
          </li>
          <li className="portfolio__list list">
            <a
              className="portfolio__link link"
              href={LINK_SITE_ONE_PAGE}
              target="_blank"
              rel="noreferrer">
              <p className="portfolio__subtitle subtitle">
                {NAME_SITE_ONE_PAGE}
              </p>
              <div className="portfolio__img"></div>
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Portfolio
