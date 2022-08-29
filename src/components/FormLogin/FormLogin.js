import {useState, useEffect} from "react";
import InputFields from "../InputFields/InputFields";
import Button from '../Button/Button';
import { useFormWithValidation } from "../../Hooks/useForm";
import { MESSAGE_ERROR_EMAIL } from "../../utils/constants";

function FormLogin({
  nameForm,
  onError,
  setErrorServer,
  disabledButton,
  setDisabledButton,
  handleLogin,
}){

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
    email: (value) =>{
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return {MESSAGE_ERROR_EMAIL};
      }
      return ''
    }
  })
  const { email, password} = values;
  const [ContentButton, setContentButton] = useState('Войти')

  /** установить disabled button */
  useEffect(()=>{
    if(email !== '' && password !== ''){
      if(isValid){
        setDisabledButton(false);
      }else{
        setDisabledButton(true);
      }
    }else{
      setDisabledButton(true);
    }
  }, [email, password])

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    setErrorServer('');
    renderLoading(true);
    handleLogin({
      email,
      password,
      onRenderLoading: ()=>{
        renderLoading(false)
      }
    });
    resetForm()
  }

  /** Изменение текста кнопки при ожидании ответа от сервера */
  const renderLoading = (isLoading)=>{
    isLoading ? setContentButton('Вход...') : setContentButton('Войти');
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
          value={values.email || ''}
          onChange={handleChange}
          error={errors.email}
        />
        <InputFields
          nameForm={nameForm}
          nameInput="password"
          type="password"
          placeholder=""
          textContent="Пароль"
          minLength='1'
          value={values.password || ''}
          onChange={handleChange}
          error={errors.password}
        />
      </fieldset>
      <p className={errorMessage}>{onError}</p>
      <Button
        name="login"
        type="submit"
        aria-label="Авторизация пользователя"
        theme="auth"
        content={ContentButton}
        disabled={disabledButton}
      />
    </form>
  )
}

export default FormLogin
