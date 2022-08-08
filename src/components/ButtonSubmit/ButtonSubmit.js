function ButtonSubmit({contentButton, name, location}) {
  const submintMovies = [
    "/movies",
    "/saved-movies"
  ];
  const submitTypeSign = [
    "/signup",
    "/signin"
  ];
  const submit = `button button__submit ${
    submitTypeSign.includes(location) ? 'button__submit_type_sign' :
    location === '/profile' ? 'button__submit_type_profile' :
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
