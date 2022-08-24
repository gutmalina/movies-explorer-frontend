import promoLogo from '../../../src/images/Promo-logo.svg';
import {
  PROMO_TITLE,
  PROMO_SUBTITLE,
} from '../../utils/constants'

function Promo(){
  return (
    <>
      <section className="promo">
        <img
          className="promo__logo"
          src={promoLogo}
          alt="Географическая карта. Глобус"
        />
        <div className='promo__container'>
          <h1 className="promo__title title">
            {PROMO_TITLE}
          </h1>
          <p className="promo__subtitle subtitle">
            {PROMO_SUBTITLE}
          </p>
        </div>
      </section>
    </>
  );
}

export default Promo
