import { Link } from 'react-router-dom';

function Account(){
  return(
    <div className="account">
      <Link to="/profile" className='account__link link'>
        <div className="account__container container">
          <p className="account__subtitle subtitle">Аккаунт</p>
          <div className="account__icon"></div>
        </div>
      </Link>
    </div>
  )
};

export default Account;
