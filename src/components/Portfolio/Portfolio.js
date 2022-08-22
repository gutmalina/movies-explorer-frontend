import {
  siteStaticLink,
  siteAdaptiveLink,
  onePageSiteLink,
} from '../../../src/utils/constants';

function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <h2 className="portfolio__title title">Портфолио</h2>
        <ul className="portfolio__container container">
          <li className="portfolio__list list">
            <a className="portfolio__link link" href={siteStaticLink} target="_blank" rel="noreferrer">
              <p className="portfolio__subtitle subtitle">Статичный сайт</p>
              <div className="portfolio__img"></div>
            </a>
          </li>
          <li className="portfolio__list list">
            <a className="portfolio__link link" href={siteAdaptiveLink} target="_blank" rel="noreferrer">
              <p className="portfolio__subtitle subtitle">Адаптивный сайт</p>
              <div className="portfolio__img"></div>
            </a>
          </li>
          <li className="portfolio__list list">
            <a className="portfolio__link link" href={onePageSiteLink} target="_blank" rel="noreferrer">
              <p className="portfolio__subtitle subtitle">Одностраничное приложение</p>
              <div className="portfolio__img"></div>
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Portfolio;
