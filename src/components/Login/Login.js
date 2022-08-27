import FormLogin from '../FormLogin/FormLogin';
import CaptionForm from '../CaptionForm/CaptionForm';

function Login({
  title,
  location,
  handleLogin,
  onError,
  setIsError,}){

  return(
    <section className="login">
      <h2 className="login__title title title__type_form">
        {title}
      </h2>
      <FormLogin
        nameForm="login"
        handleLogin={handleLogin}
        onError={onError}
        setIsError={setIsError}
      />
      <CaptionForm
        nameForm="login"
        subtitle="Ещё не зарегистрированы?"
        location={location}
      />
    </section>
  )
};

export default Login
