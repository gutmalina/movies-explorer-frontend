import FormLogin from '../FormLogin/FormLogin';
import CaptionForm from '../CaptionForm/CaptionForm';

function Login({title, location, handleLogin, isErrorServer, setIsErrorServer, isDisabledButton, setIsDisabledButton}){
  return(
    <section className="login">
      <h2 className="login__title title title__type_form">{title}</h2>
      <FormLogin
        nameForm="login"
        minLength="2"
        maxLength="30"
        handleLogin={handleLogin}
        isErrorServer={isErrorServer}
        setIsErrorServer={setIsErrorServer}
        isDisabledButton={isDisabledButton}
        setIsDisabledButton={setIsDisabledButton}
      />
      <CaptionForm
        nameForm="login"
        subtitle="Ещё не зарегистрированы?"
        location={location}
      />
    </section>
  )
};

export default Login;
