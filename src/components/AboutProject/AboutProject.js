function AboutProject() {
  return (
    <>
      <section className="about-project">
        <h2 className="about-project__title title">О проекте</h2>
        <div className="about-project__border"></div>
        <ul className="about-project__container">
          <li className="about-project__list">
            <h3 className="about-project__list_title about-project__title title about-project__list_indent">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__subtitle subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about-project__list">
            <h3 className="about-project__list_title about-project__title title about-project__list_indent">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__subtitle subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="about-project__grid">
          <div className="about-project__item about-project__item_back">
            <p className="about-project__grid_subtitle subtitle">1 неделя</p>
          </div>
          <div className="about-project__item about-project__item_front">
            <p className="about-project__grid_subtitle subtitle">4 недели</p>
          </div>
          <div className="about-project__item">
            <p className="about-project__grid_subtitle about-project__grid_teme-light subtitle">Back-end</p>
          </div>
          <div className="about-project__item">
            <p className="about-project__grid_subtitle about-project__grid_teme-light subtitle">Front-end</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutProject;
