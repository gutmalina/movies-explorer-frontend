import InputFields from "../InputFields/InputFields";

function FormLogin({nameForm, location, minLength, maxLength, onDisabled }){
  return (
    <>
      <InputFields
        nameForm={nameForm}
        nameInput="email"
        type="email"
        placeholder=""
        textContent="E-mail"
        location={location}
        minLength={minLength}
        maxLength={maxLength}
        onDisabled={onDisabled}
      />
      <InputFields
        nameForm={nameForm}
        nameInput="password"
        type="password"
        placeholder=""
        textContent="Пароль"
        location={location}
        onDisabled={onDisabled}
      />
    </>
  )
}

export default FormLogin;
