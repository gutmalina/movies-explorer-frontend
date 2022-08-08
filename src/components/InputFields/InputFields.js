function InputFields({nameForm, nameInput, type, placeholder, textContent, location}){
  const container = `input__container container ${location === "/profile" ? "input__container_type_profile" : ""}`;
  const input = `input input__type_form ${location === "/profile" ? "input__type_profile" : ""}`;
  const subtitle = `input__subtitle subtitle ${location === "/profile" ? "input__subtitle_type_profile" : ""}`;
  const span = `span-wrap ${location === "/profile" ? "span-wrap_type_profile" : ""}`;

  return(
    <>
      <div className="input-wrap">
        <div className={container}>
          <p className={subtitle}>{textContent}</p>
          <input
            id={`${nameForm}-${nameInput}`}
            type={type}
            name={nameInput}
            placeholder={placeholder || ''}
            className={input}
            autoFocus
            required
            autoComplete={`new-${nameInput}`}
          />
        </div>
        <div className={span}>
          <span
            className={`span span__${nameInput}`}></span>
        </div>
      </div>
    </>
  )
};

export default InputFields;
