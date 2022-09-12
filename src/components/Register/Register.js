import FormRegister from '../FormRegister/FormRegister';
import CaptionForm from '../CaptionForm/CaptionForm';

function Register({
  title,
  onError,
  setErrorServer,
  disabledButton,
  setDisabledButton,
  handleRegister,
}){

  return (
    <section className="register">
      <h2 className="register__title title title__type_form">
        {title}
      </h2>
      <FormRegister
        nameForm="register"
        onError={onError}
        setErrorServer={setErrorServer}
        disabledButton={disabledButton}
        setDisabledButton={setDisabledButton}
        handleRegister={handleRegister}
      />
      <CaptionForm
        nameForm="register"
        subtitle="Уже зарегистрированы?"
      />
    </section>
  )
};

export default Register
