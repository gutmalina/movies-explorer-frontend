import {useState, useEffect} from "react";
import InputFields from "../InputFields/InputFields";
import Button from '../Button/Button';
import { useFormWithValidation } from "../Hooks/useForm";

function FormLogin({
  nameForm,
  handleLogin,
  onError,
  setIsError,
}){
  // const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
    email: (value) =>{
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return 'Введите адрес электронной почты';
      }
      return ''
    }
  })
  const [DisabledButton, setDisabledButton] = useState(true)
  const [ContentButton, setContentButton] = useState('Войти')

  const { email, password} = values;

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
    setIsError('');
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
        disabled={DisabledButton}
      />
    </form>
  )
}

export default FormLogin
