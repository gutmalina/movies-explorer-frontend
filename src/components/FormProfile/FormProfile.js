import InputFields from '../InputFields/InputFields';

function FormProfile({nameForm}) {
  return(
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
    </>
  )
}

export default FormProfile;
