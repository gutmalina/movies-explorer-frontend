import FormRegister from '../FormRegister/FormRegister';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import CaptionForm from '../CaptionForm/CaptionForm';

function Register({title, location}){
  return (
    <>
      <section className="register">
        <h2 className="register__title title title__type_form">{title}</h2>
        <form name="register-form"
          className ="register__form form">
          <fieldset className="register__fieldset fieldset">
            <FormRegister
              nameForm="register"
              location={location}
            />
          </fieldset>
          <ButtonSubmit
            name="register"
            contentButton="Зарегистрироваться"
            location={location}
          />
        </form>
        <CaptionForm
          nameForm="register"
          subtitle="Уже зарегистрированы?"
          location={location}
        />
      </section>
    </>
  )
}

export default Register;
