import {useState} from "react";
import FormProfile from "../FormProfile/FormProfile";
import CaptionForm from "../CaptionForm/CaptionForm";

function Profile({
  data,
  title,
  location,
  handleUpdateUser,
  onError,
  setIsError,
  isDisabledButton,
  setIsDisabledButton,
  signOut,
  onSuccessfulMessage,
}){
  const [isDisabledInput, setIsDisabledInput] = useState(true)

  return(
    <section className="profile">
      <h2 className="profile__title title title__type_form title__type_profile">
        {title}
      </h2>
      <FormProfile
        nameForm="profile"
        location={location}
        minLength="2"
        maxLength="30"
        onDisabled={isDisabledInput}
        data={data}
        handleUpdateUser={handleUpdateUser}
        onError={onError}
        setIsError={setIsError}
        isDisabledButton={isDisabledButton}
        setIsDisabledButton={setIsDisabledButton}
        setIsDisabledInput={setIsDisabledInput}
        isDisabledInput={isDisabledInput}
        onSuccessfulMessage={onSuccessfulMessage}
      />
      { isDisabledInput ?
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
