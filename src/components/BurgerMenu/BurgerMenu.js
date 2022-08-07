import { useLocation } from "react-router-dom";

function BurgerMenu({onClick}){
  const { pathname } = useLocation();
  const burgerButton = `burger__button button ${pathname === "/profile" ? "burger__button_type_profile" : ""}`;

  return(
    <>
      <div className="burger">
        <button
          className={burgerButton}
          type="button"
          onClick={onClick}>
          <div className="burger__item"></div>
          <div className="burger__item"></div>
          <div className="burger__item"></div>
        </button>
      </div>
    </>
  )
};

export default BurgerMenu;
