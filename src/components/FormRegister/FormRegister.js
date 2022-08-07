import InputFields from "../InputFields/InputFields";

function FormRegister({nameForm}){
  return (
    <>
      <InputFields
        nameForm={nameForm}
        nameInput="name"
        type="text"
        placeholder=""
        textContent="Имя"
      />
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

export default FormRegister;
