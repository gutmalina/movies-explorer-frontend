import FormUser from '../FormUser/FormUser';

function Register(){
  return (
    <>
      <section className="register">
        <h2 className="register__title">Добро пожаловать!</h2>
        <form name="register-form"
          className ="register__form">
          <fieldset className="register__fieldset">
          <FormUser/>
          </fieldset>
          <button
            name="register"
            type="submit"
            className="register__submit">Зарегистрироваться
          </button>
        </form>
        <div className='register__footer'>
          <p className="register__subtitle">Уже зарегистрированы?</p>
          <a href="#" className="register__link">Войти</a>
        </div>
      </section>
    </>
  )
}

export default Register;
