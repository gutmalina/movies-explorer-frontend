import aboutMeImg from '../../../src/images/About-me.jpg';
import {
  LINK_GITHUB,
  LINK_CODEWARS,
  ABOUT_ME_STUDENT,
  ABOUT_ME_NAME,
  ABOUT_ME_DESCRIPTION,
  ABOUT_ME_BIOGRAPHY
} from '../../../src/utils/constants';

function AboutMe() {
  return (
    <section className="about-me">
      <div className="main__title-wrap about-me__title-wrap">
        <h2 className="main__title title">
          {ABOUT_ME_STUDENT}
        </h2>
      </div>
      <img
        className="about-me__img"
        src={aboutMeImg}
        alt="Фотография студента"
      />
      <ul className="about-me__container container">
        <li className="about-me__list list">
          <h3 className="about-me__name title">
            {ABOUT_ME_NAME}
          </h3>
          <p className="about-me__description subtitle">
            {ABOUT_ME_DESCRIPTION}
          </p>
          <p className="about-me__biography subtitle">
            {ABOUT_ME_BIOGRAPHY}
          </p>
        </li>
      </ul>
      <ul className="about-me__links container">
        <li className="about-me__list list">
          <a
            className="about-me__link link"
            href={LINK_GITHUB}
            target="_blank"
            rel="noreferrer">
              Github
          </a>
        </li>
        <li className="about-me__list list">
          <a
            className="about-me__link list link"
            href={LINK_CODEWARS}
            target="_blank"
            rel="noreferrer">
              Codewars
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe
