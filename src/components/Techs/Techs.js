import TechsCard from '../TechsCard/TechsCard';
import { TECHS_ARRAY } from '../../utils/TechsCardLists';
import {
  TECHS,
  TECHS_TITLE,
  TECHS_DESCRIPTION,
} from '../../utils/constants'

function Techs() {
  return (
    <>
      <section className="techs">
        <div className="main__title-wrap techs__title-wrap">
          <h2 className="main__title title">
            {TECHS}
          </h2>
        </div>
        <ul className="techs__container container">
          <li className="techs__list list">
            <h3 className="techs__title title">
              {TECHS_TITLE}
            </h3>
            <p className="techs__subtitle subtitle">
              {TECHS_DESCRIPTION}
            </p>
          </li>
        </ul>
        <div className="techs__grid">
        {
          TECHS_ARRAY.map((card) => (
            <TechsCard {...card} key={card._id}
            />
          ))
        }
        </div>
      </section>
    </>
  );
}

export default Techs
