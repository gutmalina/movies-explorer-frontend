function BurgerMenu({handleMenuOpen}){

 return(
    <>
      <div className="burger">
        <button
          className='burger__button button'
          type="button"
          onClick={handleMenuOpen}>
          <div className="burger__item"></div>
          <div className="burger__item"></div>
          <div className="burger__item"></div>
        </button>
      </div>
    </>
  )
};

export default BurgerMenu;
