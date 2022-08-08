import InputFields from '../InputFields/InputFields';

function FormProfile({nameForm, location}) {
  return(
    <>
      <InputFields
        nameForm={nameForm}
        nameInput="name"
        type="text"
        placeholder=""
        textContent="Имя"
        location={location}
      />
      <InputFields
        nameForm={nameForm}
        nameInput="email"
        type="email"
        placeholder=""
        textContent="E-mail"
        location={location}
      />
    </>
  )
}

export default FormProfile;
