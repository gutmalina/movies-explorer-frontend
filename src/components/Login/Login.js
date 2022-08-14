import {useState} from "react";
import FormLogin from '../FormLogin/FormLogin';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import CaptionForm from '../CaptionForm/CaptionForm';

function Login({title, location, onSubmit}){
  const [isDisabledInput] = useState(false);

  return(
    <>
      <section className="login">
        <h2 className="login__title title title__type_form">{title}</h2>
        <form name="login-form"
          className ="login__form form"
          onSubmit={onSubmit}>
          <fieldset className="login__fieldset fieldset">
            <FormLogin
              nameForm="login"
              location={location}
              minLength="2"
              maxLength="30"
              onDisabled={isDisabledInput}
            />
          </fieldset>
          <ButtonSubmit
            name="login"
            contentButton="Войти"
            location={location}
          />
        </form>
        <CaptionForm
          nameForm="login"
          subtitle="Ещё не зарегистрированы?"
          location={location}
        />
      </section>
    </>
  )
};

export default Login;
