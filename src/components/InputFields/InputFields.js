import {useEffect, useCallback, useRef} from "react";

function InputFields({
  nameForm,
  nameInput,
  type,
  placeholder,
  textContent,
  minLength,
  maxLength,
  onDisabled,
  value,
  isInputValid,
  setIsInputValid,
  setIsDate,
}){
  const inputRef = useRef(true)

  const container = `input__container input__container_theme_${nameForm} container`
  const input = `input input__type_form input__type_${nameForm} ${!isInputValid ? "input__invalid" : ""}`
  const subtitle = `input__subtitle subtitle input__subtitle_type_${nameForm}`
  const spanWrap = `span-wrap span-wrap_type_${nameForm}`
  const span = `span ${!isInputValid ? 'span__invalid' : ''}`
  const spanMessage = `${!isInputValid ? inputRef.current.validationMessage : ''}`
  const wrap = `input-wrap input-wrap_type_${nameForm}`

  /** проверить валидность поля input */
  useEffect(()=>{
    if(inputRef.current.value !== ''){
      setIsInputValid(inputRef.current.validity.valid);
    }
  }, [inputRef.current.value])

  /** Получить значение введенное в поле input для последующего submit*/
  const handleChange = useCallback((evt)=>{
    const { name, value } = evt.target
    setIsDate(prevState=>({...prevState, [name]: value}))
  }, [setIsDate])

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
          ref={inputRef}
          onChange={handleChange}
          disabled={onDisabled}
          value={value}
        />
      </div>
      <div className={spanWrap}>
        <span
          className={span}>
            {spanMessage}
        </span>
      </div>
    </div>
  )
};

export default InputFields
