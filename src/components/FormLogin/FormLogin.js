import {useState, useEffect} from "react";
import InputFields from "../InputFields/InputFields";
import Button from '../Button/Button';

function FormLogin({
  nameForm,
  minLength,
  maxLength,
  handleLogin,
  onError,
  setIsError,
  isDisabledButton,
  setIsDisabledButton
}){
  const [isContentButton, setIsContentButton] = useState('Войти')
  const [isDisabledInput] = useState(false)
  const [isDate, setIsDate] = useState({
    email: '',
    password: ''
  })
  const {email, password} = isDate
  const [isInputEmailValid, setIsInputEmailValid] = useState(true)
  const [isInputPasswordValid, setIsInputPasswordValid] = useState(true)

  /** установить disabled button */
  useEffect(()=>{
    if(email !== '' && password !== ''){
      if(isInputEmailValid && isInputPasswordValid){
        setIsDisabledButton(false);
      }else{
        setIsDisabledButton(true);
      }
    }else{
      setIsDisabledButton(true);
    }
  }, [email, password])

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    setIsError('');
    renderLoading(true);
    handleLogin({
      email,
      password,
      onRenderLoading: ()=>{
        renderLoading(false)
      }
    });
  }

  /** Изменение текста кнопки при ожидании ответа от сервера */
  const renderLoading = (isLoading)=>{
    isLoading ? setIsContentButton('Вход...') : setIsContentButton('Войти');
  }

  /** показать ошибку от сервера */
  const errorMessage = ` ${onError ? "login__span_subtitle subtitle" : "login__span_subtitle_invalid"}`

  return (
    <form name="login-form"
      className ="login__form form"
      onSubmit={handleSubmit}>
      <fieldset className="login__fieldset fieldset">
        <InputFields
          nameForm={nameForm}
          nameInput="email"
          type="email"
          placeholder=""
          textContent="E-mail"
          minLength={minLength}
          maxLength={maxLength}
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
        name="login"
        type="submit"
        aria-label="Авторизация пользователя"
        theme="auth"
        contentButton={isContentButton}
        isDisabledButton={isDisabledButton}
      />
    </form>
  )
}

export default FormLogin
