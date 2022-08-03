function Techs() {
  return (
    <>
      <section className="techs">
        <div className="main__title-wrap techs__title-wrap">
          <h2 className="main__title title">Технологии</h2>
        </div>
        <ul className="techs__container container">
          <li className="techs__list list">
            <h3 className="techs__title title">7 технологий</h3>
            <p className="techs__subtitle subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          </li>
        </ul>
        <div className="techs__grid">
          <div className="techs__item">
            <p className="techs__grid_subtitle subtitle">HTML</p>
          </div>
          <div className="techs__item">
            <p className="techs__grid_subtitle subtitle">CSS</p>
          </div>
          <div className="techs__item">
            <p className="techs__grid_subtitle subtitle">JS</p>
          </div>
          <div className="techs__item">
            <p className="techs__grid_subtitle subtitle">React</p>
          </div>
          <div className="techs__item">
            <p className="techs__grid_subtitle subtitle">Git</p>
          </div>
          <div className="techs__item">
            <p className="techs__grid_subtitle subtitle">Express.js</p>
          </div>
          <div className="techs__item">
            <p className="techs__grid_subtitle subtitle">mongoDB</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Techs;
