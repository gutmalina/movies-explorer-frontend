import FormProfile from "../FormProfile/FormProfile";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import CaptionForm from "../CaptionForm/CaptionForm";

function Profile({title}){
  return(
    <>
      <section className="profile">
        <h2 className="profile__title title title__type_form">{title}</h2>
          <form name="profile-form"
            className ="profile__form form">
            <fieldset className="profile__fieldset fieldset">
              <FormProfile
                nameForm="profile"
              />
            </fieldset>
          </form>
          <ButtonSubmit
            name="register"
            contentButton="Редактировать"
          />
          <CaptionForm
            nameForm="profile"
          />
      </section>
    </>
  )
};

export default Profile;
