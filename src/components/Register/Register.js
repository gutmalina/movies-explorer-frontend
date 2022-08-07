import FormRegister from '../FormRegister/FormRegister';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import CaptionForm from '../CaptionForm/CaptionForm';

function Register({title}){
  return (
    <>
      <section className="register">
        <h2 className="register__title title title__type_form">{title}</h2>
        <form name="register-form"
          className ="register__form form">
          <fieldset className="register__fieldset fieldset">
            <FormRegister
              nameForm="register"
            />
          </fieldset>
          <ButtonSubmit
            name="register"
            contentButton="Зарегистрироваться"
          />
        </form>
        <CaptionForm
          nameForm="register"
          subtitle="Уже зарегистрированы?"
        />
      </section>
    </>
  )
}

export default Register;
