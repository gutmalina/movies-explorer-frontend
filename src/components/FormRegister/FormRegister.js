import {useState, useEffect} from "react";
import { useFormWithValidation } from "../../Hooks/useForm";
import InputFields from "../InputFields/InputFields";
import Button from '../Button/Button';
import { MESSAGE_ERROR_EMAIL } from "../../utils/constants";

function FormRegister({
  nameForm,
  onError,
  setErrorServer,
  disabledButton,
  setDisabledButton,
  handleRegister,
}){
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
    email: (value) =>{
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return MESSAGE_ERROR_EMAIL;
      }
      return ''
    }
  })
  const {email, password, name} = values;
  const [ContentButton, setContentButton] = useState('Зарегистрироваться')

  /** установить disabled button */
  useEffect(()=>{
    if(email !== '' && password !== '' && name !== ''){
      if(isValid){
        setDisabledButton(false);
      }else{
        setDisabledButton(true);
      }
    }else{
      setDisabledButton(true);
    }
  }, [email, password, name]);

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    setErrorServer('');
    renderLoading(true);
    handleRegister({
      email,
      password,
      name,
      onRenderLoading: ()=>{
        renderLoading(false)
      }
    });
    resetForm()
  };

  /** Изменение текста кнопки при ожидании ответа от сервера */
  const renderLoading = (isLoading)=>{
    isLoading ? setContentButton('Регистрация...') : setContentButton('Зарегистрироваться')
  };

  /** показать ошибку от сервера */
  const errorMessage = ` ${onError ? "register__span_subtitle subtitle" : "register__span_subtitle_invalid"}`

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
          minLength='2'
          maxLength='30'
          value={values.name || ''}
          onChange={handleChange}
          error={errors.name}
        />
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
          minLength='5'
          value={values.password || ''}
          onChange={handleChange}
          error={errors.password}
        />
      </fieldset>
      <p className={errorMessage}>
        {onError}
      </p>
      <Button
        name="register"
        type="submit"
        aria-label="Зарегистрироваться"
        theme="auth"
        content={ContentButton}
        disabled={disabledButton}
      />
    </form>
  )
}

export default FormRegister
