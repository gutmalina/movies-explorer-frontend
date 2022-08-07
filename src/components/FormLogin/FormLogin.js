import InputFields from "../InputFields/InputFields";

function FormLogin({nameForm}){
  return (
    <>
      <InputFields
        nameForm={nameForm}
        nameInput="email"
        type="email"
        placeholder=""
        textContent="E-mail"
      />
      <InputFields
        nameForm={nameForm}
        nameInput="password"
        type="password"
        placeholder=""
        textContent="Пароль"
      />
    </>
  )
}

export default FormLogin;
