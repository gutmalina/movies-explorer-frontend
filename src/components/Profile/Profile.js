import {useState} from "react";
import FormProfile from "../FormProfile/FormProfile";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import CaptionForm from "../CaptionForm/CaptionForm";

function Profile({title, location, onSubmit}){
  const [isDisabledInput, setIsDisabledInput] = useState(true);

  /* удалить disebled input для редактирования  */
  const remoteInputuDisabled =()=>{
      setIsDisabledInput(false)
  };

  return(
    <>
      <section className="profile">
        <h2 className="profile__title title title__type_form title__type_profile">{title}</h2>
          <form name="profile-form"
            className ="profile__form form"
            onSubmit={onSubmit}>
            <fieldset className="profile__fieldset fieldset">
              <FormProfile
                nameForm="profile"
                location={location}
                minLength="2"
                maxLength="30"
                onDisabled={isDisabledInput}
              />
            </fieldset>
          </form>
          { !isDisabledInput ?
            <ButtonSubmit
              name="register"
              contentButton="Сохранить"
              location={location}
            />
            : null}
          { isDisabledInput ?
            <>
              <button
                type="button"
                className="profile__button button"
                onClick={remoteInputuDisabled}>Редактировать
              </button>
              <CaptionForm
                  nameForm="profile"
                  location={location}
              />
            </>
            : null}
      </section>
    </>
  )
};

export default Profile;
