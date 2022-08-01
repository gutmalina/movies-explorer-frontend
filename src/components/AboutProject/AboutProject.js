function AboutProject() {
  return (
    <>
      <section className="about-project">
        <div className="main__title-wrap">
          <h2 className="main__title title">О проекте</h2>
          <div className="main__decor"></div>
        </div>
        <ul className="main__container">
          <li className="main__list list">
            <h3 className="main__title title about-project__title">Дипломный проект включал 5 этапов</h3>
            <p className="main__subtitle subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="main__list list">
            <h3 className="main__title title about-project__title">На выполнение диплома ушло 5 недель</h3>
            <p className="main__subtitle subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="about-project__grid">
          <div className="about-project__item about-project__item_back">
            <p className="about-project__subtitle subtitle">1 неделя</p>
          </div>
          <div className="about-project__item about-project__item_front">
            <p className="about-project__subtitle subtitle">4 недели</p>
          </div>
          <div className="about-project__item">
            <p className="about-project__subtitle about-project__subtitle_teme-light subtitle">Back-end</p>
          </div>
          <div className="about-project__item">
            <p className="about-project__subtitle about-project__subtitle_teme-light subtitle">Front-end</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutProject;
