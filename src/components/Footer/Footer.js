import { useLocation } from 'react-router-dom';
import {
  githubLink,
  codewarsLink,
  yandexLink,
} from '../../../src/utils/constants';

function Footer({date}) {
  const { pathname } = useLocation();
  const footer = `footer ${pathname === "/signup" || pathname === "/signin" || pathname === "/profile" ? "footer__inactive" : ''}`;

  return (
    <>
      <section className={footer}>
        <div className="footer__title-wrap">
          <h2 className="footer__title title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        </div>
        <nav className="footer__links">
          <ul className="footer__container container">
            <li className="footer__list list">
              <a href={yandexLink} className="footer__link link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__list list">
              <a href={githubLink} className="footer__link link" target="_blank" rel="noreferrer">Github</a>
            </li>
            <li className="footer__list list">
              <a href={codewarsLink} className="footer__link link" target="_blank" rel="noreferrer">Codewars</a>
            </li>
          </ul>
        </nav>
        <p className="footer__copyright">&copy;{' ' + date}</p>
      </section>
    </>
  );
}

export default Footer;
