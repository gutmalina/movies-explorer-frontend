import {useState, useEffect} from "react";
import InputFields from "../InputFields/InputFields";
import Button from '../Button/Button';

function FormRegister({
  nameForm,
  location,
  minLength,
  maxLength,
  handleRegister,
  onError,
  setIsError,
  isDisabledButton,
  setIsDisabledButton
}){
  const [isContentButton, setIsContentButton] = useState('Зарегистрироваться');
  const [isDisabledInput] = useState(false);
  const [isDate, setIsDate] = useState({
    email: '',
    password: '',
    name: ''
  });
  const {email, password, name} = isDate;
  const [isInputEmailValid, setIsInputEmailValid] = useState(true);
  const [isInputPasswordValid, setIsInputPasswordValid] = useState(true);
  const [isInputNameValid, setIsInputNameValid] = useState(true);

  /** установить disabled button */
  useEffect(()=>{
    if(email !== '' && password !== '' && name !== ''){
      if(isInputEmailValid && isInputPasswordValid && isInputNameValid){
        setIsDisabledButton(false);
      }else{
        setIsDisabledButton(true);
      }
    }else{
      setIsDisabledButton(true);
    }
  }, [email, password, name]);

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    setIsError('');
    renderLoading(true);
    handleRegister({
      email,
      password,
      name,
      onRenderLoading: ()=>{
        renderLoading(false)
      }
    });
  };

  /** Изменение текста кнопки при ожидании ответа от сервера */
  const renderLoading = (isLoading)=>{
    isLoading ? setIsContentButton('Регистрация...') : setIsContentButton('Зарегистрироваться');
  };

  /** показать ошибку от сервера */
  const errorMessage = `register__span_subtitle subtitle ${onError ? "register__span_subtitle_invalid" : ""}`;

  return (
    <form name="register-form"
      className ="register__form form"
      onSubmit={handleSubmit}>
      <fieldset className="register__fieldset fieldset">
        <InputFields
          nameForm={nameForm}
          nameInput="name"
          type="text"
          placeholder=""
          textContent="Имя"
          location={location}
          minLength={minLength}
          maxLength={maxLength}
          onDisabled={isDisabledInput}
          isInputValid={isInputNameValid}
          setIsInputValid={setIsInputNameValid}
          setIsDate={setIsDate}
        />
        <InputFields
          nameForm={nameForm}
          nameInput="email"
          type="email"
          placeholder=""
          textContent="E-mail"
          onDisabled={isDisabledInput}
          isInputValid={isInputEmailValid}
          setIsInputValid={setIsInputEmailValid}
          setIsDate={setIsDate}
        />
        <InputFields
          nameForm={nameForm}
          nameInput="password"
          type="password"
          placeholder=""
          textContent="Пароль"
          onDisabled={isDisabledInput}
          isInputValid={isInputPasswordValid}
          setIsInputValid={setIsInputPasswordValid}
          setIsDate={setIsDate}
        />
      </fieldset>
      <p className={errorMessage}>{onError}</p>
      <Button
        name="register"
        type="submit"
        aria-label="Зарегистрироваться"
        theme="auth"
        contentButton={isContentButton}
        isDisabledButton={isDisabledButton}
      />
    </form>
  )
}

export default FormRegister;
