import { Route, Link } from "react-router-dom";

function CaptionForm({
  subtitle,
  location,
  signOut
}){
  const captionForm = `caption-form
  ${location === "/profile" ? "caption-form__type_profile" : ""}`

  const linkProfileOut = `caption-form__link link
  ${location === "/profile" ? "caption-form__link__type_out" : ""}`

  return(
    <div className={captionForm}>
      <p className="caption-form__subtitle subtitle">
        {subtitle}
      </p>
      <Route path='/profile'>
        <Link
          to="/"
          className={linkProfileOut}
          onClick={signOut}
          >Выйти из аккаунта
        </Link>
      </Route>
      <Route path='/signup'>
        <Link
          to="/signin"
          className="caption-form__link link">
            Войти
        </Link>
      </Route>
      <Route path='/signin'>
        <Link
          to="/signup"
          className="caption-form__link link">
            Регистрация
        </Link>
      </Route>
    </div>
  )
}

export default CaptionForm
