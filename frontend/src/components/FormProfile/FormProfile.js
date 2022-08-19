import {useState, useEffect} from "react";
import InputFields from '../InputFields/InputFields';
import Button from "../Button/Button";

function FormProfile({nameForm, location, minLength, maxLength, onDisabled, data, handleUpdateUser, isErrorServer, setIsErrorServer, isDisabledButton, setIsDisabledButton, isDisabledInput, setIsDisabledInput}) {
  const [isContentButton, setIsContentButton] = useState('Сохранить');
  const [clickedButton, setClickedButton] = useState("profile-edit");
  const [isDate, setIsDate] = useState({
    name: data.name || '',
    email: data.email || ''
  });
  const {name, email} = isDate;
  const [isInputEmailValid, setIsInputEmailValid] = useState(true);
  const [isInputNameValid, setIsInputNameValid] = useState(true);

  /** установить disabled button */
  useEffect(()=>{
    if(email !== '' && name !== ''){
      if(isInputEmailValid && isInputNameValid){
        setIsDisabledButton(false);
      }else{
        setIsDisabledButton(true);
      }
    }else{
      setIsDisabledButton(true);
    }
  }, [email, name]);

  /** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    if(clickedButton === "profile-save"){
      setIsErrorServer('');
      renderLoading(true);
      handleUpdateUser({
        name,
        email,
        onRenderLoading: ()=>{
          renderLoading(false)
        }
      })
    }else if(clickedButton === "profile-edit"){
      setIsDisabledInput(false)
      setIsDate({
        name: '',
        email: ''
      })
      setClickedButton("profile-save")
    }
  };

  /** Изменение текста кнопки при ожидании ответа от сервера */
  const renderLoading = (isLoading)=>{
    isLoading ? setIsContentButton('Сохранение...') : setIsContentButton('Сохранить');
  };

  /** показать ошибку от сервера */
  const errorMessage = `profile__span_subtitle subtitle ${isErrorServer ? "profile__span_subtitle_invalid" : ""}`;

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
          location={location}
          minLength={minLength}
          maxLength={maxLength}
          onDisabled={onDisabled}
          value={name}
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
          location={location}
          onDisabled={onDisabled}
          value={email}
          isInputValid={isInputEmailValid}
          setIsInputValid={setIsInputEmailValid}
          setIsDate={setIsDate}
        />
      </fieldset>
      <p className={errorMessage}>{isErrorServer}</p>
      { !isDisabledInput ?
        <Button
          name="profile-save"
          type="submit"
          aria-label="Сохранить изменненные данные"
          theme="auth"
          contentButton={isContentButton}
          isDisabledButton={isDisabledButton}
        />
        :
        <Button
          name="profile-edit"
          type="submit"
          aria-label="Редактировать данные"
          theme="profile-edit"
          contentButton="Редактировать"
          >
        </Button>
      }
     </form>
  )
}

export default FormProfile;
