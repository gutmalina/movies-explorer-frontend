import promoLogo from '../../../src/images/Promo-logo.svg';

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
          <h1 className="promo__title title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__subtitle subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
      </section>
    </>
  );
}

export default Promo;
