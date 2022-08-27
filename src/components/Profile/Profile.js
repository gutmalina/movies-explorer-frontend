import FormProfile from "../FormProfile/FormProfile";
import CaptionForm from "../CaptionForm/CaptionForm";

function Profile({
  title,
  location,
  handleUpdateUser,
  onError,
  setIsError,
  signOut,
  onSuccessfulMessage,
  disabledInput,
  setDisabledInput,
}){
  return(
    <section className="profile">
      <h2 className="profile__title title title__type_form title__type_profile">
        {title}
      </h2>
      <FormProfile
        nameForm="profile"
        handleUpdateUser={handleUpdateUser}
        onError={onError}
        setIsError={setIsError}
        disabledInput={disabledInput}
        setDisabledInput={setDisabledInput}
        onSuccessfulMessage={onSuccessfulMessage}
      />
      { disabledInput ?
        <CaptionForm
            nameForm="profile"
            location={location}
            signOut={signOut}
        />
        : null}
    </section>
  )
};

export default Profile
