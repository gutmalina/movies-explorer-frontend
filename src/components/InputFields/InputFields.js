function InputFields({
  nameForm,
  nameInput,
  type,
  placeholder,
  textContent,
  minLength,
  maxLength,
  disabledInput,
  value,
  onChange,
  error,
}){
  const container = `input__container input__container_theme_${nameForm} container`
  const input = `input input__type_form input__type_${nameForm} ${error ? "input__invalid" : ""}`
  const subtitle = `input__subtitle subtitle input__subtitle_type_${nameForm}`
  const spanWrap = `span-wrap span-wrap_type_${nameForm}`
  const span = `span ${error ? 'span__invalid' : ''}`
  const wrap = `input-wrap input-wrap_type_${nameForm}`

  return(
    <div className={wrap}>
      <div className={container}>
        <p className={subtitle}>{textContent}</p>
        <input
          id={`${nameForm}-${nameInput}`}
          type={type}
          name={nameInput}
          className={input}
          placeholder={placeholder}
          required
          autoComplete={`new-${nameInput}`}
          minLength={minLength || ''}
          maxLength={maxLength || ''}
          onChange={onChange}
          disabled={disabledInput}
          value={value}
          onKeyDown={onChange}
        />
      </div>
      <div className={spanWrap}>
        <span
          className={span}>
            {error}
        </span>
      </div>
    </div>
  )
};

export default InputFields
