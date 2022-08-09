import {useRef, useState, useCallback, useEffect} from "react";

function InputFields({ nameForm, nameInput, type, placeholder, textContent, location, minLength, maxLength, onDisabled, valueData }){
  const inputRef = useRef(true);
  const [isInputValue, setIsInputValue] = useState(true);

  /** Получить значение введенное в поле input */
  const handleChangeInput = useCallback((evt)=>{
    const { name, value } = evt.target
    setIsInputValue(prevState=>({...prevState, [name]: value}))
  }, [setIsInputValue])

  /** проверить валидность поля input */
  useEffect(()=>{
    if(inputRef.current.value !== ''){
      setIsInputValue(inputRef.current.validity.valid);
    }
  }, [inputRef.current.value])

  const container = `input__container container ${location === "/profile" ? "input__container_type_profile" : ""}`;
  const input = `input input__type_form ${
    location === "/profile" && !isInputValue ? "input__type_profile input__invalid" ://если профайл и данные НЕ валидны
    location === "/profile" && isInputValue? "input__type_profile"://если профайл и данные валидны
    location !== "/profile" && !isInputValue ? "input__invalid" : ""}`;//если НЕ профалй и данные НЕ валидны

  const subtitle = `input__subtitle subtitle ${location === "/profile" ? "input__subtitle_type_profile" : ""}`;
  const spanWrap = `span-wrap ${location === "/profile" ? "span-wrap_type_profile" : ""}`;

  /** если значения введенные в поле input не валидны */
  const span = `span ${!isInputValue ? 'span__invalid' : ''}`
  const spanMessage = `${!isInputValue ? inputRef.current.validationMessage : ''}`

   return(
    <>
      <div className="input-wrap">
        <div className={container}>
          <p className={subtitle}>{textContent}</p>
          <input
            id={`${nameForm}-${nameInput}`}
            type={type}
            name={nameInput}
            className={input}
            placeholder={placeholder}
            autoFocus
            required
            autoComplete={`new-${nameInput}`}
            minLength={minLength || ''}
            maxLength={maxLength || ''}
            ref={inputRef}
            onChange={handleChangeInput}
            disabled={onDisabled}
          />
        </div>
        <div className={spanWrap}>
          <span
            className={span}>{spanMessage}</span>
        </div>
      </div>
    </>
  )
};

export default InputFields;
