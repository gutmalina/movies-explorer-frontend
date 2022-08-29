import React, {useState, useEffect} from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../Hooks/useForm";
import InputFields from '../InputFields/InputFields';
import Button from "../Button/Button";
import { MESSAGE_ERROR_EMAIL } from "../../utils/constants";

function FormProfile({
  nameForm,
  onError,
  setErrorServer,
  onSuccessfulMessage,
  disabledInput,
  setDisabledInput,
  disabledButton,
  setDisabledButton,
  handleUpdateUser,
}) {
  const currentUser = React.useContext(CurrentUserContext)

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
    email: (value) =>{
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return MESSAGE_ERROR_EMAIL;
      }
      return ''
    }
  })
  const {name, email} = values;
  const [ContentButton, setContentButton] = useState('Сохранить')
  const [clickedButton, setClickedButton] = useState("profile-edit")


  /** установить disabled button */
  useEffect(()=>{
    if((email !== '' && name !== '') && (name !== currentUser.name || email !== currentUser.email)){
      if(isValid){
        setDisabledButton(false);
      }else{
        setDisabledButton(true);
      }
    }else{
      setDisabledButton(true);
    }
  }, [email, name]);

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    if(clickedButton === "profile-save"){
      setErrorServer('');
      renderLoading(true);
      handleUpdateUser({
        name,
        email,
        onRenderLoading: ()=>{
          renderLoading(false)
        }
      })
    }else if(clickedButton === "profile-edit"){
      setDisabledInput(false)
      setClickedButton("profile-save")
    }
    resetForm()
  };

  /** Изменение текста кнопки при ожидании ответа от сервера */
  const renderLoading = (isLoading)=>{
    isLoading ? setContentButton('Сохранение...') : setContentButton('Сохранить');
  };

  /** показать ответ от сервера */
  const span = `profile__span_subtitle subtitle
  ${onError ? "profile__span_error" :
  onSuccessfulMessage? "profile__span_successful": "profile__span_subtitle_invalid"}`

  const contentSpan = `${onSuccessfulMessage ? onSuccessfulMessage : onError}`

  return(
    <form name="profile-form"
      className ="profile__form form"
      onSubmit={handleSubmit}>
      <fieldset className="profile__fieldset fieldset">
        <InputFields
          nameForm={nameForm}
          nameInput="name"
          type="text"
          placeholder=""
          textContent="Имя"
          minLength='2'
          maxLength='30'
          value={values.name || currentUser.name}
          onChange={handleChange}
          error={errors.name}
          disabledInput={disabledInput}
        />
        <InputFields
          nameForm={nameForm}
          nameInput="email"
          type="email"
          placeholder=""
          textContent="E-mail"
          value={values.email || currentUser.email}
          onChange={handleChange}
          error={errors.email}
          disabledInput={disabledInput}
        />
      </fieldset>
      <p className={span}>{contentSpan}</p>
      { !disabledInput ?
        <Button
          name="profile-save"
          type="submit"
          aria-label="Сохранить изменненные данные"
          theme="auth"
          content={ContentButton}
          disabled={disabledButton}
        />
        :
        <Button
          name="profile-edit"
          type="submit"
          aria-label="Редактировать данные"
          theme="profile-edit"
          content="Редактировать"
          >
        </Button>
      }
     </form>
  )
}

export default FormProfile
