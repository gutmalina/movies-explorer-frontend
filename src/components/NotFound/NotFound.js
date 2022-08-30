import { useHistory } from "react-router-dom";

function NotFound({
  loggedIn,
}){
  const history = useHistory()

  /** редирект */
  const handleGoBack=()=>{
    loggedIn ? history.goBack() : history.push('/')
  }

  return(
    <div className="notfound">
      <h2
        className="notfound__title title">
          404
      </h2>
      <p
        className="notfound__subtitle subtitle">
          Страница не найдена
      </p>
      <button
        className="button notfound__link link"
        type='button'
        name='back'
        aria-label='Назад'
        onClick={handleGoBack}>
          Назад
        </button>
    </div>
  )
};

export default NotFound
