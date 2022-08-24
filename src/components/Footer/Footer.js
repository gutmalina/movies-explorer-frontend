import {
  LINK_GITHUB,
  LINK_CODEWARS,
  LINK_YANDEX,
} from '../../../src/utils/constants';

function Footer({
  date,
  location
}) {
  const pathFooterActive = [
    '/',
    '/movies',
    '/saved-movies'
  ]

  const footer = `footer
  ${pathFooterActive.includes(location) ? "footer__active" : ''}`

  return (
    <>
      <footer className={footer}>
        <div className="footer__title-wrap">
          <h2 className="footer__title title">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h2>
        </div>
        <nav className="footer__links">
          <ul className="footer__container container">
            <li className="footer__list list">
              <a
                href={LINK_YANDEX}
                className="footer__link link"
                target="_blank"
                rel="noreferrer">
                  Яндекс.Практикум
              </a>
            </li>
            <li className="footer__list list">
              <a
                href={LINK_GITHUB}
                className="footer__link link"
                target="_blank"
                rel="noreferrer">
                  Github
              </a>
            </li>
            <li className="footer__list list">
              <a
                href={LINK_CODEWARS}
                className="footer__link link"
                target="_blank"
                rel="noreferrer">
                  Codewars
              </a>
            </li>
          </ul>
        </nav>
        <p className="footer__copyright">
          &copy;{' ' + date}
        </p>
      </footer>
    </>
  );
}

export default Footer
