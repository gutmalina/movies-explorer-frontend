function AboutProject() {
  return (
    <>
      <section className="about-project">
        <div className="main__title-wrap about-project__title-wrap">
          <h2 className="main__title title">О проекте</h2>
        </div>
        <ul className="about-project__container container">
          <li className="about-project__list list">
            <h3 className="about-project__title title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__subtitle subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about-project__list list">
            <h3 className="about-project__title title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__subtitle subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="about-project__grid">
          <div className="about-project__item about-project__item_back">
            <p className="about-project__grid-subtitle subtitle subtitle__teme-dark">1 неделя</p>
          </div>
          <div className="about-project__item about-project__item_front">
            <p className="about-project__grid-subtitle subtitle">4 недели</p>
          </div>
          <div className="about-project__item">
            <p className="about-project__grid-subtitle subtitle subtitle__teme-light">Back-end</p>
          </div>
          <div className="about-project__item">
            <p className="about-project__grid-subtitle subtitle subtitle__teme-light">Front-end</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutProject;
