import InputFields from "../InputFields/InputFields";

function FormLogin({nameForm, location}){
  return (
    <>
      <InputFields
        nameForm={nameForm}
        nameInput="email"
        type="email"
        placeholder=""
        textContent="E-mail"
        location={location}
      />
      <InputFields
        nameForm={nameForm}
        nameInput="password"
        type="password"
        placeholder=""
        textContent="Пароль"
        location={location}
      />
    </>
  )
}

export default FormLogin;
