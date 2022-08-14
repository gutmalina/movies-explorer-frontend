function ButtonSubmit({contentButton, name, location}) {
  const submintMovies = [
    "/movies",
    "/saved-movies"
  ];
  const submitTypeForm = [
    "/signup",
    "/signin",
    '/profile'
  ];
  const submit = `button button__submit ${
    submitTypeForm.includes(location) ? 'button__submit_type_form' :
    submintMovies.includes(location) ? 'button__submit_type_movies' : ''
  }`;

  return (
    <>
      <button
        type="submit"
        name={name}
        className={submit}>
          {contentButton}
      </button>
    </>
  );
}

export default ButtonSubmit;
