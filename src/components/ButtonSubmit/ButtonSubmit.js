function ButtonSubmit({contentButton, name}) {
  const classNameButtonSubmit = `button button__submit button__submit_${name}`

  return (
    <>
      <button
        type="submit"
        name={name}
        className={classNameButtonSubmit}>
          {contentButton}
      </button>
    </>
  );
}

export default ButtonSubmit;
