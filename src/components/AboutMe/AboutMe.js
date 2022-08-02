import aboutMeImg from '../../../src/images/About-me.jpg';
import {
  githubLink,
  codewarsLink,
  name,
  description,
  biography
} from '../../../src/utils/constants';

function AboutMe() {
  return (
    <>
      <section className="about-me">
        <div className="main__title-wrap">
          <h2 className="main__title title">Студент</h2>
          <div className="main__decor"></div>
        </div>
        <img
          className="about-me__img"
          src={aboutMeImg}
          alt="Фотография студента"
        />
        <ul className="about-me__container">
          <li className="about-me__list list">
            <h3 className="about-me__name title">{name}</h3>
            <p className="about-me__description subtitle">{description}</p>
            <p className="about-me__biography subtitle">{biography}</p>
          </li>
        </ul>
        <ul className="about-me__links">
          <li>
            <a className="about-me__link list link" href={githubLink} target="_blank" rel="noreferrer">Github</a>
          </li>
          <li>
            <a className="about-me__link list link" href={codewarsLink} target="_blank" rel="noreferrer">Codewars</a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default AboutMe;
