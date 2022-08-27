import FormRegister from '../FormRegister/FormRegister';
import CaptionForm from '../CaptionForm/CaptionForm';

function Register({
  title,
  location,
  handleRegister,
  onError,
  setIsError,
}){

  return (
    <section className="register">
      <h2 className="register__title title title__type_form">
        {title}
      </h2>
      <FormRegister
        nameForm="register"
        handleRegister={handleRegister}
        onError={onError}
        setIsError={setIsError}
      />
      <CaptionForm
        nameForm="register"
        subtitle="Уже зарегистрированы?"
        location={location}
      />
    </section>
  )
};

export default Register
