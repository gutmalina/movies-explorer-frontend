import FormLogin from '../FormLogin/FormLogin';
import CaptionForm from '../CaptionForm/CaptionForm';

function Login({
  title,
  onError,
  setErrorServer,
  disabledButton,
  setDisabledButton,
  handleLogin,
}){

  return(
    <section className="login">
      <h2 className="login__title title title__type_form">
        {title}
      </h2>
      <FormLogin
        nameForm="login"
        onError={onError}
        setErrorServer={setErrorServer}
        disabledButton={disabledButton}
        setDisabledButton={setDisabledButton}
        handleLogin={handleLogin}
      />
      <CaptionForm
        nameForm="login"
        subtitle="Ещё не зарегистрированы?"
      />
    </section>
  )
};

export default Login
