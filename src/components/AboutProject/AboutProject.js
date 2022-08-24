import {
  ABOUT_PROJECT,
  ABOUT_PROJECT_TITLE,
  ABOUT_PROJECT_DESCRIPTION,
  ABOUT_PROJECT_TIME,
  ABOUT_PROJECT_DEADLINE,
  ABOUT_PROJECT_WEEK_FIRST,
  ABOUT_PROJECT_WEEK_NEXT,
  ABOUT_PROJECT_FRONTEND,
  ABOUT_PROJECT_BACKEND,
} from '../../utils/constants';

function AboutProject() {
  return (
    <>
      <section className="about-project">
        <div className="main__title-wrap about-project__title-wrap">
          <h2 className="main__title title">
            {ABOUT_PROJECT}
          </h2>
        </div>
        <ul className="about-project__container container">
          <li className="about-project__list list">
            <h3 className="about-project__title title">
              {ABOUT_PROJECT_TITLE}
            </h3>
            <p className="about-project__subtitle subtitle">
              {ABOUT_PROJECT_DESCRIPTION}
            </p>
          </li>
          <li className="about-project__list list">
            <h3 className="about-project__title title">
              {ABOUT_PROJECT_TIME}
            </h3>
            <p className="about-project__subtitle subtitle">
              {ABOUT_PROJECT_DEADLINE}
            </p>
          </li>
        </ul>
        <div className="about-project__grid">
          <div className="about-project__item about-project__item_back">
            <p className="about-project__grid-subtitle subtitle subtitle__teme-dark">
              {ABOUT_PROJECT_WEEK_FIRST}
            </p>
          </div>
          <div className="about-project__item about-project__item_front">
            <p className="about-project__grid-subtitle subtitle">
              {ABOUT_PROJECT_WEEK_NEXT}
            </p>
          </div>
          <div className="about-project__item">
            <p className="about-project__grid-subtitle subtitle subtitle__teme-light">
              {ABOUT_PROJECT_FRONTEND}
            </p>
          </div>
          <div className="about-project__item">
            <p className="about-project__grid-subtitle subtitle subtitle__teme-light">
              {ABOUT_PROJECT_BACKEND}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutProject
