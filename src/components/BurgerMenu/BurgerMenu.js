import { useLocation } from "react-router-dom"

function BurgerMenu({
  handleMenuOpen,
}){
  const { pathname } = useLocation()
  const burgerButton = `button ${pathname === '/' ? 'burger__button_teme_main' : 'burger__button'}`

 return(
    <div className="burger">
      <button
        className={burgerButton}
        type="button"
        onClick={handleMenuOpen}>
        <div className="burger__item"></div>
        <div className="burger__item"></div>
        <div className="burger__item"></div>
      </button>
    </div>
  )
};

export default BurgerMenu
