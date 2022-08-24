import { Link } from "react-router-dom";

function NotFound(){
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
        <Link
          to="/"
          className="notfound__link link">
            Назад
        </Link>
    </div>
  )
};

export default NotFound
